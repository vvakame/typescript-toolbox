"use strict";

import ts = require("../typescript/ts");

import lsh = require("./languageServiceHost");

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

export function applyFormatterToContent(content:string, formatCodeOptions = createDefaultFormatCodeOptions()):string {
	"use strict";

	var languageServiceHost = new lsh.LanguageServiceHostImpl();
	var filePath = "tmp.ts";

	languageServiceHost.addFile({
		fileName: filePath,
		version: "0",
		open: false,
		snapshot: ts.ScriptSnapshot.fromString(content)
	});
	var languageService = ts.createLanguageService(languageServiceHost, ts.createDocumentRegistry());
	var textEdits = languageService.getFormattingEditsForDocument(filePath, formatCodeOptions);

	return applyTextEdit(content, textEdits);
}

// TODO rename function
export function applyTextEdit(content:string, textEdits:ts.TextChange[]):string {
	"use strict";

	for (var i = textEdits.length - 1; 0 <= i; i--) {
		var textEdit = textEdits[i];
		var b = content.substring(0, textEdit.span.start());
		var a = content.substring(textEdit.span.end());
		content = b + textEdit.newText + a;
	}
	return content;
}
