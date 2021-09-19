require("dotenv").config();
const qs = require("qs");
const axios = require('axios');

module.exports = function sendSMS(phoneNumber, message, originNumber, accountSID, authToken){
    axios({
        method: "POST",
        url: `https://api.twilio.com/2010-04-01/Accounts/${accountSID}/Messages.json`,
        data: qs.stringify({
            Body: message,
            From: originNumber,
            To: phoneNumber
        }),
        auth: {username: accountSID,
               password: authToken
        },
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
    })
}