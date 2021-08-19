import { render } from '@testing-library/react';

import AddTaskForm from './add-task-form';

describe('AddTaskForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddTaskForm />);
    expect(baseElement).toBeTruthy();
  });
});
