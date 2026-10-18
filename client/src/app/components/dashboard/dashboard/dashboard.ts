import { Component, inject, signal } from '@angular/core';
import { CpuData, MemoryData, ProcessData } from '../../../models/monitor.interface';
import { MonitorService } from '../../../services/monitor';
import { forkJoin } from 'rxjs';
import { ProcessMonitor } from '../childs/process-monitor/process-monitor';
import { MemoryMonitor } from '../childs/memory-monitor/memory-monitor';
import { CpuMonitor } from '../childs/cpu-monitor/cpu-monitor';

@Component({
  selector: 'app-dashboard',
  imports: [ProcessMonitor, MemoryMonitor, CpuMonitor],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  monitorService = inject(MonitorService);
  cpu = signal<CpuData | null>(null);
  memory = signal<MemoryData | null>(null);
  AllProcesses = signal<ProcessData[]>([]);
  processes = signal<ProcessData[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  refresh: any;
  currentSearch = '';

  // initialy different methods to call different apis
  // loadCpu() {
  //   this.monitorService.getCpuData().subscribe({
  //     next: (response) => {
  //       this.cpu.set(response);
  //       this.loading.set(false);
  //     },
  //     error: (err) => {
  //       this.error.set(err.message);
  //       this.loading.set(false);
  //     },
  //   });
  // }

  // loadMemory() {
  //   this.monitorService.getMemoryData().subscribe({
  //     next: (response) => {
  //       this.memory.set(response);
  //       this.loading.set(false);
  //     },
  //     error: (err) => {
  //       this.error.set(err.message);
  //       this.loading.set(false);
  //     },
  //   });
  // }

  // loadAllProcesses() {
  //   this.monitorService.getAllProcesses().subscribe({
  //     next: (response) => {
  //       this.AllProcesses.set(response);
  //       this.loading.set(false);
  //     },
  //     error: (err) => {
  //       this.error.set(err.message);
  //       this.loading.set(false);
  //     },
  //   });
  // }

  loadDashboardData() {
    this.loading.set(true);

    forkJoin({
      cpu: this.monitorService.getCpuData(),
      memory: this.monitorService.getMemoryData(),
      AllProcesses: this.monitorService.getProcesses(),
    }).subscribe({
      next: (response) => {
        this.cpu.set(response.cpu);
        this.memory.set(response.memory);
        this.AllProcesses.set(response.AllProcesses);
        if (this.currentSearch) {
          this.searchProcess(this.currentSearch);
        } else {
          this.processes.set(response.AllProcesses);
        }

        this.loading.set(false);
        this.error.set(null);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  ngOnInit() {
    this.loadDashboardData();

    this.refresh = setInterval(() => {
      this.loadDashboardData();
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.refresh);
  }

  killProcess(pid: number) {
    if(confirm("confirm to kill process")){
      this.monitorService.killProcess(pid).subscribe({
        next:(response)=>{
          alert("success");
          this.loadDashboardData();
        },
        error:(err) =>{
          alert(err.message);
          this.error.set(err.message);
          this.loading.set(false);
        }
      });
    }

    // console.log(pid);
  }
  searchProcess(query: string) {
    query = query.trim();
    this.currentSearch = query;
    if (!this.currentSearch) {
      this.processes.set(this.AllProcesses());
    } else {
      let filteredArr = this.AllProcesses().filter((process) => {
        return process.name.toLowerCase().includes(this.currentSearch.toLowerCase());
      });
      this.processes.set(filteredArr);
    }

    // console.log(query);
  }
}
