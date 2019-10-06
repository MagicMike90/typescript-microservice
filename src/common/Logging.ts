import path from 'path';
import winston from 'winston';

const { format, transports } = winston;
const { combine, label, timestamp, prettyPrint, json, colorize, metadata } = format;

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    label({ label: path.basename(process.mainModule.filename) }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    prettyPrint(),
    json(),
    colorize(),
    metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    }),
  );
}
