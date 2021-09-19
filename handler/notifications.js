const notifier = require('node-notifier');
const path = require('path');
const messages = require("../services/discord.js");
const twilio = require("../services/twilio");
const ConfigAccess = require('../services/configAccess').default;
const fs = require('fs');

messages.on('message', data => {
    const configName = ConfigAccess.getCurrentConfig();
    if(configName === "Disabled" || ConfigAccess.getUsers(configName).includes(data.message.author.id)){
		let soundFile;
		if(configName !== "Disabled"){
			soundFile = ConfigAccess.getSound(configName);
			
			// check if sound file is valid
			if(!fs.existsSync(soundFile)){
				soundFile = undefined;
			}
		}
        notifier.notify({
            title: data.title,
            message: data.body,
            icon: path.join(__dirname, "../assets/imgs/discord.png"),
            ...{soundFile ? {sound: soundFile} : {}}
        });
        if(configName.toLowerCase() === "urgent"){
            twilio(ConfigAccess.getPhoneNumber(), `FocusCord: You have a message from ${data.title}`, ConfigAccess.getOriginNumber(), ConfigAccess.getAccountSID(), ConfigAccess.getAccountToken());
        }
    }
});
