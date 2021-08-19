import { render } from '@testing-library/react';

import Task from '../task/Task';

describe('Task', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Task />);
    expect(baseElement).toBeTruthy();
  });
});
