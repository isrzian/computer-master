import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {DeepPartial} from 'typeorm';
import { AuthConfirmModel } from '../../domain/models/AuthConfirmModel';

@TableFromModel(AuthConfirmModel, 'auth_confirm')
export class AuthConfirmTable implements DeepPartial<AuthConfirmModel> {}
