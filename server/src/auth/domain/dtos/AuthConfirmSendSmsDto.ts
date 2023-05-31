import {PhoneField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';

export class AuthConfirmSendSmsDto {
    @PhoneField()
    phone: string;
}
