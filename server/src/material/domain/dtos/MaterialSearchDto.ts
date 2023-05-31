import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {SearchInputDto} from '@steroidsjs/nest/src/usecases/dtos/SearchInputDto';
import {MaterialModel} from '../models/MaterialModel';

export class MaterialSearchDto extends SearchInputDto {
    @ExtendField(MaterialModel)
    name: string;
}
