class Home extends YafElement {

    constructor() {
        super()
        this.tree.innerHTML = `
            <label>Home</label>
        `
    }
}
customElements.define('yop-home', Home)
