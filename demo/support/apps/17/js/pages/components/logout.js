const logoutTemplate = document.createElement('template')

logoutTemplate.innerHTML = `
    <style>
        #logout {
            border-left: 1px solid white;
            padding-left: 15px;
            margin-left: 15px;
        }
    </style>
    <span id="logout">logout</span>
`

class Logout extends YopElement {

    constructor() {
        super()
        this.innerHTML = ''
        events.register(this, 'connected')
    }
    connectedCallback() {
        this.appendChild(logoutTemplate.content.cloneNode(true))
    }
    update(user, event) {
        if (!this.isConnected) { return }

        if ('connected' == event) {
            this.querySelector('#logout').addEventListener('click', ()=>{
                store.delete('user')
                events.notify('disconnected')
                history.pushState({}, null, '/');
                events.notify('navigation')
            })
        }
    }

}
customElements.define('yop-logout', Logout)
