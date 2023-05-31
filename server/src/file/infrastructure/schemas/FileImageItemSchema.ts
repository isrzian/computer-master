import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {FileImageModel} from '../../domain/models/FileImageModel';

export class FileImageItemSchema {
    @ExtendField(FileImageModel)
    id: number;

    @ExtendField(FileImageModel)
    url: string;

    @ExtendField(FileImageModel)
    width: number;

    @ExtendField(FileImageModel)
    height: number;
}
