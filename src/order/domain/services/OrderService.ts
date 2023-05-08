import {CrudService} from '@steroidsjs/nest/src/usecases/services/CrudService';
import {OrderModel} from '../models/OrderModel';
import {OrderSearchDto} from '../dtos/OrderSearchDto';
import {OrderSaveDto} from '../dtos/OrderSaveDto';
import {IOrderRepository} from '../interfaces/IOrderRepository';

export class OrderService extends CrudService<OrderModel,
    OrderSearchDto,
    OrderSaveDto | OrderModel> {
    protected modelClass = OrderModel;

    constructor(
        /** @see OrderRepository */
        public repository: IOrderRepository,
    ) {
        super();
    }
}
