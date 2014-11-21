"use strict";

import ts = require("../typescript/ts");

export function createDefaultFormatCodeOptions():ts.FormatCodeOptions {
	"use strict";

	// TODO what is default?
	return {
		InsertSpaceAfterCommaDelimiter: true,
		InsertSpaceAfterSemicolonInForStatements: true,
		InsertSpaceBeforeAndAfterBinaryOperators: true,
		InsertSpaceAfterKeywordsInControlFlowStatements: true,
		InsertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
		InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
		PlaceOpenBraceOnNewLineForFunctions: false,
		PlaceOpenBraceOnNewLineForControlBlocks: false,
		IndentSize: 4,
		TabSize: 4,
		NewLineCharacter: "\n",
		ConvertTabsToSpaces: true
	};
}

export function getSourceFileByContent(content:string):ts.SourceFile {
	"use strict";

	return ts.createSourceFile("tmp.ts", content, ts.ScriptTarget.Latest, "0", false);
}
