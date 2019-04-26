class Menu extends YafElement {

    constructor() {
        super()
        this.tree.innerHTML = `
            <label>Welcome</label>
            <ul>
                <li class="menu" id="menu-home">Home</li>
                <li class="menu" id="menu-countries">Countries</li>
            </ul>
        `
        this.home = this.tree.querySelector('#menu-home')
        this.countries = this.tree.querySelector('#menu-countries')
    }
    connectedCallback() {
        this.home.addEventListener('click', ()=>{
            history.pushState({}, null, '/');
            store.notify('navigation')
        })
        this.countries.addEventListener('click', ()=>{
            history.pushState({}, null, '/countries');
            store.notify('navigation')
        })
    }
}
customElements.define('yop-menu', Menu)
