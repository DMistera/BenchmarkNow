import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Settings } from '../models/settings';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<Settings> {
    return this.http.get<Settings>("api/settings");
  }

  public set(value: Settings): Observable<null> {
    return this.http.put<null>("api/settings", value);
  }
}
