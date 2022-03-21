import { SetMetadata } from '@nestjs/common';
import { ENUM_AUTH_ROLES } from 'src/constants';

export const auth_role_key = 'meta_auth_role';
export const Roles = (...auth_role: ENUM_AUTH_ROLES[]) =>
  SetMetadata(auth_role_key, auth_role);
