import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { ENUM_AUTH_ROLES } from 'src/constants';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(ENUM_AUTH_ROLES)
  role: string;
}
