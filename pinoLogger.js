const pino = require('pino');
const dayjs = require('dayjs');
const path = require('path');

// Generate a log file name based on the current date
const logFileName = path.join(__dirname, 'logs', `${dayjs().format('YYYY-MM-DD')}.log`);

// Create a Pino logger instance
const loggerInstance = pino(
    {
        level: 'info', // Default log level
    },
    pino.destination({
        dest: logFileName, // Log file path
        sync: false, // Non-blocking logging
    })
);

// Wrapper around the logger to provide custom logging functions
const logger = {
    info: (...args) => loggerInstance.info(...args), // Logs informational messages
    warn: (...args) => loggerInstance.warn(...args), // Logs warnings
    error: (...args) => loggerInstance.error(...args), // Logs errors
    log: (...args) => loggerInstance.info(...args), // Default log (uses info level)
};

module.exports = logger;
