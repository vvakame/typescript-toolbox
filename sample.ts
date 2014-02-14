import f = require("./src/formatter");

var formatCodeOptions = f.createDefaultFormatCodeOptions();
formatCodeOptions.ConvertTabsToSpaces = false;
formatCodeOptions.NewLineCharacter = "\n";
// formatCodeOptions.PlaceOpenBraceOnNewLineForFunctions = true;
formatCodeOptions.PlaceOpenBraceOnNewLineForControlBlocks = true;
formatCodeOptions.InsertSpaceAfterFunctionKeywordForAnonymousFunctions = true;

var content = "class Sample{\n                   hello     (word ='world'){return       'Hello, '+word;}\n}";

var result = f.applyFormatterToContent(content, formatCodeOptions);

console.log(result);
