import {StringField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {SearchInputDto} from '@steroidsjs/nest/src/usecases/dtos/SearchInputDto';

export class ClientSearchDto extends SearchInputDto {
    @StringField()
    initials: string;

    @StringField()
    passportSeries: string;

    @StringField()
    passportNumber: string;
}
