class Api {
    getCountries() {
        var p = new Promise((resolve, reject)=>{
            fetch('/api/countries').then((response) => {
                response.json().then((json) => {
                    resolve(json.countries)
                })
            })
        })
        return p
    }
}
var api = new Api()
