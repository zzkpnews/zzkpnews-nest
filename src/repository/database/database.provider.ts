import { DependenceFlags } from '@/constant/dep-flags';
import { ConfigService } from '@nestjs/config';
import Knex from 'knex';

export const DatabaseProviders = [
  {
    provide: DependenceFlags.DataSource,
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return Knex({
        client: 'mysql2',
        connection: {
          host: config.get('mysql.hostname'),
          port: config.get('mysql.port'),
          user: config.get('mysql.username'),
          password: config.get('mysql.password'),
          database: config.get('mysql.database'),
          charset: 'utf8mb4',
        },
      });
    },
  },
];
