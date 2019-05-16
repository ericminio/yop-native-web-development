const linkTemplate = document.createElement('template')

linkTemplate.innerHTML = `
`

class Link extends YopElement {

    connectedCallback() {
        this.addEventListener('click', (e)=>{
            history.pushState({}, null, this.getAttribute('to'));
            events.notify('navigation')
        })
    }
}

customElements.define('yop-link', Link)
