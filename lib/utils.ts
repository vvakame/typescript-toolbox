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
