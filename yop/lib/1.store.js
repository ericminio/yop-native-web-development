class Store {
    constructor(window) {
        this.map = window.localStorage
    }
    clear() {
        this.map.clear();
    }
    save(id, value) {
        this.map.setItem(id, value)
    }
    get(id) {
        return this.map.getItem(id)
    }
    delete(id) {
        this.map.removeItem(id)
    }
    saveObject(id, value) {
        this.save(id, JSON.stringify(value))
    }
    getObject(id) {
        return JSON.parse(this.get(id))
    }
}
var store = new Store(window);
