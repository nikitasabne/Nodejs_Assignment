import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { auth_role_key } from '../decorators/roles.decorator';
import { ENUM_AUTH_ROLES } from '../../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requireRole = this.reflector.get<string[]>(
      auth_role_key,
      context.getHandler(),
    );
    if (!requireRole) return true;
    else {
      const req = context.switchToHttp().getRequest();
      const { headers } = req;
      const { authorization } = headers;
      const token = authorization && authorization.split(' ')[1];

      if (!token) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Authentication token missing',
          error: 'Bad Request',
        });
      } else {
        try {
          req.user = this.authService.verifyJWT(token);
          if (req.user.role === ENUM_AUTH_ROLES.ADMIN) return true;
          const user = await this.userService.findOne(req.user._id);
          if (user) {
            // console.log('user: ', user);
            req.user = user;
            return true;
          } else return false;
        } catch (e) {
          throw new BadRequestException({
            statusCode: 400,
            message: e.message,
            error: 'Bad Request',
          });
        }
      }

      return false;
    }
  }
}
