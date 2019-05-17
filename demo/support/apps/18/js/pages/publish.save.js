const publishSaveTemplate = document.createElement('template')

publishSaveTemplate.innerHTML = `

    <yop-menu></yop-menu>

    <div class="step-context">
        <display-steps step="4"/></display-steps>
    </div>

    <div class="step-data">
        <div class="step-data-section-title">Publish news</div>
        <div class="field-label">Type</div>
        <div class="field-value" id="type">xxx</div>
        <div class="field-label">Title</div>
        <div class="field-value" id="title">xxx</div>
    </div>

`

class PublishSave extends YopElement {

    connectedCallback() {
        this.appendChild(publishSaveTemplate.content.cloneNode(true))
        let newNews = store.getObject('newNews')
        this.querySelector('#type').textContent = newNews.type
        this.querySelector('#title').textContent = newNews.title
        api.save(newNews.type, newNews.title).then((data)=>{
            console.log(data);
        })
    }
}
customElements.define('publish-save', PublishSave)
