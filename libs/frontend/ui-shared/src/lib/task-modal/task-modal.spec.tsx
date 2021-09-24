import { render } from '@testing-library/react';

import TaskModal from './task-modal';

describe('TaskModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TaskModal />);
    expect(baseElement).toBeTruthy();
  });
});
