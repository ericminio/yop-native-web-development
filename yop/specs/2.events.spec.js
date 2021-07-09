const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const sut = fs.readFileSync(path.join(__dirname, '../lib/2.events.js')).toString();
const Events = (new Function(`${sut} return Events;`))()

describe('Events', ()=>{

    let events;
    beforeEach(()=>{
        events = new Events();
    })
    it('starts without listeners', ()=>{
        expect(Object.keys(events.listeners).length).to.equal(0);
    });
    it('notifies on demand', ()=>{
        let spy;
        let component = {
            update: (value)=> { spy = value; }
        }
        events.register(component, 'that-event');
        events.notify('that-event', 42);
        expect(spy).to.equal(42);
    });
    it('includes event id in notification', ()=>{
        let spy;
        let component = {
            update: (value, id)=> { spy = id; }
        }
        events.register(component, 'that-event');
        events.notify('that-event', 42);
        expect(spy).to.equal('that-event');
    });
});