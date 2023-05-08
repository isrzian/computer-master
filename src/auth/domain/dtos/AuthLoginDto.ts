import {PasswordField, StringField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';

export class AuthLoginDto {
    @StringField({
        label: 'Логин',
        required: true,
    })
    login: string;

    @PasswordField({
        label: 'Пароль',
        required: true,
    })
    password: string;
}
