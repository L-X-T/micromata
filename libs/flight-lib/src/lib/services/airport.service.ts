import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  baseUrl = `http://www.angular.at/api`;

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<string[]> {
    const url = this.baseUrl + '/airport';
    return this.httpClient.get<string[]>(url);
  }
}
