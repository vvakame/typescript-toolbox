/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/assert/assert.d.ts" />

import assert = require("power-assert");

import compilerTest = require("./compilerTest");
compilerTest.exec();

import syntaxTreeTest = require("./syntaxTreeTest");
syntaxTreeTest.exec();
