import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {UserModel} from '../models/UserModel';

export const IUserRepository = 'IUserRepository';

export type IUserRepository = ICrudRepository<UserModel>
