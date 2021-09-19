const notifier = require('node-notifier');
const path = require('path');
const messages = require("../services/discord.js");

messages.on('message', data => {
    notifier.notify({
        title: data.title,
        message: data.body,
        icon: path.join(__dirname, "../assets/imgs/discord.png")
    });
});
