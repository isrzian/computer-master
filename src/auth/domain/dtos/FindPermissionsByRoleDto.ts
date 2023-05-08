import {IntegerField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';

export class FindPermissionsByRoleDto {
    @IntegerField({
        required: true,
        label: 'id роли',
    })
    roleId: number;
}
