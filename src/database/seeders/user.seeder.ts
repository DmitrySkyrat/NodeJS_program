import { v4 as uuidv4 } from 'uuid';

export const users = [
    {
      id: uuidv4(),
      login: 'eugen',
      password: '9191',
      age: 13,
      isdeleted: false
    },
    {
      id: uuidv4(),
      login: 'valery',
      password: '4657',
      age: 27,
      isdeleted: false
    }
];
