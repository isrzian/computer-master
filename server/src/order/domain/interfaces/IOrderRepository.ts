import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {OrderModel} from '../models/OrderModel';

export const IOrderRepository = 'IOrderRepository';

export type IOrderRepository = ICrudRepository<OrderModel>
