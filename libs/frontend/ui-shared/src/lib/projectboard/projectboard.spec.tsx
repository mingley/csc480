import { render } from '@testing-library/react';


import Projectboard from './projectboard';

describe('Projectboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Projectboard match="/:name"/>);
    expect(baseElement).toBeTruthy();
  });
});
