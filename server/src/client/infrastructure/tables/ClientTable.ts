import {DeepPartial} from 'typeorm';
import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {ClientModel} from '../../domain/models/ClientModel';

@TableFromModel(ClientModel, 'client')
export class ClientTable implements DeepPartial<ClientModel> {}
