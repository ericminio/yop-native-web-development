const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let window = (new JSDOM(`<html><body></body></html>`, { url: 'https://localhost' })).window;
const sut = fs.readFileSync(path.join(__dirname, '../lib/1.store.js')).toString();
const Store = (new Function(`return (window)=> { ${sut} return Store; };`))()(window)

describe('Store', ()=>{

    let store;
    beforeEach(()=>{
        store = new Store(window);
        store.clear();
    })
    it('stores value as string', ()=>{
        store.save('this-id', 42);
        expect(store.get('this-id')).to.equal('42');
    });
    it('defaults to null', ()=>{
        expect(store.get('this-id')).to.equal(null);
    });
    it('supports delete', ()=>{
        store.save('this-id', 42);
        store.delete('this-id');
        expect(store.get('this-id')).to.equal(null);
    });
    it('offers explicit api for storing object', ()=>{
        store.saveObject('this-id', { any:'thing' });
        expect(store.getObject('this-id')).to.deep.equal({ any:'thing' });
    });
});