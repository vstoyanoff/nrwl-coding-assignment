import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BackendService, Ticket as TicketProps, User } from '../backend';

//Components
import { Container } from '@material-ui/core';

//Pages
import Homepage from './pages/homepage';
import TicketPage from './pages/ticket-page';

interface AppProps {
  backend: BackendService;
}

const App = ({ backend }: AppProps) => {
  const [tickets, setTickets] = useState([] as TicketProps[]);
  const [users, setUsers] = useState([] as User[]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const ticketsSub = backend.tickets().subscribe((result) => {
      setTickets(result);
      setLoading(false);
    });
    const usersSub = backend.users().subscribe((result) => {
      setUsers(result);
    });

    return () => {
      ticketsSub.unsubscribe();
      usersSub.unsubscribe();
    };
  }, [backend]);

  return (
    <div className='app'>
      <Router>
        <Container maxWidth='sm'>
          <Switch>
            <Route exact path='/'>
              <Homepage
                tickets={tickets}
                loading={loading}
                addNew={backend.newTicket}
              />
            </Route>

            <Route path='/ticket/:ticketId'>
              <TicketPage
                users={users}
                getTicket={backend.ticket}
                assign={backend.assign}
                complete={backend.complete}
              />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
