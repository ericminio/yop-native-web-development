const homeTemplate = document.createElement('template')

homeTemplate.innerHTML = `
    <style>
        @import '/all.css'
    </style>

    <h2 class="page">Home</h2>
`

class Home extends YafElement {

    constructor() {
        super()
        this.tree.appendChild(homeTemplate.content.cloneNode(true))
    }
}
customElements.define('yop-home', Home)
