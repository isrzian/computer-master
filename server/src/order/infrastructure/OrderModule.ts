import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ModuleHelper} from '@steroidsjs/nest/src/infrastructure/helpers/ModuleHelper';
import {OrderTable} from './tables/OrderTable';
import {IOrderRepository} from '../domain/interfaces/IOrderRepository';
import {OrderRepository} from './repositories/OrderRepository';
import {OrderService} from '../domain/services/OrderService';
import {FileService} from '../../file/domain/services/FileService';
import {FileModule} from '../../file/infrastructure/FileModule';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderTable]),
        forwardRef(() => FileModule),
    ],
    controllers: ModuleHelper.importDir(__dirname + '/controllers'),
    providers: [
        {
            provide: IOrderRepository,
            useClass: OrderRepository,
        },
        ModuleHelper.provide(OrderService, [
            IOrderRepository,
            FileService,
        ]),
    ],
    exports: [
        OrderService,
        IOrderRepository,
    ],
})
export class OrderModule {
}
