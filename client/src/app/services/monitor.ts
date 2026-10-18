import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError,map } from 'rxjs';
import { CpuData,MemoryData,ProcessData } from '../models/monitor.interface';
@Injectable({
  providedIn: 'root',
})
export class MonitorService {
  public apiUrl = "http://localhost:3000"
  public http = inject(HttpClient);
  public refreshMonitor :any;

  getCpuData():Observable<CpuData>{
    return this.http.get<any>(`${this.apiUrl}/cpu`).pipe(
      retry(1),
      map(response => response.data),
      catchError(this.handleError)
    )
  }
  getMemoryData():Observable<MemoryData>{
    return this.http.get<any>(`${this.apiUrl}/memory`).pipe(
      retry(1),
      map(response => response.data),
      catchError(this.handleError)
    )
  }
  getProcesses():Observable<ProcessData[]>{
    return  this.http.get<any>(`${this.apiUrl}/processes`).pipe(
      retry(1),
      map(response => response.data),
      catchError(this.handleError)
    );
   
  }
  killProcess(pid:number):Observable<any>{
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
