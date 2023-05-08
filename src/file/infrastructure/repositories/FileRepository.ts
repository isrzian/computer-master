import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {IFileRepository} from '../../domain/interfaces/IFileRepository';
import {FileTable} from '../tables/FileTable';
import {FileModel} from '../../domain/models/FileModel';
import {FileStorageFabric} from '../../domain/services/FileStorageFabric';

@Injectable()
export class FileRepository extends CrudRepository<FileModel> implements IFileRepository {
    protected modelClass = FileModel;

    constructor(
        @InjectRepository(FileTable)
        public dbRepository: Repository<FileTable>,
        private fileStorageFabric: FileStorageFabric,
    ) {
        super();
    }

    protected entityToModel(obj: any): FileModel {
        const model = super.entityToModel(obj);
        model.url = this.fileStorageFabric.get(model.storageName).getUrl(model);
        return model;
    }
}
