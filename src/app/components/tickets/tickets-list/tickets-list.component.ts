import { ValidateModalComponent } from '../validate-modal/validate-modal.component';
import { TicketsModalComponent } from '../tickets-modal/tickets-modal.component';
import { Subscription } from 'rxjs';
import { Ticket } from '../../../models/tickets';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TicketsService } from 'src/app/services/ticket/tickets.service';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss'],
})
export class TicketsListComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  public displayedColumns: string[] = [
    'id',
    'validationCode',
    'entered',
    'sold',
    'event',
    'action',
  ];
  public tickets: Ticket[] = [];
  public loading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private ticketsService: TicketsService
  ) {}

  ngOnInit(): void {
    this.ticketsService.getTickets().subscribe();
    this.subscription = this.ticketsService.ticketsChanged.subscribe(
      (tickets) => {
        this.tickets = tickets;
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public sellTicket(ticket: Ticket): void {
    this.ticketsService.sellTicket(ticket.id).subscribe();
  }

  public openCreateModal(): void {
    const createModalConfig = new MatDialogConfig();
    createModalConfig.autoFocus = true;
    createModalConfig.width = '300px';
    const dialogRef = this.dialog.open(
      TicketsModalComponent,
      createModalConfig
    );

    dialogRef
      .afterClosed()
      .subscribe((data) => console.log('Dialog output:', { ...data }));
  }

  openValidateModal(): void {
    const validateModalConfig = new MatDialogConfig();

    validateModalConfig.autoFocus = true;
    validateModalConfig.width = '300px';

    validateModalConfig.data = {
      id: 1,
      title: 'Validate Ticket',
    };

    const dialogRef = this.dialog.open(
      ValidateModalComponent,
      validateModalConfig
    );

    dialogRef
      .afterClosed()
      .subscribe((data) => console.log('Dialog output:', { ...data }));
  }
}
