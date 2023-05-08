import {StringField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';

export class ClientSearchDto {
    @StringField()
    initials: string;

    @StringField()
    passportSeries: string;

    @StringField()
    passportNumber: string;
}
