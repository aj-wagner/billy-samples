import { createLogger, transports, format } from 'winston';
const { combine, colorize, simple, timestamp } = format;

const options = {
  console: {
    level: 'info',
    handleExceptions: true,
    format: combine(colorize(), timestamp(), simple()),
  },
};

export const logger = createLogger({
  transports: [new transports.Console(options.console)],
  exitOnError: false, // do not exit on handled exceptions
});
