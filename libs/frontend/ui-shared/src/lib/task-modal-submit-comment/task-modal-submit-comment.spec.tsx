import { render } from '@testing-library/react';

import TaskModalSubmitComment from './task-modal-submit-comment';

describe('TaskModalSubmitComment', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TaskModalSubmitComment />);
    expect(baseElement).toBeTruthy();
  });
});
