class Greetings extends YafElement {

    static get observedAttributes() {
        return ['id', 'listen-to', 'prefix'];
    }
    constructor() {
        super()
        this.tree.innerHTML = `
            <label></label>
        `
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
