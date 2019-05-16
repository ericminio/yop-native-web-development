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
    getAllNews() {
        var p = new Promise((resolve, reject)=>{
            events.notify('loading all news', 'start')
            fetch('/api/news.all').then((response) => {
                response.json().then((json) => {
                    events.notify('loading all news', 'done')
                    resolve(json.news)
                })
            })
        })
        return p
    }
    download(ids) {
        var p = new Promise((resolve, reject)=>{
            fetch('/api/download?id=' + ids.join('&id=')).then((response) => {
                response.blob().then((data) => {
                    resolve(data)
                })
            })
        })
        return p
    }
    isAuthorized(user) {
        var p = new Promise((resolve, reject)=>{
            fetch('/api/priviledges?user=' + user).then((response) => {
                response.json().then((data) => {
                    resolve(data)
                })
            })
        })
        return p
    }
}
var api = new Api()
