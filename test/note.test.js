const Note = require('../lib/note');
const uuid = require('uuid');
const moment = require('moment');
const util = require('util');

// Holds the test values for the Notes
// created in the tests
let content = '';
let createdAt = '';
let noteId = '';

describe('Can construct new Notes', () => {
  beforeEach(() => {
    content = 'This is a simple note.';
    createdAt = moment().toISOString();
    noteId = uuid.v4();
  });

  test('Construct Note with correct parameters', () => {
    let note = new Note({content, createdAt, noteId});
    console.log(util.inspect(note));
    expect(note.content).toEqual(content);
    expect(note.createdAt).toEqual(createdAt);
    expect(note.noteId).toEqual(noteId);
  });

  test('Construct Note without an ID', () => {
    let note = new Note({content, createdAt});
    console.log(util.inspect(note));
    expect(note.content).toEqual(content);
    expect(note.createdAt).toEqual(createdAt);
    expect(note.noteId).not.toBeUndefined();
  });

  test('Construct Note without a timestamp', () => {
    let note = new Note({content, noteId});
    console.log(util.inspect(note));
    expect(note.content).toEqual(content);
    expect(note.noteId).toEqual(noteId);
    expect(note.createdAt).not.toBeUndefined();
  });

  test('Construct Note without an ID or timestamp', () => {
    let note = new Note({content});
    console.log(util.inspect(note));
    expect(note.content).toEqual(content);
    expect(note.createdAt).not.toBeUndefined();
    expect(note.noteId).not.toBeUndefined();
    console.log(JSON.stringify(note));
  });

  test('Construct Note without passing parameters (defaults)', () => {
    let note = new Note();
    console.log(util.inspect(note));
    expect(note.content).not.toBeUndefined();
    expect(note.createdAt).not.toBeUndefined();
    expect(note.noteId).not.toBeUndefined();
    console.log(JSON.stringify(note));
  });
});
