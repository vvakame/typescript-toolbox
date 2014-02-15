import TypeScript = require("./typescript/tss");

import f = require("./src/formatter");
import s = require("./src/syntaxTree");
import c = require("./src/compiler");

(()=> {
	var formatCodeOptions = f.createDefaultFormatCodeOptions();
	formatCodeOptions.ConvertTabsToSpaces = false;
	formatCodeOptions.NewLineCharacter = "\n";
	formatCodeOptions.PlaceOpenBraceOnNewLineForControlBlocks = true;
	formatCodeOptions.InsertSpaceAfterFunctionKeywordForAnonymousFunctions = true;

	var content = "/// <reference path=\"./test.ts\" />\n class Sample{\n                   hello     (word ='world'){return       'Hello, '+word;}\n}";

	var result = f.applyFormatterToContent(content, formatCodeOptions);

	console.log(result);
})();

(()=> {
	var content = "/// <reference path=\"./test.ts\" />\n class Sample{\n                   hello     (word ='world'){return       'Hello, '+word;}\n}";

	var ast = s.getAstByContent(content);
	var astWalkerFactory = TypeScript.getAstWalkerFactory();
	astWalkerFactory.simpleWalk(ast, (ast, state) => {
		console.log(TypeScript.SyntaxKind[ast.kind()]);
	});

	var replacer:(key:string, value:any) => any = (key, value) => {
		if (key !== "parent") {
			return value;
		} else {
			return null;
		}
	};
	console.log(JSON.stringify(ast, replacer, 2));
})();

(()=> {
	var content = "class Sample{\n                   hello     (word ='world'){return       'Hello, '+word;}\n}";
	var settings = c.createCompilationSettings();
	settings.codeGenTarget = TypeScript.LanguageVersion.EcmaScript5;
	settings.moduleGenTarget = TypeScript.ModuleGenTarget.Synchronous;

	var iter = c.compileWithContent(content, settings);
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
})();
