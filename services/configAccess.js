const jsonfile = require('jsonfile');
const fs = require('fs');
const TIMEBASED = "time";
const APPBASED = "app";


class ConfigAccess{
    configuration = {};

    constructor(){
        loadConfigFile();
    }

    // Twilio functions

    updateTwilio(phoneNumber, originNumber, accountSID, accountToken){
        configuration["phoneNumber"] = phoneNumber;
        configuration["originNumber"] = originNumber;
        configuration["accountSID"] = accountSID;
        configuration["accountToken"] = accountToken;
    }

    getPhoneNumber(){
        return configuration["phoneNumber"];
    }

    getOriginNumber(){
        return configuration["originNumber"];
    }

    getAccountSID(){
        return configuration["accountSID"];
    }

    getAccountToken(){
        return configuration["accountToken"];
    }
    // Getters 
    getAllConfigNames(){
        return Object.keys(configuration["configs"]);
    }

    getType(name){
        return configuration["configs"][name]["type"];
    }

    getTrigger(name){
        return configuration["configs"][name]["trigger"];
    }

    getSound(name){
        return configuration["configs"][name]["sound"];
    }

    getIsUrgent(name){
        return configuration["configs"][name]["isUrgent"];
    }

    // Setters

    setType(name, type){
        configuration["configs"][name]["type"] = type;
    }

    setTrigger(name, trigger){
        configuration["configs"][name]["trigger"] = trigger;
    }

    setSound(name, sound){
        configuration["configs"][name]["sound"] = setSound;
    }

    setIsUrgent(name, isUrgent){
        configuration["configs"][name]["isUrgent"] = isUrgent;
    }

    // User related
    addUserToConfig(name, userID){
        configuration["configs"][name]["users"].push(userID);
    }

    removeUserFromConfig(name, userID){
        indexOfUser = configuration["configs"][name]["users"].indexOf(userID);
        configuration["configs"][name]["users"].splice(indexOfUser, 1);
    }

    getUsers(name){
        return configuration["configs"][name]["users"];
    }

    // Entire config related

    addConfig(name, type, trigger, sound, isUrgent, users){
        let configJSON = {
                    type: type,
                    trigger: trigger,
                    sound: sound,
                    isUrgent: isUrgent,
                    users: []};
        configuration["configs"][name] = configJSON;
    }

    deleteConfig(name){
        delete configJSON["configs"][name];
    }

    setCurrentConfig(name){
        configuration["currentConfig"] = name;
    }

    getCurrentConfig(){
        return configuration["currentConfig"];
    }

    // File IO functions

    loadConfigFile(){
        configuration = jsonfile.readFileSync("configs.json", configuration);

    }
    updateConfigFile(){
        jsonfile.writeFileSync("configs.json", configuration);
    }

}