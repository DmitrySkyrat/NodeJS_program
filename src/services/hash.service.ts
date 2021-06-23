import bcrypt from 'bcrypt';

class HashService {
  async hashPassword(password: string): Promise<string> {
    if(!password) return;

    const salt = await bcrypt.genSalt(12);

    return bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

const hashService = new HashService();

export default hashService;
