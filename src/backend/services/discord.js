require('dotenv').config();
const discordRPC = require('../lib/discord-rpc');
const events = require('events');

const clientId = process.env.DISCORD_CLIENT_ID;
const scopes = ['rpc', 'rpc.notifications.read'];
const redirectUri = "http://127.0.0.1";
const clientSecret = process.env.DISCORD_CLIENT_SECRET;

const messages = new events.EventEmitter();
const client = new discordRPC.Client({
    transport: 'ipc'
});

let unsubHandler;

client.on('ready', async () => {
    console.log(client.application.name);
    console.log(client.user.username);
    console.log(client.user);

    unsubHandler = await client.subscribe('NOTIFICATION_CREATE');

    client.on('NOTIFICATION_CREATE', (data) => {
        console.log(data);
        messages.emit('message', data);
    })
})

client.login({clientId, scopes, redirectUri, clientSecret});

export default messages;