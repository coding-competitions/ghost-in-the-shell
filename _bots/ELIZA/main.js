const IRC = require("./node_modules/irc-framework/src");
const ElizaBot = require('./node_modules/elizabot/elizabot')

const bots = {};
const generalMsg = 
    'Hi, I\'m ELIZA, your personal digital therapist! ' +
    'To start a session send me a direct message or type ' +
    '\x11/query ELIZA Hi\x11.';
let generalMsgTs = 0;                         // Timestamp for sending a general message
function createBot(key, reply) {
    const bot = new ElizaBot();                     // Create a new bot to respond to messages
    const msg = bot.getInitial();                   // Get initial message for user / channel
    bots[key] = bot;                                // Save bot for future conversations
    bots.ts = Date.now();                           // Keep a timestamp to make sure sessions don't last oo long
    delaySend(reply, msg);                          // Send reply
}
function respondBot(key, prompt, reply) {
    const bot = bots[key];                          // Find existing bot
    let msg = bot.transform(prompt);                // Get response message
    if (bot.quit) {                                 // User requested to quit session?
        msg = bot.getFinal();                       // Get a final message to send to user
        delete bots[key];                           // Destroy this bot
    } else {
        bot.ts = Date.now();                        // Update timestamp
    }
    delaySend(reply, msg);                          // Send reply
}
function cleanupBots() {
    const maxAge = Date.now() - 6e5;                // Maximum age to allow (10 min)
    const entries = Object.entries(bots);
    entries.forEach(function ([key, bot]) {         // Loop through known bots
        if (bot.ts < maxAge) {                      // Is bot session stale?
            client.sendMessage('/msg', key, bot.getFinal());
            delete bots[key];                       // Destroy this bot
        }
    });
}
function delaySend(sender, msg) {                   // Send a message after a naturalistic delay
    const delay = 500 + 10 * msg.length + Math.random() * 50 * msg.length;
    setTimeout(function() { sender(msg) }, delay);
}

const host = process.env.IRC_HOST || 'localhost';   // IRC server host name (localhost for local testing)
const port = process.env.IRC_PORT || 6667;          // IRC server port number
const nick = process.env.IRC_NICK || 'ELIZA'        // Nickname I'll use in IRC
const regexp = new RegExp(`\\b${nick}\\b`, 'i');    // Pattern to listen for someone mentioning me

const channel = '#general';                         // Channel for general discussion

const client = new IRC.Client();
console.log('connecting to', `${host}:${port}`, 'as');
client.connect({ host, port, nick });
 
client.on('message', function(event) {              // When a message is received
    if (event.target == nick) {                     // This is a direct message to me
        const { ident: key, message, reply } = event;
        if (key in bots) {                          // Is there an existing session for this user?
            respondBot(key, message, reply);        // Continue previous session
        } else {
            client.whois(event.nick, function(w) {  // Get info about the sender of this message
                if (!w.bot) {                       // If sender is not a bot
                    createBot(key, reply);          // Start a new session
                }
            });
        }
    } else if (regexp.test(event.message)) {        // DId someone mention me?
        const now = Date.now();
        if (now - generalMsgTs > 6e4) {             // Only send general messages once every minute
            generalMsgTs = now;
            delaySend(event.reply, generalMsg);
        }
    }
    cleanupBots();                                  // Cleanup old sessions
});

client.on('connected', function(info) {             // When connected to the server
    console.log('connected as', info.nick);
    client.join(channel);                           // Auto join #general channel
    client.mode(info.nick, '+B');                   // Identify self as a bot
})

client.on('close', function() {                     // When connection to the server is lost
    console.log('connection closed');
});

client.on('join', function(info) {                  // When someone joins a channel
    console.log(info.nick, 'joined channel', info.channel);
    if (info.nick == nick) {
        delaySend(                                  // Announce myself on the new channel
            function(msg) {
                client.sendMessage('/msg', info.channel, msg);
            }, generalMsg);
    }
});
