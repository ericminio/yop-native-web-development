const menuTemplate = document.createElement('template')

menuTemplate.innerHTML = `
<style>
    @import '/all.css';

    ul {
        margin: 0px;
        padding: 0px;
        list-style: none;
    }
    li {
        display: inline-block;
        vertical-align: top;
    }
    .ribbon {
        border-top: 2px solid black;
        border-bottom: 2px solid black;
        background-color: white;
        padding-top: 10px;
        padding-left: 10px;
        margin-bottom: 25px;
    }
    .menu {
        color: black;
        font-size: 13px;
        margin-right: 25px;
        cursor: pointer;
    }
    .with-separator {
        border-left: 1px solid black;
        padding-left: 25px;
    }
</style>
<div class="ribbon">
    <ul>
        <li class="menu" id="menu-home">HOME</li>
        <li class="menu with-separator" id="menu-download">DOWNLOAD</li>
    </ul>
</div>
`

class Menu extends YopElement {

    constructor() {
        super()
        this.tree.appendChild(menuTemplate.content.cloneNode(true))
        this.home = this.tree.querySelector('#menu-home')
        this.download = this.tree.querySelector('#menu-download')
    }
    connectedCallback() {
        this.home.addEventListener('click', ()=>{
            history.pushState({}, null, '/');
            events.notify('navigation')
        })
        this.download.addEventListener('click', ()=>{
            history.pushState({}, null, '/download');
            events.notify('navigation')
        })
    }
}
customElements.define('yop-menu', Menu)
