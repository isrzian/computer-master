import {StringField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';

export class FileWriteResult {
    @StringField()
    md5: string;
}
