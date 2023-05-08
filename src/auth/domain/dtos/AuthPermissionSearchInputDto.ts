import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {AuthPermissionModel} from '../models/AuthPermissionModel';

export class AuthPermissionSearchInputDto {
    @ExtendField(AuthPermissionModel)
    id: number;

    @ExtendField(AuthPermissionModel)
    name: string;
}
