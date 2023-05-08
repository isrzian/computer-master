import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {DeepPartial} from 'typeorm';
import { AuthPermissionModel } from '../../domain/models/AuthPermissionModel';

@TableFromModel(AuthPermissionModel, 'auth_permission')
export class AuthPermissionTable implements DeepPartial<AuthPermissionModel> {}
