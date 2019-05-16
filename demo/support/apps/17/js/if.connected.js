class IfConnected extends YopElement {

    constructor() {
        super()
        this.definedContent = this.innerHTML
        this.innerHTML = ''
        events.register(this, 'connected')
        events.register(this, 'disconnected')
    }
    connectedCallback() {
        let data = store.get(this.getAttribute('data'))
        if (data) {
            this.innerHTML = this.definedContent
        }
    }
    update(user, state) {
        if (state == 'connected') {
            this.innerHTML = this.definedContent
            this.querySelector('#logout').addEventListener('click', ()=>{
                store.delete('user')
                events.notify('disconnected')
                history.pushState({}, null, '/');
                events.notify('navigation')
            })
        }
        else {
            this.innerHTML = ''
        }
    }
}

customElements.define('if-connected', IfConnected)
