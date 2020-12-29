import React from 'react';
import { Ticket as TicketProps } from '../../../backend';

//Types
import { Ticket } from '../ticket/ticket';
import { FilterValue } from '../filter/filter';

interface Props {
  tickets: TicketProps[];
  filter: FilterValue;
}

export function TicketsList({ tickets, filter }: Props) {
  return (
    <div>
      {tickets
        .filter((t) => {
          switch (filter) {
            case '':
              return true;
            case 'completed':
              return t.completed === true;
            case 'not-completed':
              return t.completed === false;
            default:
              throw new Error('This should not happen');
          }
        })
        .map((t) => (
          <Ticket key={t.id} {...t} />
        ))}
    </div>
  );
}
