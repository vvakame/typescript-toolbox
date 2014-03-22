/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/assert/assert.d.ts" />

import assert = require('power-assert');

// collision between node.d.ts to typescriptServices
var fs = require("fs");
import f = require("../src/formatter");
import helper = require("./testHelper");

export function exec() {
	describe("formatter test", () => {
		var fixtureDir = "./tests/fixture";
		describe("applyFormatterToContent function", ()=> {
			var expectedDir = "./tests/expected/formatter";

			fs.readdirSync(fixtureDir)
				.filter(fileName => /\.ts$/.test(fileName))
				.forEach(fileName => {
					it(fileName, ()=> {
						var name = fileName.match(/(.*)\.ts/)[1];

						var content = fs.readFileSync(fixtureDir + "/" + fileName, "utf-8");
						var opts = helper.readSettingJson(fixtureDir + "/" + name + ".json");
						var mutableSettings = helper.optsToCompilationSettings(opts);
						var result = f.applyFormatterToContent(content);

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
