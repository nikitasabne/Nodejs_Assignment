import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginByEmailDto } from './dto/login-by-email.dto';
import { SignupByEmailDto } from './dto/signup-by-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('email/login')
  LoginByEmail(@Body() credentials: LoginByEmailDto) {
    return this.authService.doLoginByEmail(credentials);
  }

  @Post('email/signup')
  SignupByEmail(@Body() credentials: SignupByEmailDto) {
    return this.authService.doSignupByEmail(credentials);
  }
}
