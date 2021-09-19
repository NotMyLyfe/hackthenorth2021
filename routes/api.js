require('dotenv').config();
const router = require('express').Router();
const axios = require('axios');
const config = require('./api/config');

const discordCache = {};

router.use('/config', config);

router.get("/discord/:id", async (req, res, next) => {
    try{
        const discordResponse = discordCache[req.params.id] ? discordCache[req.params.id] : discordCache[req.params.id] = await axios({
            method: "GET",
            url: `https://discord.com/api/v9/users/${req.params.id}`,
            headers:{
                'Authorization' :  `Bot ${process.env.DISCORD_BOT_TOKEN}`
            }
        });
        res.status(200).send(discordResponse.data);
    }
    catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;
