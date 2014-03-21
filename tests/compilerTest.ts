/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/assert/assert.d.ts" />

import assert = require('power-assert');

// collision between node.d.ts to typescriptServices
var fs = require("fs");
import c = require("../src/compiler");
import helper = require("./testHelper");

export function exec() {
	describe("compiler test", () => {
		var fixtureDir = "./tests/fixture";
		var expectedDir = "./tests/expected/compiler";
		describe("compileWithContent function", ()=> {
			fs.readdirSync(fixtureDir)
				.filter(fileName => /\.ts$/.test(fileName))
				.forEach(fileName => {
					it(fileName, ()=> {
						var name = fileName.match(/(.*)\.ts/)[1];
						var content = fs.readFileSync(fixtureDir + "/" + fileName, "utf-8");

						var opts = helper.readSettingJson(fixtureDir + "/" + name + ".json");
						var mutableSettings = helper.optsToCompilationSettings(opts);

						var iter = c.compileWithContent(content, mutableSettings);
						assert.ok(iter.moveNext());

						var result = iter.current();

						if (opts.error) {
							var errors = result.diagnostics.filter(d=>d.info().category === TypeScript.DiagnosticCategory.Error);
							assert(opts.error.length === errors.length);
							opts.error.forEach((expectedError, i) => {
								assert(expectedError === errors[i].message());
							});
							return;
						}

						result.diagnostics.forEach(d=> {
							var info = d.info();
							assert(d.info().category !== TypeScript.DiagnosticCategory.Error, d.message());
						});
						assert(result.outputFiles.length === 1);

						var outFile = result.outputFiles[0];
						var expected = fs.readFileSync(expectedDir + "/" + name + ".js", "utf-8");
						assert(expected === outFile.text);
					});
				});
		});
	});
}
