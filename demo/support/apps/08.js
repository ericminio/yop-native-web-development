class Store {
    constructor() {
        this.listeners = []
    }
    notify(id, value) {
        this.component.update(value)
    }
    register(component, id) {
        this.component = component
    }
}
var store = new Store()


class CountrySelection extends HTMLElement {
    static get observedAttributes() {
        return ['target'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.target = newValue
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
        return ['data'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        store.register(this, newValue)
    }
    constructor() {
        super();
        var shadow = this.attachShadow({
            mode: 'open'
        });
        var tree = document.createElement('div');
        shadow.appendChild(tree);

        tree.innerHTML = `
            <label id="message">Welcome</label>
        `
        this.label = tree.querySelector('#message')
    }
    update(value) {
        this.label.textContent = 'Welcome people of ' + value
    }
}

customElements.define('yop-greetings', Greetings);
