require("dotenv").config();
import qs from "qs"
const axios = require('axios');

// User's phone number
const number = "";

axios({
    method: "POST",
    url: `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
    data: qs.stringify({
        Body: "Testing123 UwU",
        From: "+12543472673",
        To: number
    }),
    auth: {username: process.env.TWILIO_ACCOUNT_SID,
           password: process.env.TWILIO_AUTH_TOKEN
    },
    headers: {"Content-Type": "application/x-www-form-urlencoded"}
})