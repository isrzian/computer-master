import {StringField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';

export class AuthConfirmLoginDto {
    @StringField({
        label: 'uid - сессии',
        required: true,
    })
    uid: string;

    @StringField({
        label: 'Code',
        required: true,
    })
    code: string;
}
