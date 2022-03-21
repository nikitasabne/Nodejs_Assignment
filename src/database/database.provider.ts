import { DATABASE_CONNECTION } from '../constants';
import * as mongoose from 'mongoose';

export const DatabaseProvider = {
  provide: DATABASE_CONNECTION,
  useFactory: (): Promise<typeof mongoose> =>
    mongoose.connect(
      'mongodb+srv://admin:admin@cluster0.d6lel.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
};
