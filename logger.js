// const pino = require('pino')  //<---es5
import pino from 'pino';
// const packageJson = require('./package.json') //<---es5
import packageJson from './package.json' assert { type: 'json' };
// Define custom logging levels including the default level
const customLevels = {
  true: 'trace',
  10: 'debug',
  20: 'info',
  30: 'warn',
  40: 'error',
  50: 'fatal'
}

// Create a logger with custom levels
const logger = pino({
  level: 'trace', // Set the default level to trace
  customLevels,
  useLevelLabels: true, // Use level labels instead of numeric values
  // Add additional fields to log messages
  base: {
    service: packageJson.name // Add your application name
  },
  // Add timestamp format
  timestamp: pino.stdTimeFunctions.isoTime
})

export default logger