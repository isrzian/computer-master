import {forwardRef, Global, Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ModuleHelper} from '@steroidsjs/nest/src/infrastructure/helpers/ModuleHelper';
import * as path from 'path';
import {UserModule} from '../../user/infrastructure/UserModule';
import {SessionService} from './services/SessionService';
import {UserService} from '../../user/domain/services/UserService';
import {AuthService} from '../domain/services/AuthService';
import {AuthLoginService} from '../domain/services/AuthLoginService';
import {AuthPermissionsService} from '../domain/services/AuthPermissionsService';
import {AuthLoginRepository} from './repositories/AuthLoginRepository';
import {AuthPermissionRepository} from './repositories/AuthPermissionRepository';
import {IAuthPermissionsRepository} from '../domain/interfaces/IAuthPermissionsRepository';
import {IAuthLoginRepository} from '../domain/interfaces/IAuthLoginRepository';
import {LoginPasswordStrategy} from './strategies/LoginPasswordStrategy';
import {JwtStrategy} from './strategies/JwtStrategy';
import {ISessionService} from '../domain/interfaces/ISessionService';
import {NotifierModule} from '../../notifier/infrastructure/NotifierModule';
import {IAuthConfirmRepository} from '../domain/interfaces/IAuthConfirmRepository';
import {AuthConfirmRepository} from './repositories/AuthConfirmRepository';
import {AuthConfirmService} from '../domain/services/AuthConfirmService';
import {NotifierService} from '../../notifier/domain/services/NotifierService';
import {LoginSmsCodeStrategy} from './strategies/LoginSmsCodeStrategy';
import {IAuthRoleRepository} from '../domain/interfaces/IAuthRoleRepository';
import {AuthRoleRepository} from './repositories/AuthRoleRepository';
import {AuthRoleService} from '../domain/services/AuthRoleService';
import {AuthFilePermissionService} from '../domain/services/AuthFilePermissionService';
import {FileService} from '../../file/domain/services/FileService';
import {FileModule} from '../../file/infrastructure/FileModule';

@Global()
@Module({
    imports: [
        ConfigModule,
        PassportModule,
        NotifierModule,
        forwardRef(() => UserModule),
        forwardRef(() => FileModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('auth.jwtAccessSecretKey'),
            }),
        }),
        TypeOrmModule.forFeature(ModuleHelper.importDir(path.join(__dirname, 'tables'))),
    ],
    controllers: ModuleHelper.importDir(path.join(__dirname, 'controllers')),
    providers: [
        {
            provide: IAuthLoginRepository,
            useClass: AuthLoginRepository,
        },
        {
            provide: IAuthPermissionsRepository,
            useClass: AuthPermissionRepository,
        },
        {
            provide: IAuthRoleRepository,
            useClass: AuthRoleRepository,
        },
        {
            provide: ISessionService,
            useClass: SessionService,
        },
        {
            provide: IAuthConfirmRepository,
            useClass: AuthConfirmRepository,
        },
        ModuleHelper.provide(AuthRoleService, [
            IAuthRoleRepository,
            AuthPermissionsService,
        ]),
        ModuleHelper.provide(AuthService, [
            UserService,
            ISessionService,
            AuthLoginService,
            AuthPermissionsService,
            ConfigService,
        ]),
        ModuleHelper.provide(AuthConfirmService, [
            IAuthConfirmRepository,
            NotifierService,
            UserService,
            ConfigService,
            AuthService,
        ]),
        ModuleHelper.provide(AuthLoginService, [
            IAuthLoginRepository,
            ConfigService,
            ISessionService,
        ]),
        ModuleHelper.provide(AuthPermissionsService, [
            IAuthPermissionsRepository,
            IAuthRoleRepository,
        ]),
        ModuleHelper.provide(AuthFilePermissionService, [
            FileService,
        ]),
        ModuleHelper.provide(LoginPasswordStrategy, [
            UserService,
            AuthService,
            ISessionService,
        ]),
        ModuleHelper.provide(LoginSmsCodeStrategy, [
            AuthConfirmService,
            AuthService,
            ISessionService,
        ]),
        JwtStrategy,
    ],
    exports: [
        ISessionService,
        AuthPermissionsService,
        AuthConfirmService,
        AuthService,
        AuthRoleService,
    ],
})
export class AuthModule {
}
