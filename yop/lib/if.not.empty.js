class IfNotEmpty extends YopElement {

    connectedCallback() {
        this.notEmptyContent = this.innerHTML
        events.register(this, this.getAttribute('collection'))
    }
    update(news) {
        if (news.length != 0) {
            this.innerHTML = this.notEmptyContent
        }
        else {
            this.innerHTML = ''
        }
    }
}
customElements.define('yop-if-not-empty', IfNotEmpty)
