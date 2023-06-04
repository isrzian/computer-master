import {DeepPartial} from 'typeorm';
import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {OrderModel} from '../../domain/models/OrderModel';

@TableFromModel(OrderModel, 'order')
export class OrderTable implements DeepPartial<OrderModel> {}
