const downloadButtonTemplate = document.createElement('template')

downloadButtonTemplate.innerHTML = `
    <div class="action" id="download-button">Download</div>
`

class DownloadButton extends YopElement {

    connectedCallback() {
        this.style = 'display: inline-block'
        this.appendChild(downloadButtonTemplate.content.cloneNode(true))
        events.register(this, 'news-cleared')
        events.register(this, 'news-selected')
        events.register(this, 'news-unselected')
        this.querySelector('#download-button').addEventListener('click', (e)=>{
            api.download(this.ids).then((data)=>{
                save('news.txt', data)
            })
        })
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

}
customElements.define('yop-download-button', DownloadButton)
