export interface Ticket {
  TicketID: number;
  TicketType: string;
  Subject: string;
  Description: string;
  Status: string;
  DateIssued: Date;
  LastUpdate: Date;
}

export interface FollowUpChat {
  ChatID: number;
  TicketID: number;
  Message: string;
  Sender: string;
  DateSent: Date;
}
