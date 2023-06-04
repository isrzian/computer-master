import {SearchInputDto} from '@steroidsjs/nest/src/usecases/dtos/SearchInputDto';
import {StringField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';

export class AuthConfirmSearchInputDto extends SearchInputDto {
    @StringField({
        label: 'uid',
    })
    uid: string;
}
