import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TicketsService } from 'src/app/services/ticket/tickets.service';

@Component({
  selector: 'app-validate-modal',
  templateUrl: './validate-modal.component.html',
  styleUrls: ['./validate-modal.component.scss'],
})
export class ValidateModalComponent implements OnInit {
  public form!: FormGroup;
  public title: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ValidateModalComponent>,
    private _snackBar: MatSnackBar,
    private ticketsService: TicketsService,

    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.title = data.title;
  }

  ngOnInit() {
    this.form = this.fb!.group({
      validationCode: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    this.ticketsService.validateTicket(this.form.value).subscribe((ticket) => {
      if (ticket) {
        this._snackBar.open(`Ticket #${ticket.id} has been validated`, 'Close');
        this.close();
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
