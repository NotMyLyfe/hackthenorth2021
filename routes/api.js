const router = require('express').Router();

module.exports = router;

// GET methods

router.get("/", function(req, res){
    if(req.body == "configFile"){

    }
})

router.get("/mode", function(req, res){
    if(req.body == "currentMode"){

    }
    else if(req.body == "allModes"){

    }
    else if(req.body == "modeConfig"){
        // Read requested config from paramaters
        requestedConfig = req.params.mode

    }
})

router.get("/discord", function(req, res){
    if(req.body == "userInfo"){
        requestedUser = req.params.userID

    }
})