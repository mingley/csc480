import { render } from '@testing-library/react';

import TaskPage from './task-page';

describe('TaskPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TaskPage />);
    expect(baseElement).toBeTruthy();
  });
});
