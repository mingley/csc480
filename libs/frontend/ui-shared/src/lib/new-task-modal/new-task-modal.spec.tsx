import { render } from '@testing-library/react';

import NewTaskModal from './new-task-modal';

describe('NewTaskModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewTaskModal />);
    expect(baseElement).toBeTruthy();
  });
});
