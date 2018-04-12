(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * logger.js: Logger class for the project
 * @module Logger
 *
 * (C) 2017 Chris Lemler
 * ISC LICENCE
 *
 */

var LVL_INFO = '[INFO]';
var LVL_WARN = '[WARN]';
var LVL_ERR = '[ERROR]';
var LVL_CRIT = '[CRITICAL]';

function timeStamp() {
  var date = new Date();
  return date.toISOString();
}

var formatMessage = function formatMessage(level, name, message) {
  var date = new Date();
  return date.toISOString() + ' :: ' + level + ' :: ' + name + ' :: ' + message;
};

var Logger = function () {
  function Logger(name) {
    (0, _classCallCheck3.default)(this, Logger);

    this.name = name;
  }

  (0, _createClass3.default)(Logger, [{
    key: 'info',
    value: function info(message) {
      console.log(formatMessage(LVL_INFO, this.name, message));
    }
  }, {
    key: 'warn',
    value: function warn(message) {
      console.log(formatMessage(LVL_WARN, this.name, message));
    }
  }, {
    key: 'error',
    value: function error(message) {
      console.log(formatMessage(LVL_ERR, this.name, message));
    }
  }, {
    key: 'critical',
    value: function critical(message) {
      console.log(formatMessage(LVL_CRIT, this.name, message));
    }
  }]);
  return Logger;
}();

module.exports = Logger;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(4);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AWS = __webpack_require__(0);
var Logger = __webpack_require__(1);
var util = __webpack_require__(2);

var _require = __webpack_require__(7),
    createNote = _require.createNote,
    validateNote = _require.validateNote,
    saveNote = _require.saveNote;

var logger = new Logger('notizen-api');
logger.info('I am here');

AWS.config.update({ region: 'us-west-2' });

function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in
  // 'event.body'
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  };
  var data = JSON.parse(event.body);

  logger.info('Entered Create() --> ' + util.inspect(data));
  var NOTIZEN_TABLE = process.env.NOTIZEN_TABLE;

  logger.info('Dynamo Table --> ' + NOTIZEN_TABLE);
  var userId = event.requestContext.identity.cognitoIdentityId;
  var content = data.content,
      attachment = data.attachment;

  var note = null;
  createNote(userId, content, attachment).then(function (result) {
    note = result;
    logger.info(util.inspect(note));
    return saveNote(note);
  }).then(function () {
    var response = {
      statusCode: 200,
      headers: headers,
      body: (0, _stringify2.default)(note)
    };
    logger.info('Saved note --> ' + util.inspect(note));
    callback(null, response);
  }).catch(function (error) {
    var response = {
      statusCode: 500,
      headers: headers,
      body: (0, _stringify2.default)({ status: false })
    };
    logger.error(error);
    callback(null, response);
  });
}

module.exports = { main: main };

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promise = __webpack_require__(8);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var uuid = __webpack_require__(9);
var moment = __webpack_require__(10);
var util = __webpack_require__(2);
var Logger = __webpack_require__(1);
var AWS = __webpack_require__(0);

var dynamoDb = new AWS.DynamoDB.DocumentClient();
var log = new Logger('notiz'); // @TODO app name should come from some env setting


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
function createNote(userId, content) {
  var attachment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$noteId = _ref.noteId,
      noteId = _ref$noteId === undefined ? uuid.v4() : _ref$noteId,
      _ref$createdAt = _ref.createdAt,
      createdAt = _ref$createdAt === undefined ? moment().toISOString() : _ref$createdAt;

  var note = {
    userId: userId,
    content: content,
    attachment: attachment,
    noteId: noteId,
    createdAt: createdAt
  };
  return new _promise2.default(function (resolve, reject) {
    log.info('createNote: ' + util.inspect(note));
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
  return new _promise2.default(function (resolve, reject) {
    log.info('validateNote: ' + util.inspect(note));
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
  var tableName = process.env.NOTIZEN_TABLE;
  var params = {
    TableName: tableName,
    Item: note
  };

  return dynamoDb.put(params).promise();
  // return new Promise((resolve, reject) => {
  //  log.info(`saveNote: ${util.inspect(note)}`);
  //  resolve(note);
  // });
}

module.exports = { createNote: createNote, validateNote: validateNote, saveNote: saveNote };

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ })
/******/ ])));