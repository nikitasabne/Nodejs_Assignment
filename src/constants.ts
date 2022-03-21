import * as mongoose from 'mongoose';

export const USER_MODEL = 'USER_MODEL';
export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
export const CAT_MODEL = 'CAT_MODEL';
export const MONGOOSE_TYPE = mongoose.Schema.Types;

export enum ENUM_AUTH_ROLES {
  NORMAL = 'normal',
  ADMIN = 'admin',
}
