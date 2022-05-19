import * as mongoose from 'mongoose';
import { Schema, Types } from 'mongoose';

export const MONGOOSE_SCHEMA_TYPES = Schema.Types;

export const MONGOOSE_TYPES = Types;

export const USER_MODEL = 'USER_MODEL';
export const PRODUCT_MODEL = 'PRODUCT_MODEL';
export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
export const CAT_MODEL = 'CAT_MODEL';
export const MONGOOSE_TYPE = mongoose.Schema.Types;

export enum ENUM_AUTH_ROLES {
  NORMAL = 'normal',
  ADMIN = 'admin',
}
