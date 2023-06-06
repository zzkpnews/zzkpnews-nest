import { DependenceFlags } from '@/constant/dep-flags';
import Knex from 'knex';

export const DatabaseProviders = [
  {
    provide: DependenceFlags.DataSource,
    useValue: Knex({
      client: 'mysql2',
      connection: {
        host: 'localhost',
        port: 3306,
        user: 'zzkpnews',
        password: 'zzkpnews',
        database: 'zzkpnews_data',
        charset: 'utf8mb4',
      },
    }),
  },
];
