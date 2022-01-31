export interface Event {
  id: number;
  name: string;
  location: string;
  type: string;
  barCode: number;
  tickets: EventTicket[];
  date: string;
}

export interface EventTicket {
  id: number;
  validationCode: number;
  sold: boolean;
  entered: boolean;
}
