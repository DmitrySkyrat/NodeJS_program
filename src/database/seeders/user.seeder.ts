import { v4 as uuidv4 } from 'uuid';

export const users = [
    {
      id: uuidv4(),
      login: 'eugen',
      password: '$2b$12$nux/jKvRTc/YQ2nIYMcrMOC1q/GNQwfFSyOR8WLe8YmVXdVBxPQuC',
      age: 13,
      isdeleted: false
    },
    {
      id: uuidv4(),
      login: 'valery',
      password: '$2b$12$9VEpgiMTTzvzIDJzntGLp.xNBXwbJ2LjTiGk7UUoxl8kUSMOnhMfK',
      age: 27,
      isdeleted: false
    }
];
