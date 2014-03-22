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
		return null;
	}

	var mutableSettings = new TypeScript.CompilationSettings();
	if (opts.mutable.target === "es5") {
		mutableSettings.codeGenTarget = TypeScript.LanguageVersion.EcmaScript5;
	}
	if (opts.mutable.module === "amd") {
		mutableSettings.moduleGenTarget = TypeScript.ModuleGenTarget.Asynchronous;
	} else if (opts.mutable.module === "commonjs") {
		mutableSettings.moduleGenTarget = TypeScript.ModuleGenTarget.Synchronous;
	}
	return mutableSettings;
}
