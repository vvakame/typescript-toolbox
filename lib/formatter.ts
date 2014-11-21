"use strict";

import ts = require("../typescript/ts");

import lsh = require("./languageServiceHost");
import utils = require("./utils");

export function applyFormatterToContent(content:string, formatCodeOptions = utils.createDefaultFormatCodeOptions()):string {
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
	var textChanges = languageService.getFormattingEditsForDocument(filePath, formatCodeOptions);

	return applyTextChange(content, textChanges);
}

export function applyTextChange(content:string, textEdits:ts.TextChange[]):string {
	"use strict";

	for (var i = textEdits.length - 1; 0 <= i; i--) {
		var textEdit = textEdits[i];
		var b = content.substring(0, textEdit.span.start());
		var a = content.substring(textEdit.span.end());
		content = b + textEdit.newText + a;
	}
	return content;
}
