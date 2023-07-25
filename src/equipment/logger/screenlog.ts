import { getLogTime } from '@/utils/time';
import { bgCyan, bgRed, cyan, green, red, yellow } from 'colors';
type LogLevel = 'ERROR' | 'FATAL' | 'INFO' | 'SUCCESS' | 'WARN' | 'DEBUG';

export function ScreenLog(level: LogLevel, message: string) {
  switch (level) {
    case 'ERROR':
      console.log(`${getLogTime()} ${red(' [ERROR] ')} ${message}`);
      break;
    case 'FATAL':
      console.log(`${getLogTime()} ${bgRed(' [FATAL] ')} ${message}`);
      break;
    case 'INFO':
      console.log(`${getLogTime()} ${cyan(' [INFO] ')} ${message}`);
      break;
    case 'WARN':
      console.log(`${getLogTime()} ${yellow(' [WARN] ')} ${message}`);
      break;
    case 'DEBUG':
      console.log(`${getLogTime()} ${bgCyan(' [DEBUG] ')} ${message}`);
      break;
    case 'SUCCESS':
      console.log(`${getLogTime()} ${green(' [SUCCESS] ')} ${message}`);
      break;
  }
}
