define(["require", "exports"], function(require, exports) {
    function hello(word) {
        if (typeof word === "undefined") { word = "world"; }
        return "Hello, " + word;
    }
    exports.hello = hello;
});
