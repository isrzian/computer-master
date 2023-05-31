import { join } from 'path';
import * as fs from 'node:fs';
import { DatabaseNamingStrategy } from '@steroidsjs/nest/src/infrastructure/base/DatabaseNamingStrategy';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const moduleNames = fs.readdirSync(join(__dirname, '..'));
const isMigrateCommand = !!(process.argv || []).find((arg) =>
  /^migrate/.exec(arg),
);

export default () => ({
  name: 'computer-master',
  title: 'ComputerMaster',
  version: '1.0',
  port: parseInt(process.env.PORT, 10),
  database: {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    entities: moduleNames.map((name) =>
      join(__dirname, `../${name}/infrastructure/tables/*Table{.ts,.js}`),
    ),
    migrations:
      process.env.APP_IS_CLI && isMigrateCommand
        ? moduleNames.map((name) =>
            join(__dirname, `../${name}/infrastructure/migrations/*{.ts,.js}`),
          )
        : [], // Do not include migrations on web and other cli commands
    migrationsTableName: 'migrations',
    synchronize: false,
    migrationsRun: false,
    logging: ['schema', 'warn', 'error', 'migration' /*, 'query'/**/],
    namingStrategy: new DatabaseNamingStrategy(),
  } as PostgresConnectionOptions,
  auth: {
    jwtAccessSecretKey:
      process.env.AUTH_JWT_ACCESS_SECRET_KEY ||
      process.env.AUTH_JWT_SECRET_KEY + 'a',
    jwtRefreshSecretKey:
      process.env.AUTH_JWT_REFRESH_SECRET_KEY ||
      process.env.AUTH_JWT_SECRET_KEY + 'r',
    accessTokenExpiresSec: '2m',
    refreshTokenExpiresSec: '90d',
    // Additional token expiration time for FilesAuthGuard
    filesTokenAdditionalTime: '1m',
    confirm: {
      expireMins: 60,
      repeatLimitSec: 60,
      attemptsCount: 5,
      smsCodeLength: Number(process.env.AUTH_CONFIRM_SMS_CODE_LENGTH) || 4,
      callCodeLength: Number(process.env.AUTH_CONFIRM_CALL_CODE_LENGTH) || 4,
      isEnableDebugStaticCode: process.env.AUTH_ENABLE_DEFAULT_CODE === '1',
      providerName: process.env.AUTH_PROVIDER_NAME || 'smsc',
      providerType: process.env.AUTH_PROVIDER_TYPE || 'voice', // or "sms", or "call"
    },
  },
  cors: {
    allowDomains: ['127.0.0.1:5173'],
  },
  notifier: {
    providers: {
      smsRu: {
        apiId: process.env.NOTIFIER_SMS_RU_API_ID,
      },
      smsc: {
        login: process.env.NOTIFIER_SMSC_LOGIN,
        password: process.env.NOTIFIER_SMSC_PASSWORD,
      },
    },
  },
});
