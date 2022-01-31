import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CreateEventValues } from 'src/app/models/create.event.values';
import { Event } from 'src/app/models/event';
import { TicketEvent } from 'src/app/models/tickets';
import { BASE_URL } from 'src/app/shared/base.url';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  public events: Event[] = [];
  public eventsChanges: Subject<Event[]> = new Subject<Event[]>();
  constructor(private http: HttpClient) {}

  public getEvents() {
    return this.http.get<Event[]>(`${BASE_URL}/events`).pipe(
      tap((events) => {
        this.events = events;
        this.eventsChanges.next(this.events);
      })
    );
  }

  public getAllEvents() {
    return this.http.get<TicketEvent[]>(`${BASE_URL}/events/all`);
  }

  public createEvent(values: CreateEventValues) {
    return this.http.post<Event>(`${BASE_URL}/events`, values).pipe(
      tap((event) => {
        this.events.push({ ...event, tickets: [] });
        this.eventsChanges.next(this.events);
      }),
      catchError((error) => {
        return error;
      })
    );
  }
}
