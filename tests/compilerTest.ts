/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/assert/assert.d.ts" />

import assert = require('power-assert');

// collision between node.d.ts to typescriptServices
var fs = require("fs");
import c = require("../src/compiler");

export function exec() {
	describe("compiler test", () => {
		fs.readdirSync("./tests/fixture").forEach(fileName => {
			it(fileName, ()=> {
				var content = fs.readFileSync(fileName, "utf-8");

				var mutableSettings = c.createCompilationSettings();
				var immutableSettings = c.createImmutableCompilationSettings();

				var iter = c.compileWithContent(content, immutableSettings);
				while (iter.moveNext()) {
					var result = iter.current();
					result.diagnostics.forEach(d=> {
						var info = d.info();
						if (info.category === TypeScript.DiagnosticCategory.Error) {
							console.error(d.message());
						} else {
							console.log(d.message());
						}
					});
					result.outputFiles.forEach(outFile=> {
						console.log(outFile.name, outFile.text);
					});
				}
				throw new Error();
			});
		});
	});
}
