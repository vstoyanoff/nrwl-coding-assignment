import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

/**
 * This service acts as a mock back-end.
 * It has some intentional errors that you might have to fix.
 */

export type User = {
  id: number;
  name: string;
};

export type Ticket = {
  id: number;
  description: string;
  assigneeId: null | number;
  completed: boolean;
};

function randomDelay() {
  return Math.random() * 4000;
}

export class BackendService {
  storedTickets: Ticket[] = [];

  storedUsers: User[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ];

  lastId = 0;

  private findTicketById = (id: number) => {
    const found = this.storedTickets.find((ticket) => ticket.id === +id);
    if (found) return found;
    throw new Error(`Ticket (id=${id}) not found`);
  };
  private findUserById = (id: number) => {
    const found = this.storedUsers.find((user) => user.id === +id);
    if (found) return found;
    throw new Error(`User (id=${id}) not found`);
  };

  tickets(): Observable<Ticket[]> {
    return of(this.storedTickets).pipe(delay(randomDelay()));
  }

  ticket = (id: number): Observable<Ticket> => {
    return of(this.findTicketById(id)).pipe(delay(randomDelay()));
  };

  users(): Observable<User[]> {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number): Observable<User> {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  newTicket = (payload: { description: string }) => {
    const newTicket: Ticket = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: null,
      completed: false,
    };

    return of(newTicket).pipe(
      delay(randomDelay()),
      tap((ticket: Ticket) => this.storedTickets.push(ticket)),
    );
  };

  assign = (ticketId: number, userId: number) => {
    const foundTicket = this.findTicketById(+ticketId);
    const user = this.findUserById(+userId);

    if (foundTicket && user) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        tap((ticket: Ticket) => {
          ticket.assigneeId = +userId;
        }),
      );
    }

    return throwError(new Error('ticket or user not found'));
  };

  complete = (ticketId: number, completed: boolean) => {
    const foundTicket = this.findTicketById(+ticketId);
    if (foundTicket) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        tap((ticket: Ticket) => {
          ticket.completed = completed;
        }),
      );
    }

    return throwError(new Error('ticket not found'));
  };
}
