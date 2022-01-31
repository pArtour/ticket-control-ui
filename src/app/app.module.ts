import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMatModule } from './app-mat.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsCardComponent } from './components/events/events-list/events-card/events-card.component';
import { EventsListComponent } from './components/events/events-list/events-list.component';
import { EventsModalComponent } from './components/events/events-modal/events-modal.component';
import { TicketsCardComponent } from './components/tickets/tickets-list/tickets-card/tickets-card.component';
import { TicketsListComponent } from './components/tickets/tickets-list/tickets-list.component';
import { TicketsModalComponent } from './components/tickets/tickets-modal/tickets-modal.component';
import { ValidateModalComponent } from './components/tickets/validate-modal/validate-modal.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ErrorInterceptor } from './interceptors/error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    EventsListComponent,
    TicketsListComponent,
    EventsCardComponent,
    TicketsCardComponent,
    EventsModalComponent,
    ValidateModalComponent,
    TicketsModalComponent,
  ],
  imports: [
    AppMatModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppMatModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
