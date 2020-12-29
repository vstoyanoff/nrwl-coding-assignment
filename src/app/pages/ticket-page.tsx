import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Ticket, User } from '../../backend';

//Components
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';

interface TicketPageProps {
  users: User[];
  getTicket: any;
  assign: any;
  complete: any;
}

export default function TicketPage({
  users,
  getTicket,
  assign,
  complete,
}: TicketPageProps) {
  const [ticket, setTicket] = React.useState<Ticket>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [assigning, setAssigning] = React.useState<boolean>(false);
  const [completing, setCompleting] = React.useState<boolean>(false);

  const { ticketId } = useParams<{ ticketId: string }>();
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const elements = target.elements as any;
    const assignee = elements.assignee.value;

    if (ticket) {
      if (+assignee === ticket.assigneeId) {
        return;
      }

      setAssigning(true);
      assign(+ticketId, +assignee).subscribe(() => {
        setTicket({
          id: ticket.id,
          completed: ticket.completed,
          description: ticket.description,
          assigneeId: +assignee,
        });
        setAssigning(false);
      });
    }
  };

  const handleCompletion = () => {
    setCompleting(true);
    complete(+ticketId, !ticket?.completed).subscribe((result: Ticket) => {
      setTicket(result);
      setCompleting(false);
    });
  };

  React.useEffect(() => {
    try {
      const ticketSub = getTicket(+ticketId).subscribe((t: Ticket) => {
        setTicket(t);
        setLoading(false);
      });

      return () => ticketSub.unsubscribe();
    } catch (e) {
      history.push('/');
    }
  }, [getTicket, ticketId, history]);

  return (
    <article className='single-ticket'>
      <div className='single-ticket-header'>
        <h1>Ticket: {ticketId}</h1>

        <Button
          variant='contained'
          color={ticket?.completed ? 'secondary' : 'primary'}
          size='small'
          disabled={loading || completing}
          onClick={handleCompletion}>
          {ticket?.completed ? 'Un-Complete' : 'Complete'}
        </Button>
      </div>

      {loading && <p>Loading content...</p>}

      {ticket ? (
        <>
          <p>{ticket.description}</p>

          <p>
            Assigned to:{' '}
            {ticket.assigneeId
              ? users.find((u: User) => u.id === ticket.assigneeId)?.name
              : 'None'}
          </p>

          <form onSubmit={handleSubmit} className='single-ticket-form'>
            <FormControl>
              <InputLabel>Users</InputLabel>
              <Select
                name='assignee'
                defaultValue={(ticket && ticket.assigneeId) || 'None'}
                disabled={assigning}>
                <MenuItem disabled={true} value='None'>
                  None
                </MenuItem>
                {users.map((user: User) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              type='submit'
              variant='contained'
              color='secondary'
              size='small'
              disabled={assigning}>
              Assign
            </Button>
          </form>
        </>
      ) : null}
    </article>
  );
}
