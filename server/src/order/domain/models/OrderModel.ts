import {
    BooleanField,
    CreateTimeField,
    PrimaryKeyField,
    RelationField,
    RelationIdField,
    StringField,
    UpdateTimeField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {ClientModel} from '../../../client/domain/models/ClientModel';
import {MaterialModel} from '../../../material/domain/models/MaterialModel';

export class OrderModel {
    @PrimaryKeyField()
    id: number;

    @StringField()
    phoneModel: string;

    @StringField()
    phoneColor: string;

    @StringField()
    phonePassword: string;

    @StringField()
    phoneView: string;

    @StringField()
    imei: string;

    @RelationField({
        type: 'ManyToMany',
        relationClass: () => MaterialModel,
        isOwningSide: true,
        inverseSide: () => MaterialModel,
    })
    materials: MaterialModel[];

    @RelationIdField({
        relationName: 'materials',
        isArray: true,
    })
    materialsIds: number[];

    @RelationField({
        type: 'ManyToOne',
        relationClass: () => ClientModel,
    })
    client: ClientModel;

    @RelationIdField({
        relationName: 'client',
    })
    clientId: number;

    @BooleanField({
        defaultValue: false,
    })
    isDone: boolean;

    @CreateTimeField({
        label: 'Создан',
    })
    createTime: string;

    @UpdateTimeField({
        label: 'Обновлен',
    })
    updateTime: string;
}
