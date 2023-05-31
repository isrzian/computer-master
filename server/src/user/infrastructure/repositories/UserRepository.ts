import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {UserModel} from '../../domain/models/UserModel';
import {UserTable} from '../tables/UserTable';

@Injectable()
export class UserRepository extends CrudRepository<UserModel> {
    constructor(
        @InjectRepository(UserTable)
        public dbRepository: Repository<UserTable>,
    ) {
        super();
    }

    protected modelClass = UserModel;
}
