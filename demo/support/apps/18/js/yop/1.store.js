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
    saveObject(id, value) {
        this.map.setItem(id, JSON.stringify(value))
    }
    getObject(id) {
        return JSON.parse(this.map.getItem(id))
    }
}
var store = new Store()
