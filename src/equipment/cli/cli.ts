import { CurrentVersion } from '@/constant/config';
import cli from 'commander';
import { red, bold, cyan } from 'colors';

export function printLOGO() {
  console.log(
    `
              _
    ____ ____| | __ _ __   _ __    ___ __      __ ___ 
   |_  /|_  /| |/ /| '_ \\ | '_ \\  / _ \\\\ \\ /\\ / // __|
    / /  / / |   < | |_) || | | ||  __/ \\ V  V / \\__ \\
   /___|/___||_|\\_\\| .__/ |_| |_| \\___|  \\_/\\_/  |___/
                   |_|
  
   ${bold(cyan('zzkpnews-website Backend Server'))} ${bold(CurrentVersion)}
   Copyright © 中原科技网 All Rights Reserved.
    `,
  );
}

export function startCLI() {
  cli.program
    .name('ZZKPNEWS-BACKEND-SERVER')
    .description('The backend service for zzkpnews website.')
    .version(CurrentVersion);

  cli.program
    .option(
      '--backup-data-only <string>',
      'To backup all the data from server and generate an archived package file to specified path.',
    )
    .action(() => {});

  cli.program
    .option(
      '--backup-all-server <string>',
      'To backup all the data and server configurations from server and generate an archived package file to specified path.',
    )
    .action(() => {});

  cli.program
    .option('--env-check', 'Check whether the configuration and operating environment meet the requirements.')
    .action(() => {});

  cli.program.option('--init', 'To initialize all the server configurations.').action(() => {});

  cli.program.option('--clear', `${bold(red('[DANGER] '))}Erase all data.`).action(() => {});

  cli.program
    .option('--recovery', `${bold(red('[DANGER] '))}Recovery all the configurations and data.`)
    .action(() => {});
}
