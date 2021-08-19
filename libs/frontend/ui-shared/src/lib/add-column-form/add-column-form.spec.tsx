import { render } from '@testing-library/react';

import AddColumnForm from './AddColumnForm';

describe('AddColumnForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddColumnForm />);
    expect(baseElement).toBeTruthy();
  });
});
