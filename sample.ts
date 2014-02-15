import TypeScript = require("./typescript/tss");

import f = require("./src/formatter");
import s = require("./src/syntaxTree");

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
