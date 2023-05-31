import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ModuleHelper} from '@steroidsjs/nest/src/infrastructure/helpers/ModuleHelper';
import {ClientTable} from './tables/ClientTable';
import {IClientRepository} from '../domain/interfaces/IClientRepository';
import {ClientRepository} from './repositories/ClientRepository';
import {ClientService} from '../domain/services/ClientService';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClientTable]),
    ],
    controllers: ModuleHelper.importDir(__dirname + '/controllers'),
    providers: [
        {
            provide: IClientRepository,
            useClass: ClientRepository,
        },
        ModuleHelper.provide(ClientService, [
            IClientRepository,
        ]),
    ],
    exports: [
        ClientService,
        IClientRepository,
    ],
})
export class ClientModule {
}
