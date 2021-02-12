const { Client, MessageMedia, Chat, PrivateChat, GroupChat, Message, Contact, Location } = require('whatsapp-web.js')
const fs = require('fs')
const axios = require('axios')
const moment = require('moment-timezone')
const { help, info, donate, github, api } = require('./help')

const { color } = require('../utils/color')

const config = JSON.parse(fs.readFileSync('./auth/config.json'))
const { botNumber, owner, creator, botName } = config
const setting = JSON.parse(fs.readFileSync('./auth/setting.json'))
const { turu_key } = setting


module.exports = msgHandler = async (msg) => {
    try {
        const { mediaKey, id, ack, hasMedia, body, type, timestamp, from, to, author, isForwarded, isStatus, isStarred, broadcast, fromMe, hasQuotedMsg, location, mentionedIds } = msg
        const commands = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const args = commands.split('')
        
        const premium = JSON.parse(fs.readFileSync('./database/premium.json'))
        const isPremium = premium.includes(from)
        const commandsDB = JSON.parse(fs.readFileSync('./database/commands.json'))
        for (var i = 0; i < commandsDB.length; i++) {
            if (body.toLowerCase() === commandsDB[i].pesan) {
                return msg.reply(commandsDB[i].balasan)
            }
        }
        
        switch (commands) {
            case 'menu':
                msg.reply('apa cuk')
                break
            default:
                msg.reply('hai')
        }
    } catch (e) {
        return console.log(e)
    }
}