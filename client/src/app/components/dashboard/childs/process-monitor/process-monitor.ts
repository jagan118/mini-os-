import { Component, EventEmitter, inject, Input, Output, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProcessData } from '../../../../models/monitor.interface';
import { MonitorService } from '../../../../services/monitor';

@Component({
  selector: 'app-process-monitor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './process-monitor.html',
  styleUrl: './process-monitor.css',
})
export class ProcessMonitor {
  public monitorService = inject(MonitorService);
  searchQuery = '';

  private _data = signal<ProcessData[]>([]);
  @Input() set data(value: ProcessData[]) { this._data.set(value ?? []); }
  get data(): ProcessData[] { return this._data(); }

  @Output() killProcess = new EventEmitter<number>();
  @Output() search = new EventEmitter<string>();

  maxMemory = computed(() => {
    const list = this._data();
    return list.length ? Math.max(...list.map(p => parseFloat(p.memory))) : 1;
  });

  pendingKillPid = signal<number | null>(null);

  onSearch() {
    this.search.emit(this.searchQuery);
  }

  onKillClick(pid: number) {
    if (this.pendingKillPid() === pid) {
      this.killProcess.emit(pid);
      this.pendingKillPid.set(null);
      return;
    }
    this.pendingKillPid.set(pid);
    setTimeout(() => {
      if (this.pendingKillPid() === pid) this.pendingKillPid.set(null);
    }, 3000);
  }



//================================================================
//below code is written by claude for styling purpose

  // process-monitor.ts
toNum(value: string | number): number {
  if (typeof value === 'number') return value;
  return parseFloat(value.replace('%', ''));
}

  // changed: string | number instead of number
  cpuMemPct(value: string | number): number {
    return Math.min(this.toNum(value), 100);
  }

  // changed: string | number instead of number
  memPct(value: string | number): number {
    return Math.min((this.toNum(value) / this.maxMemory()) * 100, 100);
  }

  // changed: string | number instead of number
  severity(cpu: string | number): 'ok' | 'warn' | 'crit' {
    const v = this.toNum(cpu);
    if (v >= 85) return 'crit';
    if (v >= 60) return 'warn';
    return 'ok';
  }
}