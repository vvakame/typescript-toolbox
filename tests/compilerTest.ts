/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/assert/assert.d.ts" />

import assert = require('power-assert');

// collision between node.d.ts to typescriptServices
var fs = require("fs");
import c = require("../src/compiler");

export function exec() {
	describe("compiler test", () => {
		var fixtureDir = "./tests/fixture";
		var expectedDir = "./tests/expected";
		fs.readdirSync(fixtureDir)
			.filter(fileName => /\.ts$/.test(fileName))
			.forEach(fileName => {
				it(fileName, ()=> {
					var name = fileName.match(/(.*)\.ts/)[1];
					var content = fs.readFileSync(fixtureDir + "/" + fileName, "utf-8");
					var expected = fs.readFileSync(expectedDir + "/" + name + ".js", "utf-8");

					var mutableSettings = c.createCompilationSettings();
					var iter = c.compileWithContent(content, mutableSettings);
					assert.ok(iter.moveNext());

					var result = iter.current();

					result.diagnostics.forEach(d=> {
						var info = d.info();
						assert(d.info().category !== TypeScript.DiagnosticCategory.Error, d.message());
					});
					assert(result.outputFiles.length === 1);
					var outFile = result.outputFiles[0];
					assert(expected === outFile.text);
				});
			});
	});
}
