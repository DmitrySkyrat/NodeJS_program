import sequelize from '../database/models/index';
import UserGroup from '../database/models/user-group';

class UserGroupsService {
  addUsersToGroup(groupId: string, userIds: string[]): void {
    userIds.forEach(userId => {
    return sequelize.transaction(async (t) => {
 
        return UserGroup.create({
          UserId: userId,
          GroupId: groupId
        },
        { transaction: t })
        .then(result => {
          return  result;
        })
        .catch(error => {
          return console.log(error);
        })
      });
    });
  }
}

const userGroupsService = new UserGroupsService();

export default userGroupsService;
