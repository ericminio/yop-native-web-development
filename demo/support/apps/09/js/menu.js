const menuTemplate = document.createElement('template')

menuTemplate.innerHTML = `
    <style>
        .title {
            color:red
        }
        .menu {
            color:blue
        }
    </style>

    <h1 class="title">Welcome</h1>
    <ul>
        <li class="menu" id="menu-home">Home</li>
        <li class="menu" id="menu-countries">Countries</li>
    </ul>
`

class Menu extends YafElement {

    constructor() {
        super()
        this.tree.appendChild(menuTemplate.content.cloneNode(true))
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
