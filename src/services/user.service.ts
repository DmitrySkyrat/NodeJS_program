import {IUser} from '../model/users';

export function getAutoSuggestUsers(users: IUser[], loginSubstring: string, limit: number): IUser[] {
  return users
  .filter(user => user.login.includes(loginSubstring) && !user.isdeleted)
  .sort((user1: IUser, user2: IUser) => {
    if (user1.login.toLowerCase() < user2.login.toLowerCase()) return -1;
    if (user1.login.toLowerCase() > user2.login.toLowerCase()) return 1;

    return 0;
  })
  .slice(0, limit);
};
