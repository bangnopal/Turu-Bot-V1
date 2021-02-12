const fs = require('fs')

const config = JSON.parse(fs.readFileSync('./auth/config.json'))
const { owner, creator, botName, notNumber } = config

module.exports = menu => {
    return `
Hai kak perkenalkan namaku *${botName} 😎*


Berikut list fitur yang dapat kamu gunakan 🚀:

=> COMMANDS1
_DESCRIPTION_

=> COMMANDS2
_DESCRIPTION_


Powered by NaufalHoster.XYZ 😎
`
}