import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {AuthPermissionModel} from '../models/AuthPermissionModel';

export class AuthPermissionSaveInputDto {
    @ExtendField(AuthPermissionModel)
    name: string;
}
