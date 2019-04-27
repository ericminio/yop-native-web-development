class Loader extends YafElement {

    constructor() {
        super()
    }
    connectedCallback() {
        api.getGoodNews().then((news)=>{
            store.notify('good.news', news)
        })
        api.getBadNews().then((news)=>{
            store.notify('bad.news', news)
        })
    }
}
customElements.define('yop-load-news', Loader)
