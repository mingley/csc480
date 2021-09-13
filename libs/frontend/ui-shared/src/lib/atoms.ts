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
      id: 69,
      name: 'Test Project Board 1',
    },
  ],
});
