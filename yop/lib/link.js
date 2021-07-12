class Link extends HTMLElement {

    connectedCallback() {
        this.addEventListener('click', (e)=>{
            navigate.to(this.getAttribute('to'))
        })
    }
}

customElements.define('yop-link', Link)
