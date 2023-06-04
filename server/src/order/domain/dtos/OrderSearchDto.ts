import {SearchInputDto} from '@steroidsjs/nest/src/usecases/dtos/SearchInputDto';
import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {OrderModel} from '../models/OrderModel';

export class OrderSearchDto extends SearchInputDto {
    @ExtendField(OrderModel)
    id: number;

    @ExtendField(OrderModel)
    phoneModel: string;

    @ExtendField(OrderModel)
    clientId: number;

    @ExtendField(OrderModel)
    isDone: boolean;
}
