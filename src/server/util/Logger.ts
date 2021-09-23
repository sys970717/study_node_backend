import winston from 'winston';
import dailyRotateFile from 'winston-daily-rotate-file';
import dotenv from 'dotenv';
import fs, { stat } from 'fs';
import path from 'path';
import { IncomingMessage, ServerResponse } from 'http';

dotenv.config();
const { NODE_ENV, LOG_DIR } = process.env;

const logDir = LOG_DIR || path.resolve('logs');;
const logLevel = NODE_ENV === 'production' ? 'info' : 'debug';

const levels = {
  error: 0,
  trace: 1,
  warn: 2,
  http: 3,
  info: 4,
  debug: 5,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
  trace: 'violet',
}

// Define log format
const logFormat = winston.format.printf(info => {
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

const level = ():string => {
  return (NODE_ENV === 'development' ? 'debug' : 'info');
}

const logger = winston.createLogger({
  level: level(),
  levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.colorize({ all: true }),
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
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      logFormat,
      winston.format.colorize(),  // 색깔 넣어서 출력
      // winston.format.simple(),  // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
    )
  }));
  logger.debug("Logging initialized at debug level");
}

export function logRequest(req: IncomingMessage, res: ServerResponse) {
  const ip = req.socket.remoteAddress;
  const method = req.method;
  const url = req.url;
  req['_startAt'] = process.hrtime();

  res.on('finish', () => {
    const [sec, ns] = process.hrtime(req['_startAt']);
    const responseTime = Math.floor(sec * 1e3 + ns * 1e-6);
    const status = res.statusCode;

    logger.http(`${ip} ${method} ${url} ${status} ${responseTime}`);
  });
}

export default logger;