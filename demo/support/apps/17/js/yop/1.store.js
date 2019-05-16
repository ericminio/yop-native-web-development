class Store {
    constructor() {
        this.map = {}
    }
    save(id, value) {
        this.map[id] = value
    }
    get(id) {
        return this.map[id]
    }
    delete(id) {
        this.map[id] = undefined
    }
}
var store = new Store()
