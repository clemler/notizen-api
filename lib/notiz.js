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

const log = new Logger('notiz'); // @TODO app name should come from seom env setting


/**
  * createNote - Create a note object from the provided parameters
  *
  * @param {string} userId                The user to which the note belongs
  * @param {string} content               The content of the note
  * @param {string} [attachment=null]     The name of the S3 attachment
  * @param {string} [noteId=uuid]         The ID of the note (UUID)
  * @param {string} [createdAt=ISOString] The ISO creation time of the note
  *
  * @return {object} Return a note object
  */
function createNote(userId, content, attachment = '', noteId = uuid.v4(), createdAt = moment().toISOString()) {
  log.info(`Creating a note: ${arguments}`);
  const note = {
    userId,
    content,
    attachment,
    noteId,
    createdAt,
  };
  log.info(`Note object: ${util.inspect(note)}`);
  return note;
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

}


/**
  * saveNote - Save the note to the database
  *
  * @param {object} note The note to save
  * @param {string} note.userId used to initialize the Note
  * @param {string} note.content - the content of the note
  * @param {string} note.attachment - path to the note's attachment
  * @param {string} note.createdAt - ISO timestamp when the note was created
  * @param {string} params.noteId - the ID of the note
  *
  * @return {type} Description
  */
function saveNote(note) {

}

module.exports = { createNote, validateNote, saveNote };
