const notifier = require('node-notifier');
const path = require('path');
const messages = require("../services/discord.js");
const twilio = require("../services/twilio");
const ConfigAccess = require('../services/configAccess').default;

messages.on('message', data => {
    const configName = ConfigAccess.getCurrentConfig();
    if(ConfigAccess.getUsers(configName).includes(data.message.author.id)){
        notifier.notify({
            title: data.title,
            message: data.body,
            icon: path.join(__dirname, "../assets/imgs/discord.png"),
            sound : ConfigAccess.getSound(ConfigAccess.getCurrentConfig(configName))
        });
        if(config.urgent){
            twilio(ConfigAccess.getPhoneNumber(), `FocusCord: You have a message from ${data.title}`, ConfigAccess.getOriginNumber(), ConfigAccess.getAccountSID(), ConfigAccess.getAccountToken());
        }
    }
});
