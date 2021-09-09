import { createLogger, transports, format } from 'winston';
import dailyRotateFile from 'winston-daily-rotate-file';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import winston from 'winston/lib/winston/config';

dotenv.config();
const { NODE_ENV, LOG_DIR } = process.env;

const logDir = LOG_DIR || path.resolve('logs');;
const logLevel = NODE_ENV === 'production' ? 'info' : 'debug';

// Define log format
const logFormat = format.printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

if(!fs.existsSync(logDir)) {
  // Create directory if it doesn't exist
  fs.mkdirSync(logDir);
}

const options = {
  file: {
    level: logLevel,
    filename: `%DATE%.log`,
    dirname: logDir + '/exception',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxSize: '20m',
    colorize: true,
    maxFiles: 30,  // 30일치 로그 파일 저장
  }
}

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    // info 레벨 로그를 저장할 파일 설정
    new dailyRotateFile({
      ...options.file,
      level: 'info',
      dirname: logDir,
    }),
    // error 레벨 로그를 저장할 파일 설정
    new dailyRotateFile({
      ...options.file,
      level: 'error',
      dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장 
    }),
  ],
  exceptionHandlers: [new dailyRotateFile(options.file)],
  exitOnError: false, // do not exit on handled exceptions
});

if (NODE_ENV !== "production") {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),  // 색깔 넣어서 출력
      format.simple(),  // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
    )
  }));
  logger.debug("Logging initialized at debug level");
};

export default logger;