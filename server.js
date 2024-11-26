const logger = require('./pinoLogger');
const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
try {
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true }); // Create directory recursively if it doesn't exist
    }
} catch (err) {
    console.error('Error creating logs directory:', err.message);
}

// Override console.log and console.error to use Pino
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

console.log = (...args) => {
    logger.info(...args); // Log informational messages to the log file
    originalConsoleLog(...args); // Still log to console for visibility
};

console.error = (...args) => {
    logger.error(...args); // Log error messages to the log file
    originalConsoleError(...args); // Still log to console for visibility
};

// Sample API simulation for testing logs
const express = require('express');
const app = express();

app.get('/api/info', (req, res) => {
    let myobject = {};
    myobject.a = "add";
    myobject.b = "adsd";
    myobject.d = "ascs";
    myobject.e = "acs";
    myobject.f = "ac";
    myobject.fg = "ca";
    myobject.ax = "ac";
    console.log("I am in info box.", myobject); // Will log both to the console and log file
    console.log(myobject); 
    logger.info('Info: This is an informational message', myobject);
    res.send('Info logged!');
});

app.get('/api/warn', (req, res) => {
    console.log("I am in warn box."); // Will log both to the console and log file
    logger.warn('Warning: This is a warning message');
    res.send('Warning logged!');
});

app.get('/api/error', (req, res) => {
    console.log("I am in error box."); // Will log both to the console and log file
    logger.error('Error: This is an error message');
    res.status(500).send('Error logged!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Will log both to the console and log file
});
