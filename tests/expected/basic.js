var Sample = (function () {
    function Sample() {
    }
    Sample.prototype.test = function (word) {
        if (typeof word === "undefined") { word = "world"; }
        return "Hello," + word;
    };
    return Sample;
})();

var s = new Sample();
s.test("TypeScript");
