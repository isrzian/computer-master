import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {ValidationException} from '@steroidsjs/nest/src/usecases/exceptions/ValidationException';
import {forwardRef, Injectable, Inject} from '@nestjs/common';
import {UserService} from '../../../user/domain/services/UserService';
import {SessionService} from '../services/SessionService';
import {AuthService} from '../../domain/services/AuthService';
import {ISessionService} from '../../domain/interfaces/ISessionService';

export const LOGIN_PASSWORD_STRATEGY_NAME = 'login-password';

@Injectable()
export class LoginPasswordStrategy extends PassportStrategy(Strategy, LOGIN_PASSWORD_STRATEGY_NAME) {
    constructor(
        @Inject(forwardRef(() => UserService))
        private usersService: UserService,
        @Inject(AuthService)
        private authService: AuthService,
        /** SessionService */
        private sessionService: ISessionService,
    ) {
        super({
            usernameField: 'login',
            passwordField: 'password',
        });
    }

    async validate(login: string, password: string): Promise<any> {
        const user = await this.usersService.findByLogin(login);
        if (user) {
            const passwordEquals = await this.sessionService.comparePassword(password, user.passwordHash);

            if (passwordEquals) {
                return this.authService.createAuthUserDto(this.authService.createTokenPayload(user));
            }
        }

        throw new ValidationException({
            password: 'Некорректный логин или пароль',
        });
    }
}
