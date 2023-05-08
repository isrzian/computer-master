import {ApiTags} from '@nestjs/swagger';
import {Controller, forwardRef, Get, Inject, Query} from '@nestjs/common';
import {AuthPermissionsService} from '../../domain/services/AuthPermissionsService';
import {FindPermissionsByRoleDto} from '../../domain/dtos/FindPermissionsByRoleDto';
import {AuthRoleService} from '../../domain/services/AuthRoleService';
import {AuthPermissions} from '../decorators/AuthPermissions';
import {PERMISSION_AUTH_MANAGE_ROLES_VIEW} from '../permissions';

@ApiTags('Доступы')
@Controller('/auth/permissions')
export class AuthPermissionController {
    constructor(
        @Inject(forwardRef(() => AuthPermissionsService))
        private service: AuthPermissionsService,
        private roleService: AuthRoleService,
    ) {
    }

    @Get('/tree')
    @AuthPermissions(PERMISSION_AUTH_MANAGE_ROLES_VIEW)
    async getTree() {
        return this.service.getPermissionsTree();
    }

    @Get('/get-by-role')
    @AuthPermissions(PERMISSION_AUTH_MANAGE_ROLES_VIEW)
    async getPermissionKeysByRoleId(@Query() dto: FindPermissionsByRoleDto) {
        return {permissionKeys: await this.roleService.getPermissionKeysByRoleId(dto.roleId)};
    }
}
