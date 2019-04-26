const homeTemplate = document.createElement('template')

homeTemplate.innerHTML = `
    <style>
        .page {
            color:darkgreen
        }
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
