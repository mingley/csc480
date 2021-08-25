import { render } from '@testing-library/react';

import Column from './Column';

describe('Column', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Column />);
    expect(baseElement).toBeTruthy();
  });
});
