"use strict";

export function createDefaultFormatCodeOptions():ts.FormatCodeOptions {
	"use strict";

	// copy from 1.0.1
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
		NewLineCharacter: "\r\n",
		ConvertTabsToSpaces: true
	};
}
