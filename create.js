const AWS = require('aws-sdk');
const Logger = require('./lib/logger');
const util = require('util');
const { createNote, validateNote, saveNote } = require('./lib/notiz.js');

const logger = new Logger('notizen-api');
logger.info('I am here');

AWS.config.update({ region: 'us-west-2' });

function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in
  // 'event.body'
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  };
  const data = JSON.parse(event.body);

  logger.info(`Entered Create() --> ${util.inspect(data)}`);
  const { NOTIZEN_TABLE } = process.env;
  logger.info(`Dynamo Table --> ${NOTIZEN_TABLE}`);
  const userId = event.requestContext.identity.cognitoIdentityId;
  const { content, attachment } = data;
  let note = null;
  createNote(userId, content, attachment)
    .then((result) => {
      note = result;
      logger.info(util.inspect(note));
      return saveNote(note);
    })
    .then(() => {
      const response = {
        statusCode: 200,
        headers,
        body: JSON.stringify(note),
      };
      logger.info(`Saved note --> ${util.inspect(note)}`);
      callback(null, response);
    })
    .catch((error) => {
      const response = {
        statusCode: 500,
        headers,
        body: JSON.stringify({ status: false }),
      };
      logger.error(error);
      callback(null, response);
    });
}

module.exports = { main };
