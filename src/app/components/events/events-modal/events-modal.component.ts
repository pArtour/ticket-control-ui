import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _moment from 'moment';
import { EventsService } from '../../../services/event/events.service';
import { MY_FORMATS } from '../../../shared/date.format';

@Component({
  selector: 'app-events-modal',
  templateUrl: './events-modal.component.html',
  styleUrls: ['./events-modal.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EventsModalComponent implements OnInit {
  public form!: FormGroup;
  public title: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EventsModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private eventsService: EventsService
  ) {
    this.title = data.title;
  }

  ngOnInit() {
    this.form = this.fb!.group({
      name: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      date: new FormControl(_moment(new Date()), [
        Validators.required,
        (control) => {
          const today = _moment();
          const isPrevDate = control.value.diff(today, 'days') < 0;
          return isPrevDate ? { invalidDate: true } : null;
        },
      ]),
      type: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    const formValues = {
      ...this.form.value,
      date: this.form.value.date.toDate(),
    };
    this.eventsService.createEvent(formValues).subscribe(() => {
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
