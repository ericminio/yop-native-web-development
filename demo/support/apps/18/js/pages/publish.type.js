const publishTypeTemplate = document.createElement('template')

publishTypeTemplate.innerHTML = `

    <yop-menu></yop-menu>

    <div class="step-context">
        <display-steps step="1"/></display-steps>
    </div>

    <div class="step-data">
        <div class="step-data-section-title">Publish news</div>
        <div class="field-label">Type</div>
        <input type="radio" id="good" name="type" value="good">Good
        <input type="radio" id="bad" name="type" value="bad">Bad
    </div>

    <div class="step-context">
        <table>
            <tbody>
                <tr>
                    <td>
                    </td>
                    <td class="step-next">
                        <yop-link to="/publish/title">
                            <div id="next">Next</div>
                        </yop-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
`

class PublishType extends YopElement {

    connectedCallback() {
        this.appendChild(publishTypeTemplate.content.cloneNode(true))
        store.saveObject('newNews', {})
        this.querySelector('#good').addEventListener('click', (e)=>{
            this.chosenType = 'good'
        })
        this.querySelector('#bad').addEventListener('click', (e)=>{
            this.chosenType = 'bad'
        })
        this.querySelector('#next').addEventListener('click', (e)=>{
            let newNews = store.getObject('newNews')
            newNews.type = this.chosenType
            store.saveObject('newNews', newNews)
        })
    }
}
customElements.define('publish-type', PublishType)
