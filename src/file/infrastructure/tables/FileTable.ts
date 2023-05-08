import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {DeepPartial} from 'typeorm';
import { FileModel } from '../../domain/models/FileModel';

@TableFromModel(FileModel, 'file')
export class FileTable implements DeepPartial<FileModel> {}
