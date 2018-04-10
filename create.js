//const uuid = require('uuid');
const AWS = require('aws-sdk');
const Logger = require('./lib/logger');
const util = require('util');
const { createNote, validateNote, saveNote } = require('./lib/notiz.js');

const logger = new Logger('notizen-api');
logger.info('I am here');

AWS.config.update({region: 'us-west-2'});
const db = new AWS.DynamoDB.DocumentClient();

function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in
  // 'event.body'
  const data = JSON.parse(event.body);
  logger.info(`Entered Create() --> ${util.inspect(data)}`);
  const NOTIZEN_TABLE = process.env.NOTIZEN_TABLE;
  logger.info(`Dynamo Table --> ${NOTIZEN_TABLE}`);
  createNote('USER-1234', data.content, data.attachment)
    .then((note) => {
      logger.info(util.inspect(note));
      return saveNote(note);
    })
    .then((result) => {
      logger.info(`Saved note --> ${result}`);
      callback(null, result);
    })
    .catch((error) => {
      logger.error(error);
      callback(error, null);
    });
}

module.exports = { main };
