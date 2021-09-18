require("dotenv").config();
import qs from "qs"
const axios = require('axios');

export default function sendSMS(phoneNumber, message){
    axios({
        method: "POST",
        url: `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
        data: qs.stringify({
            Body: message,
            From: "+12543472673",
            To: phoneNumber
        }),
        auth: {username: process.env.TWILIO_ACCOUNT_SID,
               password: process.env.TWILIO_AUTH_TOKEN
        },
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
    })
}