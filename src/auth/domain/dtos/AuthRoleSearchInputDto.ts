import {StringField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {SearchInputDto} from '@steroidsjs/nest/src/usecases/dtos/SearchInputDto';

export class AuthRoleSearchInputDto extends SearchInputDto {
    @StringField({
        label: 'Наименование роли',
    })
    query: string;
}
