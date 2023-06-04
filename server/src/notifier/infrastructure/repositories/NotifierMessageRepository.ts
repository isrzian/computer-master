import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {NotifierMessageModel} from '../../domain/models/NotifierMessageModel';
import {NotifierMessageTable} from '../tables/NotifierMessageTable';

@Injectable()
export class NotifierMessageRepository extends CrudRepository<NotifierMessageModel> {
    protected modelClass = NotifierMessageModel;

    constructor(
        @InjectRepository(NotifierMessageTable)
        public dbRepository: Repository<NotifierMessageTable>,
    ) {
        super();
    }
}
