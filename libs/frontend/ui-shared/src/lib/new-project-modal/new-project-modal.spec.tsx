import { render } from '@testing-library/react';

import NewProjectModal from './new-project-modal';

describe('NewProjectModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewProjectModal />);
    expect(baseElement).toBeTruthy();
  });
});
