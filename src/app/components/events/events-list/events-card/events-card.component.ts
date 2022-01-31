import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-events-card',
  templateUrl: './events-card.component.html',
  styleUrls: ['./events-card.component.scss'],
})
export class EventsCardComponent implements OnInit {
  @Input() event?: Event;
  constructor() {}

  ngOnInit(): void {}

  public get soldTickets(): number {
    return this.event?.tickets.filter((ticket) => ticket.sold).length || 0;
  }

  public get enteredTickets(): number {
    return this.event?.tickets.filter((ticket) => ticket.entered).length || 0;
  }
}
