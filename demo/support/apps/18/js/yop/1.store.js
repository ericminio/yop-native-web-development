class Store {
    constructor() {
        this.map = window.localStorage
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
}
var store = new Store()
