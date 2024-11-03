import * as winston from 'winston';

let logger: winston.Logger;

try {
  logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp with custom format
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
      }),
    ),
    transports: [
      new winston.transports.File({
        filename: `logs/combined-${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}.log`,
        level: 'info',
      }),
      new winston.transports.Console(),
    ],
  });
  logger.info('Logger initialized successfully');
} catch (error) {
  console.error('Failed to initialize logger:', error);
}

export { logger };
