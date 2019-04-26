class CountrySelection extends YafElement {

    constructor() {
        super()

        this.tree.innerHTML = `
            <label>Where are you from?</label>
            <select id="countries">
                <option id="country-with-id" value="with-value">Wonderland</option>
            </select>

            <yop-greetings id="welcome" listen-to="country.selection" prefix="Welcome people of "></yop-greetings>
            <yop-greetings id="insight" listen-to="country.selection" prefix="Tell me more about "></yop-greetings>
        `
        this.list = this.tree.querySelector('select#countries')
        this.template = this.tree.querySelector('option#country-with-id').outerHTML
        this.mappings = [
            { replace: 'with-id', with: 'id' },
            { replace: 'with-value', with: 'name' },
            { replace: 'Wonderland', with: 'name' },
        ]
    }
    connectedCallback() {
        this.list.addEventListener('change', ()=>{
            store.notify('country.selection', this.list.value)
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
