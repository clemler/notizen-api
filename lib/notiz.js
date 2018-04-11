/**
 * notiz.js: Models a note object
 * @module notiz
 *
 * Models a note with a module/functional approach versus the ES6
 * 'class' approach taken in note.js.
 *
 * One goal of this project is to try out different approaches and compare
 * the pros/cons of each.
 *
 * (C) 2018 Chris Lemler
 * MIT LICENCE
 *
 */
const uuid = require('uuid');
const moment = require('moment');
const util = require('util');
const Logger = require('./logger');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const log = new Logger('notiz'); // @TODO app name should come from some env setting


/**
 * createNote - Description
 *
 * @param {type}   userId                Description
 * @param {type}   content               Description
 * @param {string} [attachment=]         Description
 * @param {object} [object={}]           Description
 * @param {object} [object.noteId]       Description
 * @param {object} [object.createdAt]    Description
 *
 * @return {type} Description
 */
function createNote(userId, content, attachment = '', { noteId = uuid.v4(), createdAt = moment().toISOString() } = {}) {
  const note = {
    userId,
    content,
    attachment,
    noteId,
    createdAt,
  };
  return new Promise((resolve, reject) => {
    log.info(`createNote: ${util.inspect(note)}`);
    resolve(note);
  });
}


/**
 * validateNote - Check that is a valid note object
 *
 * @param {object} note The note to validate
 * @param {string} note.userId used to initialize the Note
 * @param {string} note.content - the content of the note
 * @param {string} note.attachment - path to the note's attachment
 * @param {string} note.createdAt - ISO timestamp when the note was created
 * @param {string} params.noteId - the ID of the note
 *
 * @return {type} Description
 */
function validateNote(note) {
  return new Promise((resolve, reject) => {
    log.info(`validateNote: ${util.inspect(note)}`);
    resolve(note);
  });
}


/**
  * saveNote - Save the note to the database
  *
  * @param {object} note The note to save
  * @param {string} note.userId used to initialize the Note
  * @param {string} note.content - the content of the note
  * @param {string} note.attachment - path to the note's attachment
  * @param {string} note.createdAt - ISO timestamp when the note was created
  * @param {string} note.noteId - the ID of the note
  *
  * @return {type} Description
  */
function saveNote(note) {
  const tableName = process.env.NOTIZEN_TABLE;
  const params = {
    TableName: tableName,
    Item: note,
  };

  return dynamoDb.put(params).promise();
  // return new Promise((resolve, reject) => {
  //  log.info(`saveNote: ${util.inspect(note)}`);
  //  resolve(note);
  // });
}

module.exports = { createNote, validateNote, saveNote };
