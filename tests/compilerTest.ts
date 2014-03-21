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
		describe("compileWithContent function", ()=> {
			fs.readdirSync(fixtureDir)
				.filter(fileName => /\.ts$/.test(fileName))
				.forEach(fileName => {
					it(fileName, ()=> {
						var name = fileName.match(/(.*)\.ts/)[1];
						var content = fs.readFileSync(fixtureDir + "/" + fileName, "utf-8");
						var expected = fs.readFileSync(expectedDir + "/" + name + ".js", "utf-8");
						var opts:any = {};
						if (fs.existsSync(fixtureDir + "/" + name + ".json")) {
							opts = JSON.parse(fs.readFileSync(fixtureDir + "/" + name + ".json", "utf-8"));
						}

						var iter:TypeScript.Iterator<TypeScript.CompileResult>;
						if (opts.mutable) {
							var mutableSettings = c.createCompilationSettings();
							if (opts.target === "es5") {
								mutableSettings.codeGenTarget = TypeScript.LanguageVersion.EcmaScript5;
							}
							if (opts.module === "amd") {
								mutableSettings.moduleGenTarget = TypeScript.ModuleGenTarget.Asynchronous;
							} else if (opts.module === "commonjs") {
								mutableSettings.moduleGenTarget = TypeScript.ModuleGenTarget.Synchronous;
							}
							iter = c.compileWithContent(content, mutableSettings);
						} else {
							iter = c.compileWithContent(content, c.createImmutableCompilationSettings());
						}
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
	});
}
