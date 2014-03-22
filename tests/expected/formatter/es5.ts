class Sample {
    private _name: string;
    get name(): string {
        return this._name;
    }
    set name(name: string) {
        this._name = name;
    }
}
