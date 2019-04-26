class CountrySelection extends HTMLElement {
    static get observedAttributes() {
        return ['save-selection-as'];
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
        this.mappings = [
            { replace: 'with-id', with: 'id' },
            { replace: 'with-value', with: 'name' },
            { replace: 'Wonderland', with: 'name' },
        ]
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.target = newValue
    }
    connectedCallback() {
        this.list.addEventListener('change', ()=>{
            store.notify(this.target, this.list.value)
        })
        api.getCountries().then((countries)=>{
            this.update(countries)
        })
    }
    update(countries) {
        var children = ''
        for (var index = 0; index < countries.length; index++) {
            var line = this.template
            for (var i = 0; i < this.mappings.length; i++) {
                var mapping = this.mappings[i]
                line = line.replace(mapping.replace, countries[index][mapping.with])
            }
            children += line
        }
        this.list.innerHTML = children
    }
}
customElements.define('yop-country-selection', CountrySelection)
