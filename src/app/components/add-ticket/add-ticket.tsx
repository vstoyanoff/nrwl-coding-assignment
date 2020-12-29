import React from 'react';
import { Observable } from 'rxjs';
import { Modal, TextField, Button } from '@material-ui/core';

import { Ticket } from '../../../backend';
import styles from './add-ticket.module.css';

interface Props {
  open: boolean;
  addNew: (payload: { description: string }) => Observable<Ticket>;
  handleClose: () => void;
}

export function AddTicket({
  open,
  handleClose,
  addNew,
}: Props): React.ReactElement {
  const [loading, setLoading] = React.useState<boolean>(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as HTMLFormElement;
    const elements = target.elements as any;
    const description = elements.description.value;
    addNew({ description }).subscribe(() => {
      setLoading(false);
      handleClose();
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='Add new ticket'
      aria-describedby='Modal for adding new ticket'>
      <div className={styles.modalContent}>
        <h3>Add new ticket</h3>

        <form onSubmit={onSubmit} autoComplete='off'>
          <TextField
            label='Description'
            name='description'
            required={true}
            fullWidth={true}
            disabled={loading}
          />

          <Button
            type='submit'
            color='primary'
            variant='contained'
            disabled={loading}>
            Add
          </Button>
        </form>
      </div>
    </Modal>
  );
}
