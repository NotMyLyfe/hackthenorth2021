const router = require('express').Router();
const path = require('path');
const upload = require('multer')({ dest: 'configUploads/'});
const ConfigAccess = require('../../services/configAccess');
const jsonfile = require('jsonfile');


router.get('/current', (req, res, next) => {
    res.status(200).send(ConfigAccess.getCurrentConfig());
});

router.get('/all', (req, res, next) => {
    res.status(200).send(ConfigAccess.getAllConfigNames());
});

router.get('/mode', (req, res, next) => {
    if(!req.query.name) res.status(400).send();
    else res.status(200).send(ConfigAccess.getConfig(req.query.name));
});

router.get('/file', (req, res, next) => {
    try{
        res.attachment(path.join(__dirname, '../../config.json')).send();
    }
    catch(err){
        res.status(400).send();
    }
});

router.get('/sms', (req, res, next) => {
    res.status(200).send(ConfigAccess.getTwilio());
});

router.get('/user', (req, res, next) => {
    res.status(200).send(ConfigAccess.getUsers(req.query.name))
});

router.put('/mode', (req, res, next) => {
    if(!req.body.name || !req.body.type || !req.body.trigger || !req.body.sound || !req.body.isUrgent){
        res.status(400).send();
    }
    else{
        ConfigAccess.addConfig(req.body.name, req.body.type, req.body.trigger, req.body.sound, req.body.isUrgent, req.body.users? req.body.users : []);
        res.status(201).send();
    }
});

router.post('/mode', (req, res, next) => {
    if(!req.body.name)
        return res.status(400).send();
    if(req.body.type)
        ConfigAccess.setType(req.body.name, req.body.type)
    if(req.body.trigger)
        ConfigAccess.setTrigger(req.body.name, req.body.trigger)
    if(req.body.sound)
        ConfigAccess.setSound(req.body.name, req.body.sound)
    if(req.body.isUrgent)
        ConfigAccess.setSound(req.body.name, req.body.isUrgent)
    res.status(200).send();
});

router.post('/sms', (req, res, next) => {
    if(!req.body.phoneNumber || !req.body.originNumber || !req.body.accountSID || !req.body.accountToken){
        return res.status(400).send();
    }
    else{
        ConfigAccess.updateTwilio(req.body.phoneNumber, req.body.originNumber, req.body.accountSID, req.body.accountToken);
        res.status(200).send();
    }
});

router.post('/file', upload.single('config'), (req, res, next) => {
    const data = JSON.parse(req.file.buffer.toString());
    // Do stuff to give the data to config
    jsonfile.writeFileSync("configs.json", data);
});

router.post('/user', (req, res, next) => {
    if(!req.body.name || !req.body.userID) return res.status(400).send();
    ConfigAccess.addUserToConfig(req.body.name, req.body.userID);
    res.status(200).send();
});

router.delete('/mode', (req, res, next) => {
    if(!req.body.name) return res.status(400).send();
    ConfigAccess.deleteConfig(req.body.name);
    res.status(200).send();
});

router.delete('/user', (req, res, next) => {
    if(!req.body.name || !req.body.userID) return res.status(400).send();
    ConfigAccess.removeUserFromConfig(req.body.name, req.body.userID);
    res.status(200).send();
});

module.exports = router;