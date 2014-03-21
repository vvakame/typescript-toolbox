var fs = require("fs");

import TypeScript = require("../typescript/tss");

export function readSettingJson(fileName:string):any {
	if (!fs.existsSync(fileName)) {
		return <any>{};
	}
	return JSON.parse(fs.readFileSync(fileName, "utf-8"));
}

export function optsToCompilationSettings(opts:any):TypeScript.CompilationSettings {
	if (!opts.mutable) {
		return new TypeScript.CompilationSettings();
	}

	var mutableSettings = new TypeScript.CompilationSettings();
	if (opts.target === "es5") {
		mutableSettings.codeGenTarget = TypeScript.LanguageVersion.EcmaScript5;
	}
	if (opts.module === "amd") {
		mutableSettings.moduleGenTarget = TypeScript.ModuleGenTarget.Asynchronous;
	} else if (opts.module === "commonjs") {
		mutableSettings.moduleGenTarget = TypeScript.ModuleGenTarget.Synchronous;
	}
	return mutableSettings;
}
