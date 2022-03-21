import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type } from 'os';
import { Document } from 'mongoose';

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
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
