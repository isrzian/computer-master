import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {DeepPartial} from 'typeorm';
import {AuthLoginModel} from '../../domain/models/AuthLoginModel';

@TableFromModel(AuthLoginModel, 'auth_login')
export class AuthLoginTable implements DeepPartial<AuthLoginModel> {}
