class Loader extends YafElement {

    constructor() {
        super()
    }
    connectedCallback() {
        api.getGoodNews().then((news)=>{
            events.notify('good.news', news)
        })
        api.getBadNews().then((news)=>{
            events.notify('bad.news', news)
        })
    }
}
customElements.define('yop-load-news', Loader)
