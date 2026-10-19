import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, retry, throwError, map } from 'rxjs';
import { CpuData,MemoryData,ProcessData } from '../models/monitor.interface';
@Injectable({
  providedIn: 'root',
})
export class MonitorService {
  private demoMemoryUsed = 7.2;
  private demoProcesses: ProcessData[] = [
    { pid: 1048, name: 'System', cpu: '2.4%', memory: '520' },
    { pid: 2180, name: 'Browser', cpu: '8.7%', memory: '1240' },
    { pid: 3264, name: 'Code Editor', cpu: '5.1%', memory: '890' },
    { pid: 4312, name: 'Background Service', cpu: '1.2%', memory: '310' },
    { pid: 5876, name: 'Terminal', cpu: '0.8%', memory: '180' },
  ];
  public isDemoMode =
    typeof window !== 'undefined' && window.__env?.DEMO_MODE === true;
  public apiUrl =
    typeof window !== 'undefined' && window.__env?.API_URL
      ? window.__env.API_URL
      : 'https://mini-os-server.vercel.app';
  public http = inject(HttpClient);
  public refreshMonitor :any;

  getCpuData():Observable<CpuData>{
    if (this.isDemoMode) {
      return of({
        model: 'Demo Processor',
        manufacture: 'Sample data',
        cores: '8',
        speed: '3.6',
        usage: `${this.randomInRange(8, 75).toFixed(1)}%`,
      });
    }

    return this.http.get<any>(`${this.apiUrl}/cpu`).pipe(
      retry(1),
      map(response => response.data),
      catchError(this.handleError)
    )
  }
  getMemoryData():Observable<MemoryData>{
    if (this.isDemoMode) {
      this.demoMemoryUsed = Math.min(
        15,
        Math.max(2, this.demoMemoryUsed + this.randomInRange(-0.4, 0.4)),
      );
      const freeMemory = 16 - this.demoMemoryUsed;

      return of({
        totalRAM: '16',
        usedRAM: this.demoMemoryUsed.toFixed(1),
        freeRAM: freeMemory.toFixed(1),
        usage: `${((this.demoMemoryUsed / 16) * 100).toFixed(1)}%`,
      });
    }

    return this.http.get<any>(`${this.apiUrl}/memory`).pipe(
      retry(1),
      map(response => response.data),
      catchError(this.handleError)
    )
  }
  getProcesses():Observable<ProcessData[]>{
    if (this.isDemoMode) {
      this.demoProcesses = this.demoProcesses.map((process) => ({
        ...process,
        cpu: `${this.randomInRange(0.1, 25).toFixed(1)}%`,
        memory: Math.round(
          Math.max(50, Number(process.memory) + this.randomInRange(-40, 40)),
        ).toString(),
      }));
      return of(this.demoProcesses);
    }

    return  this.http.get<any>(`${this.apiUrl}/processes`).pipe(
      retry(1),
      map(response => response.data),
      catchError(this.handleError)
    );
   
  }
  killProcess(pid:number):Observable<any>{
    if (this.isDemoMode) {
      const processIndex = this.demoProcesses.findIndex((process) => process.pid === pid);
      if (processIndex === -1) {
        return throwError(() => new Error('Demo process was not found.'));
      }

      this.demoProcesses = this.demoProcesses.filter((process) => process.pid !== pid);
      return of({
        success: true,
        message: 'Demo process removed. No real system process was terminated.',
      });
    }

    return  this.http.post(`${this.apiUrl}/processes/kill/${pid}`,{}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  private randomInRange(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }

  private handleError(error:HttpErrorResponse){
    let errorMessage = '';

    if(error.status === 0){ errorMessage = 'Unable to connect server make sure server running'}
    else if(error.status === 404){ errorMessage = 'Data Not Found in The server try again make correct request'}
    else if(error.status === 500){errorMessage = 'Internal server error try again'}
    else if(error.status === 401){ errorMessage = 'U Dont have permision to access it login first!1'}
    else if(error.status === 403){errorMessage = 'You Dont Have Permision to Kill Process'}
    else { errorMessage = 'Something went wrong. Please try again later.check for error'}

    return throwError(() => new Error(errorMessage))
  }

  // ngOnInit(){
  


}
