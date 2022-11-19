const { format, createLogger, transports } = require('winston');
require('winston-daily-rotate-file');

const { combine, timestamp, label, prettyPrint } = format;
const CATEGORY = 'Capital Deck Log';

const fileCombineRotateTransport = new transports.DailyRotateFile({
  filename: 'logs/%DATE%/combined.log',
  datePattern: 'DD-MMM-YYYY',
  format: format.combine(format.uncolorize()),
  maxSize: '20m',
  maxFiles: '30d'
});

const fileErrorRotateTransport = new transports.DailyRotateFile({
  filename: 'logs/%DATE%/errors.log',
  datePattern: 'DD-MMM-YYYY',
  format: format.combine(format.uncolorize()),
  maxSize: '20m',
  maxFiles: '30d',
  level: 'error'
});

const logger = createLogger({
  level: 'debug',
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss'
    }),
    prettyPrint()
  ),
  transports: [new transports.Console(), fileCombineRotateTransport, fileErrorRotateTransport]
});

module.exports = logger;
