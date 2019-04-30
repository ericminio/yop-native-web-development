class Spinner extends YafElement {

    constructor() {
        super()
        this.tree.style = 'display:inline'
    }
    connectedCallback() {
        events.register(this, this.getAttribute('listen'))
    }
    update(state) {
        if (state == 'start' ) {
            this.tree.innerHTML = '(loading...)'
        }
        else {
            this.tree.innerHTML = ''
        }
    }
}
customElements.define('yop-spinner', Spinner)
