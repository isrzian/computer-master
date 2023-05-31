import {CrudService} from '@steroidsjs/nest/src/usecases/services/CrudService';
import {normalizePhone} from '@steroidsjs/nest/src/infrastructure/decorators/fields/PhoneField';
import {DataMapper} from '@steroidsjs/nest/src/usecases/helpers/DataMapper';
import {UserSearchInputDto} from '../dtos/UserSearchInputDto';
import {UserSaveInputDto} from '../dtos/UserSaveInputDto';
import {UserModel} from '../models/UserModel';
import {IUserRepository} from '../interfaces/IUserRepository';
import {UserRegistrationDto} from '../dtos/UserRegistrationDto';
import {ISessionService} from '../../../auth/domain/interfaces/ISessionService';

export class UserService extends CrudService<UserModel,
    UserSearchInputDto,
    UserSaveInputDto | UserModel> {
    protected modelClass = UserModel;

    constructor(
        /** UserRepository */
        public repository: IUserRepository,
        private session: ISessionService,
    ) {
        super();
    }

    async findByLogin(login: string): Promise<UserModel> {
        const user = await this.repository.findOne([
            'or',
            {email: login},
            {login},
            {phone: normalizePhone(login)},
        ]);
        return user || null;
    }

    async registration(dto: UserRegistrationDto): Promise<UserModel> {
        const model = DataMapper.create(UserModel, dto);

        if (dto.password) {
            model.passwordHash = await this.session.hashPassword(dto.password);
        }

        return this.create(model);
    }
}
