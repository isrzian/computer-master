import {IContextDto} from '@steroidsjs/nest/src/usecases/dtos/ContextDto';
import {RelationField, StringField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {AuthConfirmSectionDto} from './AuthConfirmSectionDto';

export class ContextDto implements IContextDto {
    @StringField()
    user?: any | { // TODO Use AuthUserDto
        id?: number,
        name?: string,
        permissions?: string[],
    };

    @StringField()
    language?: string;

    @RelationField({
        type: 'ManyToOne',
        relationClass: () => AuthConfirmSectionDto,
    })
    authConfirm?: AuthConfirmSectionDto;
}
