const jsonfile = require('jsonfile');
const fs = require('fs');
const TIMEBASED = "time";
const APPBASED = "app";

configuration = {};


// Getters 
function getAllConfigNames(){
    return Object.keys(configuration["configs"]);
}

function getType(name){
    return configuration["configs"][name]["type"];
}

function getTrigger(name){
    return configuration["configs"][name]["trigger"];
}

function getSound(name){
    return configuration["configs"][name]["sound"];
}

function getIsUrgent(name){
    return configuration["configs"][name]["isUrgent"];
}

// Setters

function setType(name, type){
    configuration["configs"][name]["type"] = type;
}

function setTrigger(name, trigger){
    configuration["configs"][name]["trigger"] = trigger;
}

function setSound(name, sound){
    configuration["configs"][name]["sound"] = setSound;
}

function setIsUrgent(name, isUrgent){
    configuration["configs"][name]["isUrgent"] = isUrgent;
}

// User related
function addUserToConfig(name, userID){
    configuration["configs"][name]["users"].push(userID);
}

function removeUserFromConfig(name, userID){
    indexOfUser = configuration["configs"][name]["users"].indexOf(userID);
    configuration["configs"][name]["users"].splice(indexOfUser, 1);
}

function getUsers(name){
    return configuration["configs"][name]["users"];
}

// Entire config related

function addConfig(name, type, trigger, sound, isUrgent, users){
    let configJSON = {
                  type: type,
                  trigger: trigger,
                  sound: sound,
                  isUrgent: isUrgent,
                  users: []};
    configuration["configs"][name] = configJSON;
}

function deleteConfig(name){
    delete configJSON["configs"][name];
}

function setCurrentConfig(name){
    configuration["currentConfig"] = name;
}

function getCurrentConfig(){
    return configuration["currentConfig"];
}

// File IO functions

function loadConfigFile(){
    configuration = jsonfile.readFileSync("configs.json", configuration);

}
function updateConfigFile(){
    jsonfile.writeFileSync("configs.json", configuration);
}

loadConfigFile();
