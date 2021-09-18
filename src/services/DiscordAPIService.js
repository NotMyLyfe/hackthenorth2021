import axios from 'axios';
// import store from '../store/index';
export const authenticate = async () => {
    const fd = new URLSearchParams();
    fd.set('grant_type', 'client_credentials');
    fd.set('scope', 'identify connections');

    return (await axios({
        url: 'https://discordapp.com/api/v8/oauth2/token',
        method: 'POST',
        auth: {
            username: "888636259977805854",
            password: "eKmk6VyClsltDIeUNsiJ1sA4ITS1gLN7"
        },
        data: fd
    })).data;
}
export const getUserInfoFromID = async (id) => {
    return (await axios({
        url: `https://discordapp.com/api/v8/users/${id}`,
        headers: {
            // Authorization: 'Bearer ' + store.state.discordAPICreds.access_token
            Authorization: 'Bot ODg4NjM2MjU5OTc3ODA1ODU0.YUVlAg.MauqzMRWCqWbZIUIzbee7enVSlo'
        }
    })).data;
}