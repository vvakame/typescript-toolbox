"use strict";

import ts = require("./ts");

export function getSourceFileByContent(content:string):ts.SourceFile {
	"use strict";

	return ts.createSourceFile("tmp.ts", content, ts.ScriptTarget.Latest, "0", false);
}
