const fs = require('fs-extra')
const record = require('./results/_successRecord2.txt')
const pending = record.filter(r => r.errorCode).map(r => '/r/' + r.sub + '\r\n').join('')
fs.writeFile('results/_pending2.txt', pending).then(() => console.log("success"))