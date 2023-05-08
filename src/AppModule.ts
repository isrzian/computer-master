import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {TypeOrmModuleAsyncOptions} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import {CommandModule} from 'nestjs-command';
import {MigrateCommand} from '@steroidsjs/nest/src/infrastructure/commands/MigrateCommand';
import {ServeStaticModule} from '@nestjs/serve-static';
import {ScheduleModule} from '@nestjs/schedule';
import {SentryModule} from '@ntegral/nestjs-sentry';
import { APP_FILTER } from '@nestjs/core';
import config from './config';
import {AuthModule} from './auth/infrastructure/AuthModule';
import {UserModule} from './user/infrastructure/UserModule';
import {FileModule} from './file/infrastructure/FileModule';
import {GlobalModule} from './global/GlobalModule';
import {ValidationExceptionFilterCustom} from './base/infrastructure/filters/ValidationExceptionFilterCustom';
import {RequestExecutionExceptionFilter} from './base/infrastructure/filters/RequestExecutionExceptionFilter';
import {InitModule} from './init/infrastructure/InitModule';
import {NotifierModule} from './notifier/infrastructure/NotifierModule';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: config,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => (configService.get('database') as PostgresConnectionOptions),
        } as TypeOrmModuleAsyncOptions),
        process.env.APP_ENVIRONMENT === 'dev' && ServeStaticModule.forRoot({
            rootPath: process.env.APP_ROOT_FILES_DIR,
            serveRoot: process.env.APP_STATIC_URL_PREFIX,
            exclude: ['/api*'],
        }),
        process.env.APP_SENTRY_DSN && SentryModule.forRoot({
            dsn: process.env.APP_SENTRY_DSN,
            environment: process.env.APP_ENVIRONMENT,
        }),
        ScheduleModule.forRoot(),
        GlobalModule,
        InitModule,
        CommandModule,
        FileModule,
        AuthModule,
        UserModule,
        NotifierModule,
    ].filter(Boolean),
    providers: [
        MigrateCommand,
        {
            provide: APP_FILTER,
            useClass: ValidationExceptionFilterCustom,
        },
        {
            provide: APP_FILTER,
            useClass: RequestExecutionExceptionFilter,
        },
    ],
})
export class AppModule {
}
