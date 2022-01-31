import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EventsListComponent } from './components/events/events-list/events-list.component';
import { TicketsListComponent } from './components/tickets/tickets-list/tickets-list.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full',
  },
  {
    path: 'events',
    component: EventsListComponent,
  },
  {
    path: 'tickets',
    component: TicketsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
