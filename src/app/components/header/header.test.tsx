import React from 'react';
import { render } from '@testing-library/react';

import { Header } from './header';

describe('Homepage header', () => {
  test('renders loading', () => {
    const { getByText } = render(<Header loading={true} addNew={jest.fn()} />);

    const loading = getByText(/loading/i);

    expect(loading).toBeInTheDocument();
  });

  test('renders heading', () => {
    const { getByText } = render(
      <Header loading={false} hasTickets={false} addNew={jest.fn()} />,
    );

    const heading = getByText(/tickets/i);

    expect(heading).toBeInTheDocument();
  });

  test('renders add button', () => {
    const { getByRole } = render(
      <Header loading={false} hasTickets={true} addNew={jest.fn()} />,
    );

    const button = getByRole('button');

    expect(button).toBeInTheDocument();
  });
});
