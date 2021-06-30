import { Request, Response } from 'express';
import logger from '../utils/logger';
import userController from './user.controller';
import User from '../database/models/user';

describe('UserController', () => {
  let loggerMock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    loggerMock = jest.spyOn(logger, 'info');
  });

  it('should create new user', async () => {
    let response;

    User.create = jest.fn().mockImplementation(async() => {
      return {login: 'pillip', password: '234tre', age: 54, isdeleted: false};
    });

    const reqMock = { 
      body: {login: 'pillip', password: '234tre', age: 54, isdeleted: false}
    };

    const resMock: Partial<Response> = {
      status: jest.fn().mockImplementation(() => {
        return {
          json: jest.fn().mockImplementation((newUser) => {
            response = newUser;
          })
        };
      })
    };

    const expectedResult = {login: 'pillip', password: '234tre', age: 54, isdeleted: false};

    await userController.createUser(reqMock as Request, resMock as Response);

    expect(response).toEqual(expectedResult);
  });

  it('should catch create user error', async () => {
    let error;

    User.create = jest.fn().mockRejectedValue(new Error('ERROR: Create user error'));

    const reqMock = { 
      body: {login: 'pillip', password: '234tre', age: 54, isdeleted: false}
    };

    const resMock: Partial<Response> = {
      status: jest.fn().mockImplementation(() => {
        return {
          send: jest.fn().mockImplementation((err) => {
            error = err.message;
          })
        };
      })
    };

    const expectedResult = 'ERROR: Create user error';

    await userController.createUser(reqMock as Request, resMock as Response);

    setTimeout(() => {
      expect(error).toEqual(expectedResult);
      expect(loggerMock).toHaveBeenCalled();
    });
  });

  it('should get users', async () => {
    let response;

    User.findAll = jest.fn().mockImplementation(async() => {
      return [
        {id: '1', login: 'pillip', password: '234tre', age: 54, isdeleted: false},
        {id: '2', login: 'bobik', password: '4r32f', age: 22, isdeleted: false},
        {id: '3', login: 'gnomik', password: '64ffsd', age: 46, isdeleted: false}
      ];
    });

    const reqMock = {};

    const resMock: Partial<Response> = {
      json: jest.fn().mockImplementation((users) => {
        response = users;
      })
    };

    const expectedResult = [
      {id: '2', login: 'bobik', password: '4r32f', age: 22, isdeleted: false},
      {id: '3', login: 'gnomik', password: '64ffsd', age: 46, isdeleted: false},
      {id: '1', login: 'pillip', password: '234tre', age: 54, isdeleted: false}
    ];

    await userController.getUsers(reqMock as Request, resMock as Response);

    expect(response).toEqual(expectedResult);
  });

  it('should catch get users error', async () => {
    let error;

    User.findAll = jest.fn().mockRejectedValue(new Error('ERROR: Can not get users'));

    const reqMock = {};

    const resMock: Partial<Response> = {
      status: jest.fn().mockImplementation(() => {
        return {
          send: jest.fn().mockImplementation((err) => {
            error = err.message;
          })
        };
      })
    };

    const expectedResult = 'ERROR: Can not get users';

    await userController.getUsers(reqMock as Request, resMock as Response);

    setTimeout(() => {
      expect(error).toEqual(expectedResult);
      expect(loggerMock).toHaveBeenCalled();
    });
  });

  it('should get user by id', async () => {
    let response;

    User.findByPk = jest.fn().mockImplementation(async() => {
      return {id: '2', login: 'pillip', password: '234tre', age: 54, isdeleted: false};
    });

    const reqMock = {params: 2};

    const resMock: Partial<Response> = {
      json: jest.fn().mockImplementation((user) => {
        response = user;
      })
    };

    const expectedResult = {id: '2', login: 'pillip', password: '234tre', age: 54, isdeleted: false};

    await userController.getUserById(reqMock as any, resMock as Response);

    expect(response).toEqual(expectedResult);
  });

  it('should catch get user by id error', async () => {
    let error;

    User.findByPk = jest.fn().mockRejectedValue(new Error('ERROR: Can not get user'));

    const reqMock = {params: 2};

    const resMock: Partial<Response> = {
      status: jest.fn().mockImplementation(() => {
        return {
          send: jest.fn().mockImplementation((err) => {
            error = err.message;
          })
        };
      })
    };

    const expectedResult = 'ERROR: Can not get user';

    await userController.getUserById(reqMock as any, resMock as Response);

    setTimeout(() => {
      expect(error).toEqual(expectedResult);
      expect(loggerMock).toHaveBeenCalled();
    });
  });

  it('should delete user by id', async () => {
    let response;

    User.destroy = jest.fn().mockImplementation(async() => {
      return '2';
    });

    const reqMock = {params: '2'};

    const resMock: Partial<Response> = {
      status: jest.fn().mockImplementation(() => {
        return {
          json: jest.fn().mockImplementation((deletedId) => {
            response = deletedId;
          })
        };
      })
    };

    const expectedResult = '2';

    await userController.deleteUser(reqMock as any, resMock as Response);

    expect(response).toEqual(expectedResult);
  });

  it('should catch delete user error', async () => {
    let error;

    User.destroy = jest.fn().mockRejectedValue(new Error('ERROR: Can not delete user'));

    const reqMock = {params: 2};

    const resMock: Partial<Response> = {
      status: jest.fn().mockImplementation(() => {
        return {
          send: jest.fn().mockImplementation((err) => {
            error = err.message;
          })
        };
      })
    };

    const expectedResult = 'ERROR: Can not delete user';

    await userController.deleteUser(reqMock as any, resMock as Response);

    setTimeout(() => {
      expect(error).toEqual(expectedResult);
      expect(loggerMock).toHaveBeenCalled();
    });
  });

  it('should update user by id', async () => {
    let response;

    User.update = jest.fn().mockImplementation(async() => {
      return {login: 'pillip', password: '234tre', age: 54, isdeleted: false};
    });

    const reqMock = { 
      body: {login: 'pillip', password: '234tre', age: 54, isdeleted: false},
      params: '2'
    };

    const resMock: Partial<Response> = {
      status: jest.fn().mockImplementation(() => {
        return {
          json: jest.fn().mockImplementation((updatedStatus) => {
            response = updatedStatus;
          })
        };
      })
    };

    const expectedResult = {login: 'pillip', password: '234tre', age: 54, isdeleted: false};

    await userController.updateUserById(reqMock as any, resMock as Response);

    expect(response).toEqual(expectedResult);
  });

  it('should catch update user error', async () => {
    let error;

    User.update = jest.fn().mockRejectedValue(new Error('ERROR: Update user error'));

    const reqMock = { 
      body: {login: 'pillip', password: '234tre', age: 54, isdeleted: false},
      params: '2'
    };

    const resMock: Partial<Response> = {
      status: jest.fn().mockImplementation(() => {
        return {
          send: jest.fn().mockImplementation((err) => {
            error = err.message;
          })
        };
      })
    };

    const expectedResult = 'ERROR: Update user error';

    await userController.updateUserById(reqMock as any, resMock as Response);

    setTimeout(() => {
      expect(error).toEqual(expectedResult);
      expect(loggerMock).toHaveBeenCalled();
    });
  });
});
