import { v4 as uuidv4 } from 'uuid';

export const groups = [
    {
      id: uuidv4(),
      name: 'admin',
      permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
    },
    {
      id: uuidv4(),
      name: 'user',
      permissions: ['READ', 'SHARE', 'UPLOAD_FILES']
    }
];
