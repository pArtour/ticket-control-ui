export interface Ticket {
  id: number;
  validationCode: number;
  entered: boolean;
  sold: boolean;
  event: TicketEvent;
}

export interface TicketEvent {
  id: number;
  name: string;
}
