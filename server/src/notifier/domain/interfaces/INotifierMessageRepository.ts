import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {NotifierMessageModel} from '../models/NotifierMessageModel';

export const INotifierMessageRepository = 'INotifierMessageRepository';
export type INotifierMessageRepository = ICrudRepository<NotifierMessageModel>;
