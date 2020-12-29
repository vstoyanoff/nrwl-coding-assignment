import React from 'react';
import { Observable } from 'rxjs';
import { Ticket as TicketProps } from '../../backend';

//Components
import { Button } from '@material-ui/core';
import { Header } from '../components/header/header';
import { TicketsList } from '../components/tickets-list/tickets-list';
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
        <TicketsList tickets={tickets} filter={filter} />
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
