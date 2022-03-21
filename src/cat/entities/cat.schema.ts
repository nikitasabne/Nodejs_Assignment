import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type } from 'os';
import { MONGOOSE_TYPE } from 'src/constants';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  color: string;

  @Prop({ type: MONGOOSE_TYPE.ObjectId })
  owner_id: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
