import {ExecutionContext, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {ISessionService} from '../../domain/interfaces/ISessionService';
import {getTokenFromHttpRequest} from '../helpers/GetTokenFromHttpRequest';
import {AuthService} from '../../domain/services/AuthService';
import JwtTokenStatusEnum from '../../domain/enums/JwtTokenStatusEnum';
import {JWT_STRATEGY_NAME} from '../strategies/JwtStrategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_STRATEGY_NAME) {
    constructor(
        @Inject(ISessionService)
        private sessionsService: ISessionService,
        private authService: AuthService,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<any> {
        const req = context.switchToHttp().getRequest();
        const token = getTokenFromHttpRequest(req);
        if (!token) {
            return true;
        }
        const {status, payload} = this.sessionsService.verifyToken(token);
        if (status === JwtTokenStatusEnum.VALID && payload && await super.canActivate(context)) {
            req.user = await this.authService.createAuthUserDto(payload);
            return true;
        }
        throw new UnauthorizedException({message: 'Пользователь не авторизован'});
    }
}
