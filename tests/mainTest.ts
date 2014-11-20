/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/power-assert/power-assert.d.ts" />

import compilerTest = require("./compilerTest");
compilerTest.exec();

import syntaxTreeTest = require("./syntaxTreeTest");
syntaxTreeTest.exec();

import formatterTest = require("./formatterTest");
formatterTest.exec();
