import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {AuthConfirmModel} from '../models/AuthConfirmModel';

export class AuthConfirmSectionDto {
    @ExtendField(AuthConfirmModel)
    id: number;

    @ExtendField(AuthConfirmModel)
    uid: string;
}
