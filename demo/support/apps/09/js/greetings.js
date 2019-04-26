const greetingsTemplate = document.createElement('template')

greetingsTemplate.innerHTML = `
    <style>
        .greetings {
            font-style: italic;
        }
    </style>

    <label class="greetings"></label>
`

class Greetings extends YafElement {

    static get observedAttributes() {
        return ['id', 'listen-to', 'prefix'];
    }
    constructor() {
        super()
        this.tree.appendChild(greetingsTemplate.content.cloneNode(true))
        this.label = this.tree.querySelector('label')
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'listen-to') { store.register(this, newValue) }
        if (name == 'id') { this.label.id = newValue + '-message' }
        if (name == 'prefix' && oldValue !== newValue) { this.setAttribute('prefix', newValue) }
    }
    update(value) {
        this.label.textContent = this.getAttribute('prefix') + value
    }
}
customElements.define('yop-greetings', Greetings)
