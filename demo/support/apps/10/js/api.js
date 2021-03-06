class Api {
    getGoodNews() {
        var p = new Promise((resolve, reject)=>{
            fetch('/api/news.good').then((response) => {
                response.json().then((json) => {
                    resolve(json.news)
                })
            })
        })
        return p
    }
    getBadNews() {
        var p = new Promise((resolve, reject)=>{
            fetch('/api/news.bad').then((response) => {
                response.json().then((json) => {
                    resolve(json.news)
                })
            })
        })
        return p
    }
}
var api = new Api()
