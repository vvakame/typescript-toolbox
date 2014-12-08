import ts = require("./ts");

export class FileInfo {
	fileName:string;
	version:string;
	open:boolean;
	snapshot:ts.IScriptSnapshot;
}

export class LanguageServiceHostImpl implements ts.LanguageServiceHost {
	compilationSettings:ts.CompilationSettings = {};
	fileInfos:{ [fileName: string]: FileInfo } = {};

	// for ILanguageServiceHost impl

	getCompilationSettings():ts.CompilerOptions {
		return this.compilationSettings;
	}

	getScriptFileNames():string[] {
		return Object.getOwnPropertyNames(this.fileInfos);
	}

	getScriptVersion(fileName:string):string {
		return this.fileInfos[fileName].version;
	}

	getScriptIsOpen(fileName:string):boolean {
		return this.fileInfos[fileName].open;
	}

	getScriptSnapshot(fileName:string):ts.IScriptSnapshot {
		return this.fileInfos[fileName].snapshot;
	}

	getLocalizedDiagnosticMessages():any {
		return "";
	}

	getCancellationToken():ts.CancellationToken {
		return {
			isCancellationRequested() {
				return false;
			}
		};
	}

	getCurrentDirectory():string {
		return "";
	}

	getDefaultLibFilename():string {
		return "";
	}

	// for Logger impl
	log(s:string):void {
		// console.log(s);
	}

	// original
	addFile(file:FileInfo) {
		this.fileInfos[file.fileName] = file;
	}

	setCompilationSettings(compilationSettings:ts.CompilationSettings):void {
		this.compilationSettings = compilationSettings;
	}
}
