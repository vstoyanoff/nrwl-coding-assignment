import React from 'react';
import { Observable } from 'rxjs';
import { Ticket as TicketProps } from '../../backend';

//Components
import { Button } from '@material-ui/core';
import { Header } from '../components/header/header';
import { Ticket } from '../components/ticket/ticket';
import { AddTicket } from '../components/add-ticket/add-ticket';
import { Filter, FilterValue } from '../components/filter/filter';

interface HomepageProps {
  tickets: TicketProps[];
  loading: boolean;
  addNew: (payload: { description: string }) => Observable<TicketProps>;
}

export default function Homepage({
  tickets,
  loading,
  addNew,
}: HomepageProps): React.ReactElement {
  const [adding, setAdding] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<FilterValue>('');

  return (
    <>
      <Header
        addNew={() => setAdding(true)}
        loading={loading}
        hasTickets={!!tickets.length}
      />
      {!loading && <Filter filterValue={filter} handleFilter={setFilter} />}

      {loading ? null : tickets.length ? (
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
      ) : (
        <p>
          No tickets.{' '}
          <Button color='primary' size='small' onClick={() => setAdding(true)}>
            Create one
          </Button>
        </p>
      )}

      <AddTicket
        open={adding}
        handleClose={() => setAdding(false)}
        addNew={addNew}
      />
    </>
  );
}
