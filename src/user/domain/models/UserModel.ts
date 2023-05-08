import {
    RelationField,
    PrimaryKeyField,
    StringField,
    PasswordField,
    PhoneField,
    EmailField,
    BooleanField,
    CreateTimeField,
    UpdateTimeField, RelationIdField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {AuthRoleModel} from '../../../auth/domain/models/AuthRoleModel';

/**
 * Пользователь системы
 */
export class UserModel {
    @PrimaryKeyField()
    id: number;

    @StringField({
        label: 'Логин пользователя (для операторов)',
        nullable: true,
    })
    login: string;

    @PasswordField({
        label: 'Хеш пароля',
        nullable: true,
    })
    passwordHash: string;

    @PhoneField({
        label: 'Телефон',
        unique: true,
        nullable: true,
        max: 20,
    })
    phone: string;

    @EmailField({
        label: 'Email',
        nullable: true,
        unique: true,
    })
    email: string;

    @StringField({
        label: 'Язык интерфейса, ISO 639-1',
        nullable: true,
    })
    languageCode: string;

    @BooleanField({
        label: 'Заблокирован?',
    })
    isBanned: boolean;

    @CreateTimeField({
        label: 'Создан',
    })
    createTime: string;

    @UpdateTimeField({
        label: 'Обновлен',
    })
    updateTime: string;

    @RelationField({
        label: '',
        type: 'ManyToMany',
        isOwningSide: false,
        relationClass: () => AuthRoleModel,
        inverseSide: (role: AuthRoleModel) => role.users,
    })
    authRoles: AuthRoleModel[];

    @RelationIdField({
        nullable: true,
        relationName: 'authRoles',
        isArray: true,
    })
    authRolesIds: number[];
}
