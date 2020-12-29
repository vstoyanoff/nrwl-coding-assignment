import { Button } from '@material-ui/core';

import styles from './header.module.css';

interface HeaderProps {
  loading?: boolean;
  hasTickets?: boolean;
  addNew: () => void;
}

export function Header({ loading, hasTickets, addNew }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h2>{loading ? 'Loading tickets' : 'Tickets'}</h2>
      {hasTickets && !loading ? (
        <Button size='small' variant='contained' onClick={addNew}>
          Create new ticket
        </Button>
      ) : null}
    </header>
  );
}
