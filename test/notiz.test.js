const { createNote, validateNote, saveNote } = require('../lib/notiz');
const uuid = require('uuid');
const moment = require('moment');
const util = require('util');

// Holds the test values for the Notes
// created in the tests
let userId = '';
let attachment = '';
let content = '';
let createdAt = '';
let noteId = '';

describe('Can construct new Notes', () => {
  beforeEach(() => {
    userId = 'bilbo@shire.com';
    content = 'This is a simple note.';
    attachment = 'xmas-sweater.png';
    createdAt = moment().toISOString();
    noteId = uuid.v4();
  });

  test('Construct Note with all parameters provided', () => {
    return createNote(userId, content, attachment, { noteId, createdAt })
      .then((note) => {
        expect(note.userId).toEqual(userId);
        expect(note.content).toEqual(content);
        expect(note.attachment).toEqual(attachment);
        expect(note.createdAt).toEqual(createdAt);
        expect(note.noteId).toEqual(noteId);
      });
  });

  test('Construct a basic note without an attachment', () => {
    return createNote(userId, content)
      .then((note) => {
        expect(note.userId).toEqual(userId);
        expect(note.content).toEqual(content);
        expect(note.attachment).toEqual('');
        expect(note.createdAt).not.toBeUndefined();
        expect(note.noteId).not.toBeUndefined();
      });
  });

  test('Construct a basic note with an attachment', () => {
    return createNote(userId, content, attachment)
      .then((note) => {
        expect(note.userId).toEqual(userId);
        expect(note.content).toEqual(content);
        expect(note.attachment).toEqual(attachment);
        expect(note.createdAt).not.toBeUndefined();
        expect(note.noteId).not.toBeUndefined();
      });
  });

  test('Construct Note without an ID', () => {
    return createNote(userId, content, attachment, {createdAt})
      .then((note) => {
        expect(note.userId).toEqual(userId);
        expect(note.content).toEqual(content);
        expect(note.createdAt).toEqual(createdAt);
        expect(note.noteId).not.toBeUndefined();
      });
  });
});
