import { API } from '../constants.js';

export async function login(credentials) {
    let loginAPI = API + 'auth/login';
    return fetch(
        loginAPI,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }
    ).then(async (resp) => {
        const data = await resp.json();
        if (data.authenticationSuccess) {
            sessionStorage.setItem('token', JSON.stringify(data.token));
            sessionStorage.setItem('uid', JSON.stringify(data.id));
        }
        return data
    });
}

export async function register(payload) {
    let loginAPI = API + 'auth/register';
    return fetch(
        loginAPI,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(async (resp) => {
        if (resp.status != 200) {
            return resp;
        }
        const data = await resp.json();
        if (data.registrationSuccess) {
            sessionStorage.setItem('token', JSON.stringify(data.token));
            sessionStorage.setItem('uid', JSON.stringify(data.user._id));
        }
        return data;
    });
}