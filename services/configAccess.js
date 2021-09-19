const jsonfile = require('jsonfile');
const fs = require('fs');
const TIMEBASED = "time";
const APPBASED = "app";


class ConfigAccess{
    configuration = {};

    constructor(){
        this.loadConfigFile();
    }

    // Twilio functions

    updateTwilio(phoneNumber, originNumber, accountSID, accountToken){
        this.configuration["phoneNumber"] = phoneNumber;
        this.configuration["originNumber"] = originNumber;
        this.configuration["accountSID"] = accountSID;
        this.configuration["accountToken"] = accountToken;
    }

    getTwilio(){
        return{
            phoneNumber : this.getPhoneNumber(),
            originNumber : this.getOriginNumber(),
            accountSID : this.getAccountSID(),
            accountToken : this.getAccountToken()
        }
    }
    
    getPhoneNumber(){
        return this.configuration["phoneNumber"];
    }

    getOriginNumber(){
        return this.configuration["originNumber"];
    }

    getAccountSID(){
        return this.configuration["accountSID"];
    }

    getAccountToken(){
        return this.configuration["accountToken"];
    }

    // Getters 
    getAllConfigNames(){
        return Object.keys(this.configuration["configs"]);
    }

    getConfig(name){
        return this.configuration["configs"][name];
    }

    getType(name){
        return this.configuration["configs"][name]["type"];
    }

    getTrigger(name){
        return this.configuration["configs"][name]["trigger"];
    }

    getSound(name){
        return this.configuration["configs"][name]["sound"];
    }

    getIsUrgent(name){
        return this.configuration["configs"][name]["isUrgent"];
    }

    // Setters

    setType(name, type){
        this.configuration["configs"][name]["type"] = type;
    }

    setTrigger(name, trigger){
        this.configuration["configs"][name]["trigger"] = trigger;
    }

    setSound(name, sound){
        this.configuration["configs"][name]["sound"] = sound;
    }

    setIsUrgent(name, isUrgent){
        this.configuration["configs"][name]["isUrgent"] = isUrgent;
    }

    // User related
    addUserToConfig(name, userID){
        this.configuration["configs"][name]["users"].push(userID);
    }

    removeUserFromConfig(name, userID){
        indexOfUser = this.configuration["configs"][name]["users"].indexOf(userID);
        this.configuration["configs"][name]["users"].splice(indexOfUser, 1);
    }

    getUsers(name){
        return this.configuration["configs"][name]["users"];
    }

    // Entire config related

    addConfig(name, type, trigger, sound, isUrgent, users){
        let configJSON = {
                    type: type,
                    trigger: trigger,
                    sound: sound,
                    isUrgent: isUrgent,
                    users: users};
        this.configuration["configs"][name] = configJSON;
    }

    deleteConfig(name){
        delete configJSON["configs"][name];
    }

    setCurrentConfig(name){
        this.configuration["currentConfig"] = name;
    }

    getCurrentConfig(){
        return this.configuration["currentConfig"];
    }

    overwrite(file){
        this.configuration = file;
    }

    // File IO functions

    loadConfigFile(){
        this.configuration = jsonfile.readFileSync("configs.json", this.configuration);

    }
    updateConfigFile(){
        jsonfile.writeFileSync("configs.json", this.configuration);
    }

}
module.exports = new ConfigAccess();