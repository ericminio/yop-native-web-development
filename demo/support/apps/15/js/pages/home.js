const homeTemplate = document.createElement('template')

homeTemplate.innerHTML = `
<style>
    @import '/all.css';


</style>
<div class="half-section one">
    <label class="section-title">Good news</label>
    <yop-spinner color="black" size="18px" listen="loading good news"></yop-spinner>

    <yop-if-empty collection="good-news">
        <label id="good-news-empty-message">No news, good news</label>
    </yop-if-empty>
    <yop-if-not-empty collection="good-news">
        <yop-news-list news="good-news"></yop-news-list>
    </yop-if-not-empty>
</div>

<div class="half-section two">
    <label class="section-title">So-so news</label>
    <yop-spinner color="red" size="18px" listen="loading bad news"></yop-spinner>

    <yop-if-empty collection="bad-news">
        <label id="bad-news-empty-message">No bad news... very good news :)</label>
    </yop-if-empty>
    <yop-if-not-empty collection="bad-news">
        <yop-news-list news="bad-news"></yop-news-list>
    </yop-if-not-empty>
</div>
`

class Home extends YopElement {

    constructor() {
        super()
        this.tree.appendChild(homeTemplate.content.cloneNode(true))
    }
    connectedCallback() {
        api.getGoodNews().then((news)=>{
            events.notify('good-news', news)
        })
        api.getBadNews().then((news)=>{
            events.notify('bad-news', news)
        })
    }
}
customElements.define('yop-home', Home)
