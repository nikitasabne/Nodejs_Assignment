import { DATABASE_CONNECTION, USER_MODEL } from 'src/constants';
import { UserSchema } from './entities/user.entity';
import { Connection } from 'mongoose';

export const UserModel = {
  provide: USER_MODEL,
  useFactory: (connection: Connection) => connection.model('user', UserSchema),
  inject: [DATABASE_CONNECTION],
};
