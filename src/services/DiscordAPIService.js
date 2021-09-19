import axios from 'axios';
const lAxios = axios.create({
    baseURL: "http://localhost:3000/api"
})

export const getUserInfoFromID = async (id) => {
    return (await lAxios({
        url: `/discord/${id}`
    })).data;
}
export const getModes = async () => {
    return (await lAxios({
        url: "/config/all"
    })).data
}
export const getMode = async (name) => {
    return (await lAxios({
        url: "/config/mode",
        params: {
            name: name
        }
    })).data
}
export const createMode = async (name, sound, automation, automationData, users) => {
    return (await lAxios({
        url: "/config/mode",
        method: "put",
        data: {
            name, sound, automation, automationData, users
        }
    })).data
}
export const editMode = async (name, sound, automation, automationData, users) => {
    return (await lAxios({
        url: "/config/mode",
        method: "post",
        data: {
            name, sound, automation, automationData, users
        }
    })).data;
}
export const deleteMode = async(name) => {
    await lAxios({
        url: "/config/mode",
        method: "delete",
        params: {name}
    });
}
export const getCurrentMode = async () => {
    return (await lAxios({
        url: "/config/current"
    })).data.mode;
}
export const setCurrentMode = async (name) => {
    return (await lAxios({
        url: "/config/current",
        method: "post",
        data: {
            name: name
        }
    })).data;
}
export const getSMSConfig = async() => {
    return (await lAxios({
        url: "/config/sms"
    })).data;
}
export const setSMS = async (phoneNumber, originNumber, accountSID, accountToken) => {
    return (await lAxios({
        url: "/config/sms",
        method: "post",
        data: {
            phoneNumber, originNumber, accountSID, accountToken
        }
    })).data;
}