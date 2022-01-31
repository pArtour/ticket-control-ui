import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Ticket } from 'src/app/models/tickets';
import { BASE_URL } from 'src/app/shared/base.url';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  public ticketsChanged: Subject<Ticket[]> = new Subject<Ticket[]>();
  public tickets: Ticket[] = [];
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  public getTickets() {
    return this.http.get<Ticket[]>(`${BASE_URL}/tickets`).pipe(
      tap((tickets) => {
        this.tickets = tickets;
        this.ticketsChanged.next(tickets);
      })
    );
  }

  public sellTicket(id: number) {
    return this.http
      .patch<Ticket>(`${BASE_URL}/tickets/${id}/sell`, { sold: true })
      .pipe(
        tap(() => {
          const index = this.tickets.findIndex((item) => item.id === id);
          if (index !== -1) {
            this.tickets[index] = { ...this.tickets[index], sold: true };
            this.ticketsChanged.next([...this.tickets]);
          }
        })
      );
  }

  public validateTicket(data: { event: number; validationCode: number }) {
    return this.http.patch<Ticket>(`${BASE_URL}/tickets/validate`, data).pipe(
      tap((ticket) => {
        const index = this.tickets.findIndex((item) => item.id === ticket.id);
        if (index !== -1) {
          this.tickets[index] = { ...this.tickets[index], entered: true };
          this.ticketsChanged.next([...this.tickets]);
        }
      })
    );
  }

  public createTicket(data: { valudationCode: number; event: number }) {
    return this.http.post<Ticket>(`${BASE_URL}/tickets`, data);
  }
}
