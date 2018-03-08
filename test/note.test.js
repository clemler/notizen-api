const Note = require('../lib/note');
const uuid = require('uuid');
const moment = require('moment');
const util = require('util');

// For example, let's say we had not just a city database, but also a food database. We could do different setup for different tests:
// // Applies to all tests in this file
// beforeEach(() => {
//   return initializeCityDatabase();
// });
//
// test('city database has Vienna', () => {
//   expect(isCity('Vienna')).toBeTruthy();
// });
//
// test('city database has San Juan', () => {
//   expect(isCity('San Juan')).toBeTruthy();
// });
//
// describe('matching cities to foods', () => {
//   // Applies only to tests in this describe block
//   beforeEach(() => {
//     return initializeFoodDatabase();
//   });
//
//   test('Vienna <3 sausage', () => {
//     expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
//   });
//
//   test('San Juan <3 plantains', () => {
//     expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
//   });
// });
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
    let param = {};
    param.content = content;
    param.createdAt = createdAt;
    param.noteId = noteId;
    // @TODO look at ES6 object initialization to clean-up this code further
    let note = new Note(param);
    console.log(util.inspect(param));
    console.log(util.inspect(note));
    expect(note.content).toEqual(content);
    expect(note.createdAt).toEqual(createdAt);
    expect(note.noteId).toEqual(noteId);
  });

  test('Construct Note without an ID', () => {
    let param = {};
    const content = 'This is a simple note.';
    const createdAt = moment().toISOString();
    param.content = content;
    param.createdAt = createdAt;
    let note = new Note(param);
    console.log(util.inspect(param));
    console.log(util.inspect(note));
    expect(note.content).toEqual(content);
    expect(note.createdAt).toEqual(createdAt);
    expect(note.noteId).not.toBeUndefined();
  });

  test('Construct Note without a timestamp', () => {
    let param = {};
    const content = 'This is a simple note.';
    const noteId = uuid.v4();
    param.content = content;
    param.noteId = noteId;
    let note = new Note(param);
    console.log(util.inspect(param));
    console.log(util.inspect(note));
    expect(note.content).toEqual(content);
    expect(note.noteId).toEqual(noteId);
    expect(note.createdAt).not.toBeUndefined();
  });

  test('Construct Note without an ID or timestamp', () => {
    let param = {};
    const content = 'This is a simple note.';
    const createdAt = moment().toISOString();
    param.content = content;
    let note = new Note(param);
    console.log(util.inspect(param));
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
