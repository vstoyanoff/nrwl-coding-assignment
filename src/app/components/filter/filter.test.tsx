import React from 'react';
import { render } from '@testing-library/react';

import { Filter } from './filter';

describe('Filter bar', () => {
  test('renders correctly', () => {
    const { container } = render(
      <Filter filterValue='' handleFilter={jest.fn()} />,
    );

    expect(container).toMatchSnapshot();
  });
});
