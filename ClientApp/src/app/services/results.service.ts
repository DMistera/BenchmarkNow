import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BenchmarkResult } from '../models/benchmark-result';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http: HttpClient) { }

  public get() : Observable<BenchmarkResult> {
    return this.http.get<BenchmarkResult>("api/BenchmarkResult");
  }


  public clear(): Observable<void> {
    return this.http.delete<void>("/api/measurements");
  }


}
