import TypeScript = require("../typescript/tss");

export function createCompilationSettings():TypeScript.CompilationSettings {
	return new TypeScript.CompilationSettings();
}

export function createImmutableCompilationSettings(settings = createCompilationSettings()):TypeScript.ImmutableCompilationSettings {
	return TypeScript.ImmutableCompilationSettings.fromCompilationSettings(settings);
}

export function compileWithContent(content:string, compilationSettings:TypeScript.CompilationSettings);
export function compileWithContent(content:string, compilationSettings:TypeScript.ImmutableCompilationSettings);
export function compileWithContent(content:string, compilationSettings:any) {
	var immutableCompilationSettings:TypeScript.ImmutableCompilationSettings;
	if (compilationSettings instanceof TypeScript.ImmutableCompilationSettings) {
		immutableCompilationSettings = compilationSettings;
	} else {
		immutableCompilationSettings = TypeScript.ImmutableCompilationSettings.fromCompilationSettings(compilationSettings);
	}

	var logger = new TypeScript.NullLogger();

	var compiler = new TypeScript.TypeScriptCompiler(logger, immutableCompilationSettings);
	var scriptSnapshot = TypeScript.ScriptSnapshot.fromString(content);
	compiler.addFile("tmp.ts", scriptSnapshot, TypeScript.ByteOrderMark.None, 0, false, []);

	return compiler.compile(path => path);
}
