const router = require('express').Router();
const config = require('./api/config');

router.use('/config', config);

router.get("/discord", (req, res, next) => {
    if(req.body == "userInfo"){
        requestedUser = req.params.userID

    }
})

module.exports = router;
