const { Client, MessageMedia, Chat, PrivateChat, GroupChat, Message, Contact, Location } = require('whatsapp-web.js')
const fs = require('fs')
const axios = require('axios')
const { color } = require('../utils/color')

const config = JSON.parse(fs.readFileSync('../auth/config.json'))


module.exports = msgHandler = async (msg) => {
    try {
        console.log(msg)
    } catch (e) {
        return console.log(e)
    }
}