require('dotenv').config();
const DiscordRPC = require('discord-rpc');

const clientId = process.env.DISCORD_CLIENT_ID;
const scopes = ['rpc', 'rpc.notifications.read'];
const redirectUri = "http://127.0.0.1";
const clientSecret = process.env.DISCORD_CLIENT_SECRET;

const client = new DiscordRPC.Client({
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
    })

})

client.login({clientId, scopes, redirectUri, clientSecret});

process.stdin.resume();//so the program will not close instantly

async function exitHandler(exitCode) {
    try{
        if (exitCode || exitCode === 0) console.log(exitCode);

        if(unsubHandler){
            await unsubHandler.unsubscribe();
        }
        process.exit((exitCode || exitCode === 0) ? exitCode : 0);
    }
    catch(e){
        console.error("There was an error cleaning up. Exiting ungracefully.", e);
        process.exit(1);
    }
}

function raiseSigint() {
    process.emit("SIGINT");
}

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null));
process.on('SIGUSR2', exitHandler.bind(null));

//catches uncaught exceptions
process.on('uncaughtException', function(err){
    console.error(err);
    raiseSigint();
});