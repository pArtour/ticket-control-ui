import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TicketEvent } from 'src/app/models/tickets';
import { EventsService } from 'src/app/services/event/events.service';
import { TicketsService } from 'src/app/services/ticket/tickets.service';

@Component({
  selector: 'app-tickets-modal',
  templateUrl: './tickets-modal.component.html',
  styleUrls: ['./tickets-modal.component.scss'],
})
export class TicketsModalComponent implements OnInit {
  public form!: FormGroup;
  public events: TicketEvent[] = [];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TicketsModalComponent>,
    private eventsService: EventsService,
    private ticketsService: TicketsService
  ) {}

  ngOnInit() {
    this.form = this.fb!.group({
      validationCode: new FormControl('', [Validators.required]),
      event: new FormControl(undefined, Validators.required),
    });

    this.eventsService.getAllEvents().subscribe((events) => {
      this.events = events;
    });
  }

  onSubmit(): void {
    this.ticketsService.createTicket(this.form.value).subscribe(() => {
      this.ticketsService.getTickets().subscribe();
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
