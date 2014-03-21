/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/assert/assert.d.ts" />

import assert = require('power-assert');

// collision between node.d.ts to typescriptServices
var fs = require("fs");
import s = require("../src/syntaxTree");
import helper = require("./testHelper");

export function exec() {
	describe("syntaxTree test", () => {
		var fixtureDir = "./tests/fixture";
		describe("getSyntaxTreeByContent function", ()=> {
			var expectedDir = "./tests/expected/syntaxTree";

			fs.readdirSync(fixtureDir)
				.filter(fileName => /\.ts$/.test(fileName))
				.forEach(fileName => {
					it(fileName, ()=> {
						var name = fileName.match(/(.*)\.ts/)[1];

						var content = fs.readFileSync(fixtureDir + "/" + fileName, "utf-8");
						var opts = helper.readSettingJson(fixtureDir + "/" + name + ".json");
						var mutableSettings = helper.optsToCompilationSettings(opts);
						var syntaxTree = s.getSyntaxTreeByContent(content, mutableSettings);

						var result = JSON.stringify(syntaxTree, null, 2);

						if (!fs.existsSync(expectedDir + "/" + name + ".json")) {
							fs.writeFileSync(expectedDir + "/" + name + ".json", result);
						}

						var expected = fs.readFileSync(expectedDir + "/" + name + ".json", "utf-8");
						assert(expected === result);
					});
				});
		});

		describe("getAstByContent function", ()=> {
			var expectedDir = "./tests/expected/ast";

			function replacer(key:string, value:any):any {
				if (key === "parent") {
					return void 0;
				} else {
					return value;
				}
			}

			fs.readdirSync(fixtureDir)
				.filter(fileName => /\.ts$/.test(fileName))
				.forEach(fileName => {
					it(fileName, ()=> {
						var name = fileName.match(/(.*)\.ts/)[1];

						var content = fs.readFileSync(fixtureDir + "/" + fileName, "utf-8");
						var opts = helper.readSettingJson(fixtureDir + "/" + name + ".json");
						var mutableSettings = helper.optsToCompilationSettings(opts);
						var syntaxTree = s.getAstByContent(content, mutableSettings);

						var result = JSON.stringify(syntaxTree, replacer, 2);

						if (!fs.existsSync(expectedDir + "/" + name + ".json")) {
							fs.writeFileSync(expectedDir + "/" + name + ".json", result);
						}

						var expected = fs.readFileSync(expectedDir + "/" + name + ".json", "utf-8");
						assert(expected === result);
					});
				});
		});
	});
}
