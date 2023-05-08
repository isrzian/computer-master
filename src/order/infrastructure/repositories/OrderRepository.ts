import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {OrderModel} from '../../domain/models/OrderModel';
import {OrderTable} from '../tables/OrderTable';

@Injectable()
export class OrderRepository extends CrudRepository<OrderModel> {
    protected modelClass = OrderModel;

    constructor(
        @InjectRepository(OrderTable)
        public dbRepository: Repository<OrderTable>,
    ) {
        super();
    }
}
