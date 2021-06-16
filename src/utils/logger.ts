import winston, { createLogger, format, transports } from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const logger = createLogger({
  level: 'info',
  levels,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.colorize({ all: true }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  defaultMeta: { service: 'nodejs_program' },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new transports.File({ filename: 'logs/all.log' }),
  ],
});

export default logger;
