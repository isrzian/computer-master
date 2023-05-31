import {StringField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';

export class AuthRefreshTokenDto {
    @StringField()
    refreshToken: string;
}