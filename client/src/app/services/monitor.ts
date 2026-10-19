import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, retry, throwError, map } from 'rxjs';
import { CpuData,MemoryData,ProcessData } from '../models/monitor.interface';
@Injectable({
  providedIn: 'root',
})
export class MonitorService {
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
        usage: '24.5%',
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
      return of({
        totalRAM: '16',
        usedRAM: '7.2',
        freeRAM: '8.8',
        usage: '45%',
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
      return of([
        { pid: 1048, name: 'System', cpu: '2.4%', memory: '520' },
        { pid: 2180, name: 'Browser', cpu: '8.7%', memory: '1240' },
        { pid: 3264, name: 'Code Editor', cpu: '5.1%', memory: '890' },
        { pid: 4312, name: 'Background Service', cpu: '1.2%', memory: '310' },
        { pid: 5876, name: 'Terminal', cpu: '0.8%', memory: '180' },
      ]);
    }

    return  this.http.get<any>(`${this.apiUrl}/processes`).pipe(
      retry(1),
      map(response => response.data),
      catchError(this.handleError)
    );
   
  }
  killProcess(pid:number):Observable<any>{
    if (this.isDemoMode) {
      return throwError(() => new Error('Process termination is disabled in demo mode.'));
    }

    return  this.http.post(`${this.apiUrl}/processes/kill/${pid}`,{}).pipe(
      retry(1),
      catchError(this.handleError)
    );
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
