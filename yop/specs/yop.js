const fs = require('fs');
const path = require('path');

let file = (name)=>{
    return fs.readFileSync(path.join(__dirname, name)).toString();
}
let yop = [
    '../lib/1.store.js',
    '../lib/2.events.js',
    '../lib/3.route.js',
    '../lib/5.navigate.js'
].reduce((acc, current)=> acc + file(current), '');

module.exports = yop;