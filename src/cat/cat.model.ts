import { CAT_MODEL, DATABASE_CONNECTION } from 'src/constants';
import { Connection } from 'mongoose';
import { CatSchema } from './entities/cat.schema';

export const CatModel = {
  provide: CAT_MODEL,
  useFactory: (connection: Connection) => connection.model('cat', CatSchema),
  inject: [DATABASE_CONNECTION],
};
