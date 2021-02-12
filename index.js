const { Client, MessageMedia, Chat, PrivateChat, GroupChat, Message, Contact, Location } = require('whatsapp-web.js')
const fs = require('fs')

const config = JSON.parse(fs.readFileSync('./auth/config.json'))
const  { color } = require('./utils/color')
const msgHandler = require('./message/handler')



const SESSION_FILE_PATH = './auth/session.data.json'
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH)
}

const client = new Client({
  restartOnAuthFail: true,
  puppeteer: {
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ],
  },
  session: sessionCfg
})


client.on('message', async (msg) => {
    console.log(`${color('[MESSAGE]', 'green')} ${color(msg.body, 'yellow')} from ${color(msg.from.replace('@c.us', ''), 'gold')}`)
    msgHandler(msg, client)
})


client.initialize()


client.on('qr', (qr) => {
    console.log(color('[QR RECEIVED]', 'yellow') + qr)
})

client.on('ready', () => {
    console.log(color('[START]', 'green') + 'Whatsapp is ready')
})

client.on('authenticated', (session) => {
    console.log(color('[AUTH]', 'green') + 'Whatsapp is authenticated')
    sessionCfg = session
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) return console.log(err)
    })
})

client.on('auth_failure', function (session) {
    console.log(color('[AUTH]', 'red') + 'Authentication failed, restarting....')
})

client.on('disconnected', (reason) => {
    console.log(color('[DISCONNECTED]', 'red') + 'Whatsapp disconnected, reason: ' + reason)
    fs.unlinkSync(SESSION_FILE_PATH, function (err) {
        if (err) return console.log(err)
        console.log(color('Session file deleted, initialize new session....', 'yellow'))
    })
    client.destroy()
    client.initialize()
})


/**
 * AUTHOR: Muhammad Naufal Al Fattah
*/