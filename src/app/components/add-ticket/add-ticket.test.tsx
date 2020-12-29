import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AddTicket } from './add-ticket';

describe('Add ticket modal', () => {
  test('submits new ticket', () => {
    const addNewMock = jest
      .fn()
      .mockImplementation(({ description }) => ({ subscribe: jest.fn() }));

    const { getByText, getByRole } = render(
      <AddTicket open={true} addNew={addNewMock} handleClose={jest.fn()} />,
    );
    const header = getByText(/add new ticket/i);
    const input = getByRole('textbox');
    const button = getByRole('button');

    userEvent.type(input, 'test');
    userEvent.click(button);

    expect(header).toBeInTheDocument();
    expect(addNewMock).toHaveBeenCalledTimes(1);
    expect(addNewMock).toHaveBeenCalledWith({ description: 'test' });
  });
});
