import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {IntegerField, PasswordField, StringField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {UserModel} from '../models/UserModel';

export class UserRegistrationDto {
    @StringField({
        nullable: true,
    })
    login: string;

    @ExtendField(UserModel)
    email: string;

    @ExtendField(UserModel)
    phone: string;

    @PasswordField({
        nullable: true,
    })
    password: string;

    @IntegerField({
        nullable: true,
    })
    authRolesIds: number[];
}
