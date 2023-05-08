import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {DeepPartial} from 'typeorm';
import { FileImageModel } from '../../domain/models/FileImageModel';

@TableFromModel(FileImageModel, 'file_image')
export class FileImageTable implements DeepPartial<FileImageModel> {}
