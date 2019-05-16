const linkTemplate = document.createElement('template')

linkTemplate.innerHTML = `
`

class Link extends YopElement {

    connectedCallback() {
        this.addEventListener('click', (e)=>{
            navigate.to(this.getAttribute('to'))
        })
    }
}

customElements.define('yop-link', Link)
