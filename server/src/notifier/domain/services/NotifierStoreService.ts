import {CrudService} from '@steroidsjs/nest/src/usecases/services/CrudService';
import {NotifierMessageModel} from '../models/NotifierMessageModel';
import NotifierMessageSearchDto from '../dtos/NotifierMessageSearchDto';
import {NotifierMessageSaveDto} from '../dtos/NotifierMessageSaveDto';
import {INotifierMessageRepository} from '../interfaces/INotifierMessageRepository';

export default class NotifierStoreService extends CrudService<NotifierMessageModel,
    NotifierMessageSearchDto,
    NotifierMessageSaveDto> {
    protected modelClass = NotifierMessageModel;

    constructor(
        /** @see NotifierMessageRepository  */
        public repository: INotifierMessageRepository,
    ) {
        super();
    }
}
