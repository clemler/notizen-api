import uuid from 'uuid';
import AWS from 'aws-sdk';
import Logger from "./lib/logger";
const logger = new Logger("notizen-api");
logger.info('I am here');

AWS.config.update({region: 'us-west-2'});
const db = new AWS.DynamoDB.DocumentClient();
// @TODO: This should be passed via an environment variable in serverless.yml
const TABLE_NAME = 'notizen-api-table-dev';

export function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in
  // 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: TABLE_NAME,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'noteId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: new Date().getTime()
    }
  };

}
