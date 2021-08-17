import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';
import { FlightBookingAppState } from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.State>(fromFlightBooking.flightBookingFeatureKey);

export const selectFlights = createSelector(selectFlightBookingState, (s) => s.flights);
export const negativeList = createSelector(selectFlightBookingState, (s) => s.negativeList);

export const selectFilteredFlights = createSelector(selectFlights, negativeList, (flights, negativeList) =>
  flights.filter((f) => !negativeList.includes(f.id))
);

export const selectFlightsWithProps = createSelector(
  (a: FlightBookingAppState) => a.flightBooking.flights,
  (flights, props: { blackList: number[] }) => flights.filter((f) => !props.blackList.includes(f.id))
);
