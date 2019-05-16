const headerTemplate = document.createElement('template')

headerTemplate.innerHTML = `
    <div class="title">
        <label>News Post</label>
    </div>
`

class Header extends YopElement {

    connectedCallback() {
        this.appendChild(headerTemplate.content.cloneNode(true))
    }
}
customElements.define('yop-header', Header)
