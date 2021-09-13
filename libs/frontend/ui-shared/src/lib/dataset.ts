export const dataset = [
  {
    name: 'Project Board 1',
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Todo',
        tasks: [
          {
            id: 'task-1',
            title: 'Task 1',
            content:
              'Content for task 1: This could get very long but may be this should be a preview!',
          },
          {
            id: 'task-3',
            title: 'Task 3',
            content: 'Content for task-3',
          },
        ],
      },
      'column-2': {
        id: 'column-2',
        title: 'Todo',
        tasks: [
          {
            id: 'task-2',
            title: 'Task 2',
            content: 'Content for task 2',
          },
          {
            id: 'task-4',
            title: 'Task 4',
            content: 'Content for task-4',
          },
        ],
      },
      'column-3': {
        id: 'column-1',
        title: 'Todo',
        tasks: [
          {
            id: 'task-6',
            title: 'Task 6',
            content: 'Content for task 6',
          },
          {
            id: 'task-8',
            title: 'Task 8',
            content: 'Content for task-8',
          },
        ],
      },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
  },
];
