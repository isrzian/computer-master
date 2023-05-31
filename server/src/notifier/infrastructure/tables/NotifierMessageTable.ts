import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {DeepPartial} from 'typeorm';
import { NotifierMessageModel } from '../../domain/models/NotifierMessageModel';

@TableFromModel(NotifierMessageModel, 'notifier_message')
export class NotifierMessageTable implements DeepPartial<NotifierMessageModel> {}
