import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {MaterialModel} from '../../domain/models/MaterialModel';
import {MaterialTable} from '../tables/MaterialTable';

@Injectable()
export class MaterialRepository extends CrudRepository<MaterialModel> {
    protected modelClass = MaterialModel;

    constructor(
        @InjectRepository(MaterialTable)
        public dbRepository: Repository<MaterialTable>,
    ) {
        super();
    }
}
