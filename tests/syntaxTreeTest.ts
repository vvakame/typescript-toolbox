/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/power-assert/power-assert.d.ts" />

declare var require: Function;

import assert = require('power-assert');

// collision between node.d.ts to typescriptServices
var fs = require("fs");
import s = require("../lib/syntaxTree");

export function exec() {
	"use strict";

	describe("syntaxTree test", () => {
		var fixtureDir = "./tests/fixture";
		describe("getSourceFileByContent function", ()=> {
			var expectedDir = "./tests/expected/syntaxTree";

			fs.readdirSync(fixtureDir)
				.filter((fileName: string) => /\.ts$/.test(fileName))
				.forEach((fileName: string) => {
					it(fileName, ()=> {
						var name = fileName.match(/(.*)\.ts/)[1];

						var content = fs.readFileSync(fixtureDir + "/" + fileName, "utf-8");
						var syntaxTree = s.getSourceFileByContent(content);

						var result = JSON.stringify(syntaxTree, null, 2);

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
