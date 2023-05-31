import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {ClientModel} from '../models/ClientModel';

export class ClientSaveDto {
    @ExtendField(ClientModel)
    initials: string;

    @ExtendField(ClientModel)
    phone: string;

    @ExtendField(ClientModel)
    email: string;

    @ExtendField(ClientModel)
    passportSeries: string;

    @ExtendField(ClientModel)
    passportNumber: string;
}
