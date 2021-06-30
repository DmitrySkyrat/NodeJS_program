import { Request, Response } from 'express';
import logger from '../utils/logger';
import groupController from './group.controller';
import Group from '../database/models/group';

describe('GroupController', () => {
  let loggerMock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    loggerMock = jest.spyOn(logger, 'info');
  });

  it('should create a new group', async () => {
    let response = {};

    Group.create = jest.fn().mockImplementation(async() => {
      return {name: 'admin', permissions: ['READ', 'WRITE']};
    });

    const reqMock = { 
      body: {name: 'admin', permissions: ['READ', 'WRITE']}
    };

    const resMock: Partial<Response> = {
      status: jest.fn().mockImplementation(() => {
        return {
          json: jest.fn().mockImplementation((newGroup) => {
            response = newGroup;
          })
        };
      })
    };

    const expectedResult = {name: 'admin', permissions: ['READ', 'WRITE']};

    await groupController.createGroup(reqMock as Request, resMock as Response);

    expect(response).toEqual(expectedResult);
  });

  it('should catch create group error', async () => {
    let error;

    Group.create = jest.fn().mockRejectedValue(new Error('ERROR: Create group error'));

    const reqMock = { 
      body: {name: 'admin', permissions: ['READ', 'WRITE']}
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

    const expectedResult = 'ERROR: Create group error';

    await groupController.createGroup(reqMock as Request, resMock as Response);

    setTimeout(() => {
      expect(error).toEqual(expectedResult);
      expect(loggerMock).toHaveBeenCalled();
    });
  });

  it('should get groups', async () => {
    let response;

    Group.findAll = jest.fn().mockImplementation(async() => {
      return [
        {id: '1', name: 'admin', permissions: ['READ', 'WRITE']},
        {id: '2', name: 'user', permissions: ['READ', 'WRITE']},
        {id: '3', name: 'guest', permissions: ['READ', 'WRITE']}
      ];
    });

    const reqMock = {};

    const resMock: Partial<Response> = {
      json: jest.fn().mockImplementation((groups) => {
        response = groups;
      })
    };

    const expectedResult = [
      {id: '1', name: 'admin', permissions: ['READ', 'WRITE']},
      {id: '2', name: 'user', permissions: ['READ', 'WRITE']},
      {id: '3', name: 'guest', permissions: ['READ', 'WRITE']}
    ];

    await groupController.getAllGroups(reqMock as Request, resMock as Response);

    expect(response).toEqual(expectedResult);
  });

  it('should catch get groups error', async () => {
    let error;

    Group.findAll = jest.fn().mockRejectedValue(new Error('ERROR: Can not get groups'));

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

    const expectedResult = 'ERROR: Can not get groups';

    await groupController.getAllGroups(reqMock as Request, resMock as Response);

    setTimeout(() => {
      expect(error).toEqual(expectedResult);
      expect(loggerMock).toHaveBeenCalled();
    });
  });

  it('should get group by id', async () => {
    let response;

    Group.findByPk = jest.fn().mockImplementation(async() => {
      return {id: '1', name: 'admin', permissions: ['READ', 'WRITE']};
    });

    const reqMock = {params: 2};

    const resMock: Partial<Response> = {
      json: jest.fn().mockImplementation((group) => {
        response = group;
      })
    };

    const expectedResult = {id: '1', name: 'admin', permissions: ['READ', 'WRITE']};

    await groupController.getGroupById(reqMock as any, resMock as Response);

    expect(response).toEqual(expectedResult);
  });

  it('should catch get group by id error', async () => {
    let error;

    Group.findByPk = jest.fn().mockRejectedValue(new Error('ERROR: Can not get group'));

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

    const expectedResult = 'ERROR: Can not get group';

    await groupController.getGroupById(reqMock as any, resMock as Response);

    setTimeout(() => {
      expect(error).toEqual(expectedResult);
      expect(loggerMock).toHaveBeenCalled();
    });
  });

  it('should delete group by id', async () => {
    let response;

    Group.destroy = jest.fn().mockImplementation(async() => {
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

    await groupController.deleteGroup(reqMock as any, resMock as Response);

    expect(response).toEqual(expectedResult);
  });

  it('should catch delete group error', async () => {
    let error;

    Group.destroy = jest.fn().mockRejectedValue(new Error('ERROR: Can not delete group'));

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

    const expectedResult = 'ERROR: Can not delete group';

    await groupController.deleteGroup(reqMock as any, resMock as Response);

    setTimeout(() => {
      expect(error).toEqual(expectedResult);
      expect(loggerMock).toHaveBeenCalled();
    });
  });

  it('should update group by id', async () => {
    let response;

    Group.update = jest.fn().mockImplementation(async() => {
      return {name: 'admin', permissions: ['READ', 'WRITE']};
    });

    const reqMock = { 
      body: {name: 'admin', permissions: ['READ', 'WRITE']},
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

    const expectedResult = {name: 'admin', permissions: ['READ', 'WRITE']};

    await groupController.updateGroup(reqMock as any, resMock as Response);

    expect(response).toEqual(expectedResult);
  });

  it('should catch update group error', async () => {
    let error;

    Group.update = jest.fn().mockRejectedValue(new Error('ERROR: Update group error'));

    const reqMock = { 
      body: {name: 'admin', permissions: ['READ', 'WRITE']},
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

    const expectedResult = 'ERROR: Update group error';

    await groupController.updateGroup(reqMock as any, resMock as Response);

    setTimeout(() => {
      expect(error).toEqual(expectedResult);
      expect(loggerMock).toHaveBeenCalled();
    });
  });
});
