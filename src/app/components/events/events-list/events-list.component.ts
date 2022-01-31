import { EventsModalComponent } from '../events-modal/events-modal.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/models/event';
import { EventsService } from 'src/app/services/event/events.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;

  public events: Event[] = [];
  public modalTitle: string = 'Create Event';
  public modalBtnText: string = 'Create event';
  public loading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe();
    this.subscription = this.eventsService.eventsChanges.subscribe((events) => {
      this.events = events;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  openDialogModal() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';

    dialogConfig.data = {
      id: 1,
      title: 'Create Event',
    };

    const dialogRef = this.dialog.open(EventsModalComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((data) => console.log('Dialog output:', { ...data }));
  }
}
