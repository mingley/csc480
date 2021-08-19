import { render } from '@testing-library/react';

import InviteForm from './InviteForrm';

describe('InviteForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InviteForm />);
    expect(baseElement).toBeTruthy();
  });
});
