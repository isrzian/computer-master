import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ModuleHelper} from '@steroidsjs/nest/src/infrastructure/helpers/ModuleHelper';
import {UserRepository} from './repositories/UserRepository';
import {UserTable} from './tables/UserTable';
import {UserService} from '../domain/services/UserService';
import {IUserRepository} from '../domain/interfaces/IUserRepository';
import {AuthModule} from '../../auth/infrastructure/AuthModule';
import {ISessionService} from '../../auth/domain/interfaces/ISessionService';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserTable]),
        forwardRef(() => AuthModule),
    ],
    providers: [
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
        ModuleHelper.provide(UserService, [
            IUserRepository,
            ISessionService,
        ]),
    ],
    exports: [
        UserService,
        IUserRepository,
    ],
})
export class UserModule {
}
