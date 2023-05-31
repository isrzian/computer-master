import {
    INotifierSendOptions, INotifierStoreOptions,
} from '../interfaces/INotifierSendOptions';
import NotifierProviderType from '../enums/NotifierProviderType';
import {INotifierProvider} from '../interfaces/INotifierProvider';
import NotifierStoreService from '../services/NotifierStoreService';
import {NotifierMessageSaveDto} from '../dtos/NotifierMessageSaveDto';

export class StoreProvider implements INotifierProvider {
    public type = NotifierProviderType.STORE;

    public name = 'store';

    constructor(
        /** @see NotifierStoreService  */
        public storeService: NotifierStoreService,
    ) {
    }

    async send(options: INotifierStoreOptions & INotifierSendOptions) {
        const notifierSaveDto = new NotifierMessageSaveDto();
        notifierSaveDto.receiverId = options.userId;
        notifierSaveDto.content = options.message;
        notifierSaveDto.refId = options.refId;
        // TODO notifierSaveDto.templateName = 'name1';
        // TODO notifierSaveDto.templateParams = '{asda:21,asdas:2121}';

        await this.storeService.create(notifierSaveDto);

        return options.message;
    }
}
