class SelectableNewsList extends NewsList {

    connectedCallback() {
        super.connectedCallback()
        
        var headerColumn = document.createElement('th')
        var header = this.querySelector('table thead tr')
        header.insertBefore(headerColumn, header.childNodes[0])

        var selectColumn = document.createElement('td')
        var selectInput = document.createElement('input')
        selectInput.id = 'select-news-with-id'
        selectInput.type = 'checkbox'
        selectColumn.setAttribute('class', 'align-center')
        selectColumn.insertBefore(selectInput, selectColumn.childNodes[0])

        this.rowTemplate = this.querySelector('tr#news-with-id')
        this.rowTemplate.insertBefore(selectColumn, this.rowTemplate.childNodes[0])
        this.template = this.querySelector('tr#news-with-id').outerHTML
                            .split('news').join(this.getAttribute('news'))
    }

    update(news, id) {
        super.update(news)

        events.notify('news-cleared')
        var checkboxes = this.querySelectorAll('input')
        for (var i=0; i<checkboxes.length; i++) {
            var checkbox = checkboxes[i]
            checkbox.addEventListener('click', (e)=>{
                var id = e.target.id.split('news-')[1]
                if (e.target.checked) {
                    events.notify('news-selected', id)
                }
                else {
                    events.notify('news-unselected', id)
                }
            })
        }
    }
}
customElements.define('yop-selectable-news-list', SelectableNewsList)
