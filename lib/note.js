/**
 * note.js: Models a note object
 * @module Note
 *
 * (C) 2018 Chris Lemler
 * MIT LICENCE
 *
 */
 const uuid = require('uuid');
 const moment = require('moment');

// NOTE JSON.stringify(note) will generate the JSON form of the object

/**
 * Note - Description
 */
class Note {

  /**
   * constructor - Constructs a Note object
   *
   * @param {Object} params used to initialize the Note
   * @param {string} params.content - the content of the note
   * @param {string} [params.attachment] - path to the note's attachment
   * @param {string} [params.createdAt] - ISO timestamp when the note was created
   * @param {string} [params.noteId] - the ID of the note
   *
   */
  constructor({content='This is a note', createdAt=moment().toISOString(), noteId=uuid.v4()} = {}) {
    this.content = content;
    //this.attachment = params.attachment:params.attachment?null;
    this.noteId = noteId;
    this.createdAt = createdAt;
  }


  /**
   * setContent - Description
   *
   * @param {type} content Description
   *
   * @return {type} Description
   */
  setContent(content) {
    this.content = content;
  }


  /**
   * setAttachment - Description
   *
   * @param {type} attachement Description
   *
   * @return {type} Description
   */
  setAttachment(attachement) {
    this.attachment = attachment;
  }
}

module.exports = Note;
