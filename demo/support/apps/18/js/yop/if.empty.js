class IfEmpty extends YopElement {

    connectedCallback() {
        this.emptyContent = this.innerHTML
        events.register(this, this.getAttribute('collection'))
    }
    update(news) {
        if (news.length == 0) {
            this.innerHTML = this.emptyContent
        }
        else {
            this.innerHTML = ''
        }
    }
}

customElements.define('yop-if-empty', IfEmpty)
