import { render } from '@testing-library/react';

import AddTaskForm from '../add-task-from/AddTaskForm'

describe('AddTaskFrom', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddTaskForm />);
    expect(baseElement).toBeTruthy();
  });
});
