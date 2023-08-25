import { CurrentVersion } from '@/constant/config';
import { bold, cyan, underline } from 'colors';

export function printLOGO() {
  console.log(
    `
              _
    ____ ____| | __ _ __   _ __    ___ __      __ ___ 
   |_  /|_  /| |/ /| '_ \\ | '_ \\  / _ \\\\ \\ /\\ / // __|
    / /  / / |   < | |_) || | | ||  __/ \\ V  V / \\__ \\
   /___|/___||_|\\_\\| .__/ |_| |_| \\___|  \\_/\\_/  |___/
                   |_|
  
   ${bold(cyan('zzkpnews-website Backend Server'))} -version ${bold(CurrentVersion)}
   Copyright © zzkpnews All Rights Reserved.
   Powered By ${underline('terminels.com')}
  
   ${process.env.NODE_ENV === 'dev' && bold('NOTE: YOU ARE RUNNING IN DEVELOPMENT MODE.')}
  
    `,
  );
}
