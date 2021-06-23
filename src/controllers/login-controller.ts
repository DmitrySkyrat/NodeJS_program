import { Response, Request } from 'express';
import jwtService from '../services/jwtToken.service';
import User from '../database/models/user';
import hashService from '../services/hash.service';
import { ILoginParams } from 'src/model/login';

class LoginController {
  async login(req: Request, res: Response){
    const body: ILoginParams  = req.body;
    const user = await User.findOne({ where: {login: body.login, isdeleted: false} });

    if (!user) throw new Error('Request error with login/password combination');

    const isValidPassword = await hashService.comparePassword(body.password, user.password);
    
    if (!isValidPassword) throw new Error('Invalid password');

    const token = await jwtService.generateToken(user.id);

    return res.json({user, token});
  }
}

const loginController = new LoginController();

export default loginController;
