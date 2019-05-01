var { expect } = require('chai')
var fs = require('fs')
var path = require('path')
var sut = fs.readFileSync(path.join(__dirname, '..', 'js', 'yop', 'dates.js')).toString()
var dateLabelFrom = (new Function(sut + ' return dateLabelFrom;'))()

describe('The date format that we need', ()=>{

    it('is available :)', ()=>{
        expect(dateLabelFrom('2019-05-01T14:33:14Z')).to.equal('2019-05-01 07:33:14')
    })
    it('is time zone aware', ()=>{
        expect(dateLabelFrom('2019-05-01T06:00:00Z')).to.equal('2019-04-30 23:00:00')
    })
})
