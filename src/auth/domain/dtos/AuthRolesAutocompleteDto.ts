import {IntegerField, StringField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';

export class AuthRolesAutocompleteDto {
    @IntegerField()
    id: number;

    @StringField()
    label: string;
}
