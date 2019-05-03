const downloadTemplate = document.createElement('template')

downloadTemplate.innerHTML = `
<style>
    @import '/all.css';


</style>
<div class="section">
    <label class="section-title">All news</label>
    <yop-spinner color="black" size="18px" listen="loading all news"></yop-spinner>

    <yop-if-empty collection="all-news">
        <label id="all-news-empty-message">No news... good news</label>
    </yop-if-empty>
    <yop-if-not-empty collection="all-news">
        <yop-display news="all-news"></yop-display>
    </yop-if-not-empty>
</div>
`

class Download extends YopElement {

    constructor() {
        super()
        this.tree.appendChild(downloadTemplate.content.cloneNode(true))
    }
    connectedCallback() {
        api.getAllNews().then((news)=>{
            events.notify('all-news', news)
        })
    }
}
customElements.define('yop-download', Download)
