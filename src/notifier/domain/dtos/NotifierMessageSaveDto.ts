import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {NotifierMessageModel} from '../models/NotifierMessageModel';

export class NotifierMessageSaveDto {
    @ExtendField(NotifierMessageModel, {
        required: true,
    })
    refId: number;

    @ExtendField(NotifierMessageModel, {
        required: true,
    })
    content: string;

    @ExtendField(NotifierMessageModel)
    templateName: string;

    @ExtendField(NotifierMessageModel)
    templateParams: string;

    @ExtendField(NotifierMessageModel, {
        required: true,
    })
    receiverId: number;
}
