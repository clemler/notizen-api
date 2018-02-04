/**
 * logger.js: Logger class for the project
 * @module Logger
 *
 * (C) 2017 Chris Lemler
 * ISC LICENCE
 *
 */

const LVL_INFO = '[INFO]';
const LVL_WARN = '[WARN]';
const LVL_ERR = '[ERROR]';
const LVL_CRIT = '[CRITICAL]';

function timeStamp() {
  const date = new Date();
  return date.toISOString();
}

const formatMessage = (level, name, message) => {
  const date = new Date();
  return `${date.toISOString()} :: ${level} :: ${name} :: ${message}`;
}

class Logger {
  constructor(name) {
    this.name = name;
  }

  info(message) {
    console.log(formatMessage(LVL_INFO, this.name, message));
  }

  warn(message) {
    console.log(formatMessage(LVL_WARN, this.name, message));
  }

  error(message) {
    console.log(formatMessage(LVL_ERR, this.name, message));
  }

  critical(message) {
    console.log(formatMessage(LVL_CRIT, this.name, message));
  }
}

module.exports = Logger;
