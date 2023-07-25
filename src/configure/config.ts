export interface ProgramConfigure {
  server: {
    port: number;
  };
  mysql: {
    hostname: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  paths: {
    dataPath: string;
    logPath: string;
  };
}

export default (): ProgramConfigure => ({
  server: {
    port: parseInt(process.env.SERVER_PORT, 10) || 3300,
  },
  mysql: {
    hostname: process.env.MYSQL_HOSTNAME,
    port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  paths: {
    dataPath: process.env.DATA_PATH,
    logPath: process.env.LOG_PATH,
  },
});
