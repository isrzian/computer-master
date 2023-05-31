import {FileService} from '../../../file/domain/services/FileService';
import {ContextDto} from '../dtos/ContextDto';

export class AuthFilePermissionService {
    constructor(
        private fileService: FileService,
    ) {}

    public async verifyFileAccess(filename: string, context: ContextDto) {
        return true;
    }
}
