import {Body, Controller, Inject, Post, UseGuards} from '@nestjs/common';
import {ApiBody, ApiTags} from '@nestjs/swagger';
import {Context} from '@steroidsjs/nest/src/infrastructure/decorators/Context';
import {ContextDto} from '@steroidsjs/nest/src/usecases/dtos/ContextDto';
import {AuthService} from '../../domain/services/AuthService';
import {AuthLoginDto} from '../../domain/dtos/AuthLoginDto';
import {LoginPasswordAuthGuard} from '../guards/LoginPasswordAuthGuard';
import {AuthRefreshTokenDto} from '../../domain/dtos/AuthRefreshTokenDto';

@ApiTags('Авторизация')
@Controller('/auth')
export class AuthController {
    constructor(
        @Inject(AuthService) private authService: AuthService,
    ) {}

    @Post('/login')
    @UseGuards(LoginPasswordAuthGuard)
    @ApiBody({type: AuthLoginDto})
    login(@Context() context: ContextDto) {
        return this.authService.login(context.user);
    }

    @Post('/refresh')
    @ApiBody({type: AuthRefreshTokenDto})
    refresh(@Body() dto: AuthRefreshTokenDto) {
        return this.authService.refreshToken(dto.refreshToken);
    }
}
