import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

type Decoded = {
  userId: string;
}

dotenv.config();

class JwtService {
  generateToken(userId: string) {
    const payload = {userId};
    const options = {
      expiresIn: process.env.EXPIRES_IN,
      subject: userId
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }

  checkToken(token: string): Decoded {
    return jwt.verify(token, process.env.JWT_SECRET) as Decoded;
  }
}

const jwtService = new JwtService();

export default jwtService;
