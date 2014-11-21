declare var require: Function;

var fs = require("fs");

import ts = require("../typescript/ts");

export function readSettingJson(fileName:string):any {
	"use strict";

	if (!fs.existsSync(fileName)) {
		return <any>{};
	}
	return JSON.parse(fs.readFileSync(fileName, "utf-8"));
}

export function optsToCompilationSettings(opts:any):ts.CompilationSettings {
	"use strict";

	if (!opts.mutable) {
		return null;
	}

	var mutableSettings: ts.CompilationSettings = {};
	if (opts.mutable.target === "es5") {
		mutableSettings.codeGenTarget = ts.LanguageVersion.EcmaScript5;
	} else if (opts.mutable.target === "es6") {
		mutableSettings.codeGenTarget = ts.LanguageVersion.EcmaScript6;
	}
	if (opts.mutable.module === "amd") {
		mutableSettings.moduleGenTarget = ts.ModuleGenTarget.Asynchronous;
	} else if (opts.mutable.module === "commonjs") {
		mutableSettings.moduleGenTarget = ts.ModuleGenTarget.Synchronous;
	}
	return mutableSettings;
}

export function optsToFormatCodeOptions(opts:any):ts.FormatCodeOptions {
	"use strict";

	// TODO what is default?
	var formatCodeOptions: ts.FormatCodeOptions = {
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
	if (!opts.format) {
		return formatCodeOptions;
	}
	if (opts.format.indentSize != null) {
		formatCodeOptions.IndentSize = opts.format.indentSize;
	}
	if (opts.format.convertTabsToSpaces != null) {
		formatCodeOptions.ConvertTabsToSpaces = opts.format.convertTabsToSpaces;
	}
	return formatCodeOptions;
}
