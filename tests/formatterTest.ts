/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/power-assert/power-assert.d.ts" />

declare var require: Function;

import assert = require('power-assert');

// collision between node.d.ts to typescriptServices
var fs = require("fs");
import f = require("../lib/formatter");
import helper = require("./testHelper");

export function exec() {
	"use strict";

	describe("formatter test", () => {
		var fixtureDir = "./tests/fixture";
		describe("applyFormatterToContent function", ()=> {
			var expectedDir = "./tests/expected/formatter";

			fs.readdirSync(fixtureDir)
				.filter((fileName: string) => /\.ts$/.test(fileName))
				.forEach((fileName: string) => {
					it(fileName, ()=> {
						var name = fileName.match(/(.*)\.ts/)[1];

						var content = fs.readFileSync(fixtureDir + "/" + fileName, "utf-8");
						var opts = helper.readSettingJson(fixtureDir + "/" + name + ".json");
						var formatCodeOptions = helper.optsToFormatCodeOptions(opts);
						var result = f.applyFormatterToContent(content, formatCodeOptions);

						if (!fs.existsSync(expectedDir + "/" + name + ".ts")) {
							fs.writeFileSync(expectedDir + "/" + name + ".ts", result);
						}

						var expected = fs.readFileSync(expectedDir + "/" + name + ".ts", "utf-8");
						assert(expected === result);
					});
				});
		});
	});
}
