class Api {
    getGoodNews() {
        var p = new Promise((resolve, reject)=>{
            events.notify('loading good news', 'start')
            fetch('/api/news.good').then((response) => {
                response.json().then((json) => {
                    events.notify('loading good news', 'done')
                    resolve(json.news)
                })
            })
        })
        return p
    }
    getBadNews() {
        var p = new Promise((resolve, reject)=>{
            events.notify('loading bad news', 'start')
            fetch('/api/news.bad').then((response) => {
                response.json().then((json) => {                    
                    events.notify('loading bad news', 'done')
                    resolve(json.news)
                })
            })
        })
        return p
    }
}
var api = new Api()
