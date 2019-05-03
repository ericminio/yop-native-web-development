const headerTemplate = document.createElement('template')

headerTemplate.innerHTML = `
<style>
    @import '/all.css';
</style>
<div class="title">
    <label>News Post</label>
</div>
`

class Header extends YopElement {

    constructor() {
        super()
        this.tree.appendChild(headerTemplate.content.cloneNode(true))
    }
}
customElements.define('yop-header', Header)
