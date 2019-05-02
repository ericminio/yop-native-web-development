class Loader extends YopElement {

    constructor() {
        super()
    }
    connectedCallback() {
        setTimeout(()=>{
            api.getGoodNews().then((news)=>{
                events.notify('good-news', news)
            })
            api.getBadNews().then((news)=>{
                events.notify('bad-news', news)
            })
        }, 100)
    }
}
customElements.define('yop-load-news', Loader)
