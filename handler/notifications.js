const notifier = require('node-notifier');
const messages = require("../services/discord.js")

messages.on('message', data => {

    notifier.notify({
        title: data.title,
        message: data.body,
        icon: data.icon
    });
});
