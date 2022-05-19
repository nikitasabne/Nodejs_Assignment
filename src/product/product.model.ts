import { DATABASE_CONNECTION, PRODUCT_MODEL } from 'src/constants';
import { ProductSchema } from './Schema/product.schema';
import { Connection } from 'mongoose';

export const ProductModel = {
  provide: PRODUCT_MODEL,
  useFactory: (connection: Connection) =>
    connection.model('product', ProductSchema),
  inject: [DATABASE_CONNECTION],
};
