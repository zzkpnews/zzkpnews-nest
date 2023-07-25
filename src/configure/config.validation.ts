import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ConfigureFileSchema } from './config.schema';
import { ScreenLog } from '@/equipment/logger/screenlog';

export function ConfigValidate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(ConfigureFileSchema, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });
  if (errors.length > 0) {
    ScreenLog('FATAL', `There are some wrong in configuration file and please check them by user-handbook!`);
    process.exit();
  }
  return validatedConfig;
}
