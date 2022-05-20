import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type } from 'os';
import { Document } from 'mongoose';
import { ENUM_AUTH_ROLES } from '../../constants';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  role: ENUM_AUTH_ROLES;
}

export const UserSchema = SchemaFactory.createForClass(User);
