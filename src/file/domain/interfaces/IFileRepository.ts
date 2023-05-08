import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {FileModel} from '../models/FileModel';

export const IFileRepository = 'IFileRepository';

export interface IFileRepository extends ICrudRepository<FileModel> {
}
