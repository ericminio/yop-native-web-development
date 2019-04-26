class Store {
    constructor() {
        this.listeners = {}
    }
    notify(id, value) {
        var listeners = this.listeners[id]
        if (listeners !== undefined) {
            for (var i=0; i<listeners.length; i++) {
                var component = listeners[i]
                component.update(value)
            }
        }
    }
    register(component, id) {
        var listeners = this.listeners[id]
        if (listeners === undefined) {
            this.listeners[id] = []
        }
        this.listeners[id].push(component)
    }
}
var store = new Store()


class CountrySelection extends HTMLElement {
    static get observedAttributes() {
        return ['target'];
    }
    constructor() {
        super();
        var shadow = this.attachShadow({
            mode: 'open'
        });
        var tree = document.createElement('div');
        shadow.appendChild(tree);

        tree.innerHTML = `
            <select id="countries">
                <option id="country-with-id" value="with-value">Wonderland</option>
            </select>
        `
        this.list = tree.querySelector('select#countries')
        this.template = tree.querySelector('option#country-with-id').outerHTML
        this.data = []
        this.mappings = [{
                replace: 'with-id',
                with: 'id'
            },
            {
                replace: 'with-value',
                with: 'name'
            },
            {
                replace: 'Wonderland',
                with: 'name'
            },
        ]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.target = newValue
    }

    connectedCallback() {
        this.list.addEventListener('change', ()=>{
            store.notify(this.target, this.list.value)
        })
        fetch('/api/countries').then((response) => {
            response.json().then((json) => {
                this.data = json.countries
                this.update()
            })
        })
    }
    update() {
        var children = ''
        for (var index = 0; index < this.data.length; index++) {
            var line = this.template
            for (var i = 0; i < this.mappings.length; i++) {
                var mapping = this.mappings[i]
                line = line.replace(mapping.replace, this.data[index][mapping.with])
            }
            children += line
        }
        this.list.innerHTML = children
    }
}
customElements.define('yop-country-selection', CountrySelection);

class Greetings extends HTMLElement {

    static get observedAttributes() {
        return ['id', 'prefix', 'data'];
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
        if (name == 'data') { store.register(this, newValue) }
        if (name == 'id') { this.label.id = newValue + '-message' }
        if (name == 'prefix' && oldValue !== newValue) { this.setAttribute('prefix', newValue) }
    }
    update(value) {
        this.label.textContent = this.getAttribute('prefix') + value
    }
}
customElements.define('yop-greetings', Greetings);