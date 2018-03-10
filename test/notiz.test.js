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

  test('Construct Note with correct parameters', () => {
    let note = createNote(userId, content, attachment, noteId, createdAt);
    console.log(util.inspect(note));
    expect(note.userId).toEqual(userId);
    expect(note.content).toEqual(content);
    expect(note.createdAt).toEqual(createdAt);
    expect(note.noteId).toEqual(noteId);
  });

  test('Construct Note without an ID', () => {
    let note = createNote(userId, content, attachment);
    console.log(util.inspect(note));
    expect(note.userId).toEqual(userId);
    expect(note.content).toEqual(content);
    expect(note.createdAt).toEqual(createdAt);
    expect(note.noteId).not.toBeUndefined();
  });

  test('Construct Note without an attachment', () => {
    let note = createNote(userId, content);
    console.log(util.inspect(note));
    expect(note.userId).toEqual(userId);
    expect(note.content).toEqual(content);
    expect(note.noteId).not.toBeUndefined();
    expect(note.createdAt).not.toBeUndefined();
  });

  // test('Construct Note without passing parameters (defaults)', () => {
  //   let note = new Note();
  //   console.log(util.inspect(note));
  //   expect(note.content).not.toBeUndefined();
  //   expect(note.createdAt).not.toBeUndefined();
  //   expect(note.noteId).not.toBeUndefined();
  //   console.log(JSON.stringify(note));
  // });
});
