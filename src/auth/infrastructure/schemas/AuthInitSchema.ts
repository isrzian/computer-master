import {RelationField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {UserSchema} from '../../../user/infrastructure/schemas/UserSchema';

export class AuthInitSchema {
    @RelationField({
        type: 'ManyToOne',
        relationClass: () => UserSchema,
    })
    user: UserSchema;
}
