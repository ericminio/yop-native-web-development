class IfAuthorized extends YopElement {

    constructor() {
        super()
        this.authorizedContent = this.innerHTML
        this.innerHTML = ''
        events.register(this, 'priviledges')
    }
    connectedCallback() {
        api.isAuthorized().then((data)=>{
            events.notify('priviledges', data)
        })
    }
    update(user) {
        if (user.canPublish) {
            this.innerHTML = this.authorizedContent
        }
        else {
            this.innerHTML = ''
        }
    }
}

customElements.define('if-authorized', IfAuthorized)
