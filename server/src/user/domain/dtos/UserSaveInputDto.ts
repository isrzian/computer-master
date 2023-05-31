import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {IntegerField, StringField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {UserModel} from '../models/UserModel';

export class UserSaveInputDto {
    @ExtendField(UserModel)
    login: string;

    @StringField({
        nullable: true,
        min: 8,
        minConstraintMessage: 'Длина пароля должна составлять не менее 8 символов',
    })
    password: string;

    @ExtendField(UserModel)
    passwordHash: string;

    @ExtendField(UserModel)
    phone: string;

    @ExtendField(UserModel)
    email: string;

    @ExtendField(UserModel)
    languageCode: string;

    @ExtendField(UserModel)
    isBanned: boolean;

    @IntegerField({
        isArray: true,
        nullable: true,
    })
    authRolesIds: number[];
}
