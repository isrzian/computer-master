import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {ClientModel} from '../models/ClientModel';

export const IClientRepository = 'IClientRepository';

export type IClientRepository = ICrudRepository<ClientModel>
