import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConnectableObservable, Observable, pipe } from 'rxjs';
import { Flight } from '../models/flight';
import { delay, publish } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  flights: Flight[] = [];
  baseUrl = `http://www.angular.at/api`;
  // baseUrl = `http://localhost:3000`;

  reqDelay = 1000;

  constructor(private http: HttpClient) {}

  load(from: string, to: string, urgent: boolean): void {
    // 1 // no subscription
    // this.find(from, to, urgent);

    /*this.find(from, to, urgent).subscribe(
      (flights) => {
        this.flights = flights;
      },
      (err) => console.error('Error loading flights', err)
    );*/

    // 2 // 2 subscriptions
    /*this.find(from, to, urgent).subscribe(
      (flights) => {
        this.flights = flights;
      },
      (err) => console.error('Error loading flights', err)
    );*/

    // 3 // publish & connect
    /*const o = this.find(from, to, urgent).pipe(publish()) as ConnectableObservable<Flight[]>;
    o.connect();*/

    // 4 // 2 subscriptions
    /*o.subscribe(
      (flights) => {
        this.flights = flights;
      },
      (err) => console.error('Error loading flights', err)
    );*/

    // 1
    this.find(from, to, urgent)
      .pipe(delay(this.reqDelay))
      .subscribe(
        (flights) => {
          this.flights = flights;
        },
        (err) => console.error('Error loading flights', err)
      );
  }

  find(from: string, to: string, urgent: boolean = false): Observable<Flight[]> {
    // For offline access
    // let url = '/assets/data/data.json';

    // For online access
    let url = [this.baseUrl, 'flight'].join('/');

    if (urgent) {
      url = [this.baseUrl, 'error?code=403'].join('/');
    }

    const params = new HttpParams().set('from', from).set('to', to);

    const headers = new HttpHeaders().set('Accept', 'application/json');

    const reqObj = { params, headers };
    return this.http.get<Flight[]>(url, reqObj);
    // return of(flights).pipe(delay(this.reqDelay))
  }

  findById(id: string): Observable<Flight> {
    const reqObj = { params: new HttpParams().set('id', id) };
    const url = [this.baseUrl, 'flight'].join('/');
    return this.http.get<Flight>(url, reqObj);
    // return of(flights[0]).pipe(delay(this.reqDelay))
  }

  save(flight: Flight): Observable<Flight> {
    const url = [this.baseUrl, 'flight'].join('/');
    return this.http.post<Flight>(url, flight);
  }

  delay() {
    const ONE_MINUTE = 1000 * 60;

    const oldFlights = this.flights;
    const oldFlight = oldFlights[0];
    const oldDate = new Date(oldFlight.date);

    // Mutable
    oldDate.setTime(oldDate.getTime() + 15 * ONE_MINUTE);
    oldFlight.date = oldDate.toISOString();
  }
}
