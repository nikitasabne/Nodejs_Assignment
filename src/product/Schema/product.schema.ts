import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { MONGOOSE_SCHEMA_TYPES } from 'src/constants';

export type ProductDocument = Product & Document;

export class Product {
  @Prop({ type: MONGOOSE_SCHEMA_TYPES.String, required: true })
  name: string;

  @Prop({ type: MONGOOSE_SCHEMA_TYPES.String, required: true })
  price: number;

  @Prop({ type: MONGOOSE_SCHEMA_TYPES.Boolean, required: true })
  published: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
