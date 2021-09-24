import { atom } from 'recoil';

export const user = atom({
  key: 'userState',
  default: {
    id: '',
    email: '',
    password: '',
    project: [''],
    role: '',
  },
});

export const projectboards = atom({
  key: 'projectboardsState',
  default: [
    {
      id: '69',
      name: 'Test Project Board 1',
    },
  ],
});

export const current_project = atom({
  key: 'current_projectState',
  default: {
    id: '69',
    name: 'Test Project Board 1',
  },
});

export const project_columns = atom({
  key: 'project_columnsState',
  default: [
    {
      id: '69',
      title: 'column1',
      tasks: [
        {
          id: '69',
          title: 'task1',
          content: 'content1',
          status: 'todo',
          points: 1,
        }
      ],
    }
  ],
});
