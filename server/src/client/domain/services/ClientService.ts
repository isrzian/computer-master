import {CrudService} from '@steroidsjs/nest/src/usecases/services/CrudService';
import {ClientModel} from '../models/ClientModel';
import {ClientSearchDto} from '../dtos/ClientSearchDto';
import {ClientSaveDto} from '../dtos/ClientSaveDto';
import {IClientRepository} from '../interfaces/IClientRepository';

export class ClientService extends CrudService<ClientModel,
    ClientSearchDto,
    ClientSaveDto | ClientModel> {
    protected modelClass = ClientModel;

    constructor(
        /** @see ClientRepository */
        public repository: IClientRepository,
    ) {
        super();
    }
}
