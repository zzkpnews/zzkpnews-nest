import { DependenceFlags } from '@/constants/dep-flags';
import { DataSource } from 'typeorm';

export const DatabaseProviders = [
  {
    provide: DependenceFlags.DataSource,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'zzkpnews',
        password: 'zzkpnews',
        database: 'zzkpnews_data',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
