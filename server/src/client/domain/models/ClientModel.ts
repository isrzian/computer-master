import {
    CreateTimeField,
    PrimaryKeyField,
    RelationField,
    RelationIdField,
    StringField,
    UpdateTimeField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {OrderModel} from '../../../order/domain/models/OrderModel';

export class ClientModel {
    @PrimaryKeyField()
    id: number;

    @StringField()
    initials: string;

    @StringField()
    phone: string;

    @StringField()
    email: string;

    @StringField()
    passportSeries: string;

    @StringField()
    passportNumber: string;

    @RelationField({
        type: 'OneToMany',
        relationClass: () => OrderModel,
        inverseSide: (order: OrderModel) => order.client,
    })
    orders: OrderModel[];

    @RelationIdField({
        relationName: 'orders',
        isArray: true,
    })
    ordersIds: number[];

    @CreateTimeField({
        label: 'Создан',
    })
    createTime: string;

    @UpdateTimeField({
        label: 'Обновлен',
    })
    updateTime: string;
}
