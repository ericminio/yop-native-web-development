class Greetings extends HTMLElement {

    static get observedAttributes() {
        return ['id', 'listen-to', 'prefix'];
    }
    constructor() {
        super();
        var shadow = this.attachShadow({
            mode: 'open'
        });
        var tree = document.createElement('div');
        shadow.appendChild(tree);

        tree.innerHTML = `
            <label></label>
        `
        this.label = tree.querySelector('label')
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
