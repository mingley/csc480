import { render } from '@testing-library/react';

import Projectboardslist from './projectboardslist';

describe('Projectboardslist', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Projectboardslist />);
    expect(baseElement).toBeTruthy();
  });
});
