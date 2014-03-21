var Sample = (function () {
    function Sample() {
    }
    Object.defineProperty(Sample.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    return Sample;
})();
