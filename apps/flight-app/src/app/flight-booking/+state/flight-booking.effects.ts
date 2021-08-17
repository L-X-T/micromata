import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FlightService } from '@flight-workspace/flight-lib';
import { flightsLoaded, loadFlights, loadFlightsError } from './flight-booking.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class FlightBookingEffects {
  loadFlights$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(loadFlights),
      switchMap((a) =>
        this.flightService.find(a.from, a.to, a.urgent).pipe(
          map((flights) => flightsLoaded({ flights })),
          catchError((err) => of(loadFlightsError()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private flightService: FlightService) {}
}
