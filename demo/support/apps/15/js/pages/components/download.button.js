const downloadButtonTemplate = document.createElement('template')

downloadButtonTemplate.innerHTML = `
<style>
    @import '/all.css';

    .action {
        height: 20px;
        cursor: pointer;
        padding: 10px 5px 5px 5px;
        color: black;
        border: 1px solid black;
        border-radius: 5px;
        text-align: center;
        margin-left: 5px;
        cursor: pointer;
    }
</style>
<div class="action" id="download-button">Download</div>
`

class DownloadButton extends YopElement {

    constructor() {
        super()
        this.tree.style = 'display: inline-block'
        this.tree.appendChild(downloadButtonTemplate.content.cloneNode(true))
        events.register(this, 'news-cleared')
        events.register(this, 'news-selected')
        events.register(this, 'news-unselected')
    }
    update(id, event) {
        if ('news-cleared' == event) {
            this.ids = []
        }
        if ('news-selected' == event) {
            this.ids.push(id)
        }
        if ('news-unselected' == event) {
            this.ids.splice(this.ids.indexOf(id), 1);
        }
    }
    connectedCallback() {
        this.tree.querySelector('#download-button').addEventListener('click', (e)=>{
            api.download(this.ids).then((data)=>{
                save('news.txt', data)
            })
        })
    }
}
customElements.define('yop-download-button', DownloadButton)
