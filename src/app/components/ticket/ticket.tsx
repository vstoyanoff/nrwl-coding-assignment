import React from 'react';
import {
  Card,
  CardContent,
  CardActionArea,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import styles from './ticket.module.css';
import { Ticket as TicketProps } from '../../../backend';

export function Ticket({
  id,
  description,
  assigneeId,
  completed,
}: TicketProps): React.ReactElement {
  const history = useHistory();

  return (
    <Card className={styles.card}>
      <CardActionArea onClick={() => history.push(`/ticket/${id}`)}>
        <CardContent>
          <h3>ID: {id}</h3>

          <p>Assigned to: {assigneeId ? '' : 'None'}</p>

          <p>
            <em>{description}</em>
          </p>

          <FormControlLabel
            value='end'
            control={
              <Checkbox
                color='primary'
                size='small'
                disabled={true}
                checked={completed}
              />
            }
            label='Completed'
            labelPlacement='end'
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
