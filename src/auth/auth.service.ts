import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignupByEmailDto } from './dto/signup-by-email.dto';
import * as bcrypt from 'bcrypt';
import { LoginByEmailDto } from './dto/login-by-email.dto';
import { randomBytes } from 'crypto';
import * as jwt from 'jsonwebtoken';
import { ENUM_AUTH_ROLES } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {
    // console.log(randomBytes(32).toString('base64'));
  }

  generateJWT(data: Record<string, any>) {
    return jwt.sign(data, process.env.JWT_SECRET);
  }

  verifyJWT(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  async doSignupByEmail(credentials: SignupByEmailDto) {
    try {
      const enc_password = bcrypt.hashSync(credentials.password, 10);
      const user = await this.userService.create({
        ...credentials,
        password: enc_password,
        role: ENUM_AUTH_ROLES.NORMAL,
      });

      user.password = undefined;
      return user;
    } catch (e) {
      console.log('email already exist.. please try another');
    }
  }

  async doLoginByEmail(credentials: LoginByEmailDto) {
    const { email, password } = credentials;
    const user = await this.userService.getUserByEmail(email);
    if (user) {
      const comparePassword = bcrypt.compareSync(password, user.password);
      return comparePassword
        ? {
            auth_token: this.generateJWT({
              _id: user._id,
              name: user.name,
              email: user.email,
              role: 'user',
            }),
          }
        : 'email/password does not match';
    } else return " email / password doesn't match";
  }

  async doAdminLoginByEmail(credentials: LoginByEmailDto) {
    const { email, password } = credentials;
    if (email === (process.env.ADMIN_EMAIL as string)) {
      const comparePassword = bcrypt.compareSync(
        password,
        process.env.ADMIN_PASS as string,
      );
      return comparePassword
        ? {
            auth_token: this.generateJWT({
              _id: 'admin',
              name: 'admin',
              email: process.env.ADMIN_EMAIL as string,
              role: 'admin',
            }),
          }
        : 'email/password does not match';
    } else return " email / password doesn't match";
  }
}
