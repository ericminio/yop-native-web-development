const downloadTemplate = document.createElement('template')

downloadTemplate.innerHTML = `
    <yop-menu></yop-menu>
    
    <div class="section">
        <label class="section-title">All news</label>
        <yop-spinner color="black" size="18px" listen="loading all news"></yop-spinner>

        <yop-if-empty collection="all-news">
            <label id="all-news-empty-message">No news... good news</label>
        </yop-if-empty>
        <yop-if-not-empty collection="all-news">
            <yop-selectable-news-list news="all-news"></yop-selectable-news-list>
            <yop-download-button></yop-download-button>
        </yop-if-not-empty>
    </div>
`

class Download extends YopElement {

    connectedCallback() {
        this.appendChild(downloadTemplate.content.cloneNode(true))
        api.getAllNews().then((news)=>{
            events.notify('all-news', news)
        })
    }
}
customElements.define('yop-download', Download)
