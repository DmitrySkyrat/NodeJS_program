import { Response, Request, NextFunction } from 'express';
import User from '../database/models/user';
import jwtService from '../services/jwtToken.service';

const authorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({success: false, message: 'No token provided'});
  };

  const decoded = jwtService.checkToken(token);

  if (!decoded) {
    return res.status(403).json({success: false, message: 'Failed to authenticate token'});
  };

  User.findByPk(decoded.userId)
  .then(user => {
    if(!user) return res.status(404).json({ message: 'Not found' });

    return res.json(user);
  });
  
  next();
}

export default authorization;
