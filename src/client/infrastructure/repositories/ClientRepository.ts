import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {ClientModel} from '../../domain/models/ClientModel';
import {ClientTable} from '../tables/ClientTable';

@Injectable()
export class ClientRepository extends CrudRepository<ClientModel> {
    protected modelClass = ClientModel;

    constructor(
        @InjectRepository(ClientTable)
        public dbRepository: Repository<ClientTable>,
    ) {
        super();
    }
}
