import { IsEmail, IsEnum, IsString } from 'class-validator';
import { ENUM_AUTH_ROLES } from 'src/constants';

export class SignupByEmailDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
