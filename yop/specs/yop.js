const fs = require('fs');
const path = require('path');

let file = (name)=>{
    return fs.readFileSync(path.join(__dirname, name)).toString();
}
let yop = [
    '../lib/1.store.js',
    '../lib/2.events.js',
    '../lib/3.navigate.js',
    '../lib/4.route.js',
    '../lib/link.js'
].reduce((acc, current)=> acc + file(current), '');

module.exports = yop;