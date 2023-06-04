import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {UserModel} from '../../domain/models/UserModel';

export class UserSchema {
    @ExtendField(UserModel)
    id: number;
}
