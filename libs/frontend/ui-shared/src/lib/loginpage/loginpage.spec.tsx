import { render } from '@testing-library/react';

import Loginpage from './loginpage';

describe('Loginpage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Loginpage />);
    expect(baseElement).toBeTruthy();
  });
});
