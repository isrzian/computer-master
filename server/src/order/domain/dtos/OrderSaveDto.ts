import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {OrderModel} from '../models/OrderModel';

export class OrderSaveDto {
    @ExtendField(OrderModel)
    phoneModel: string;

    @ExtendField(OrderModel)
    phoneColor: string;

    @ExtendField(OrderModel)
    phonePassword: string;

    @ExtendField(OrderModel)
    phoneView: string;

    @ExtendField(OrderModel)
    imei: string;

    @ExtendField(OrderModel)
    materialsIds: number[];

    @ExtendField(OrderModel)
    clientId: number;

    @ExtendField(OrderModel)
    isDone: boolean;
}
