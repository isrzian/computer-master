import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ModuleHelper} from '@steroidsjs/nest/src/infrastructure/helpers/ModuleHelper';
import {OrderTable} from './tables/OrderTable';
import {IOrderRepository} from '../domain/interfaces/IOrderRepository';
import {OrderRepository} from './repositories/OrderRepository';
import {OrderService} from '../domain/services/OrderService';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderTable]),
    ],
    controllers: ModuleHelper.importDir(__dirname + '/controllers'),
    providers: [
        {
            provide: IOrderRepository,
            useClass: OrderRepository,
        },
        ModuleHelper.provide(OrderService, [
            IOrderRepository,
        ]),
    ],
    exports: [
        OrderService,
        IOrderRepository,
    ],
})
export class OrderModule {
}
