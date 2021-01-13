const winston = require("winston");

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  exitOnError: false,
  transports: [new winston.transports.Console()],
});

module.exports = logger;
