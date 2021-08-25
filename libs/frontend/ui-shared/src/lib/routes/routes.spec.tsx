import { render } from '@testing-library/react';

import Routes from './routes';

describe('Routes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Routes />);
    expect(baseElement).toBeTruthy();
  });
});
