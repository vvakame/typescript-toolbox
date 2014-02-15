import TypeScript = require("../typescript/tss");

import lsh = require("./languageServiceHost");

export function createDefaultFormatCodeOptions() {
	return new TypeScript.Services.FormatCodeOptions();
}

export function getSyntaxTreeByContent(content:string) {
	var languageServiceHost = new lsh.LanguageServiceHostImpl();
	var filePath = "tmp.ts";

	languageServiceHost.addFile({
		fileName: filePath,
		version: 0,
		open: false,
		byteOrderMark: TypeScript.ByteOrderMark.None,
		snapshot: TypeScript.ScriptSnapshot.fromString(content)
	});
	var languageService = new TypeScript.Services.LanguageService(languageServiceHost);
	return languageService.getSyntaxTree(filePath);
}

export function getAstByContent(content: string) {
	var syntaxTree = getSyntaxTreeByContent(content);

	var settings = new TypeScript.CompilationSettings();
	settings.codeGenTarget = TypeScript.LanguageVersion.EcmaScript5;
	settings.moduleGenTarget = TypeScript.ModuleGenTarget.Synchronous;

	var immutableSettings = TypeScript.ImmutableCompilationSettings.fromCompilationSettings(settings);

	return TypeScript.SyntaxTreeToAstVisitor.visit(syntaxTree, "tmp.ts",immutableSettings, false);
}
