import { API } from "../constants";

export function getUserDetail(id) {
    let detailAPI = API + 'api/users/' + id;
    return fetch(
        detailAPI,
        { method: 'GET' }
    ).then(async (resp) => {
        const data = await resp.json();
        return data;
    })
}

export function updateUserDetail(id, payload) {
    let detailAPI = API + 'api/users/' + id;
    console.log(payload.type);
    return fetch(
        detailAPI,
        { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        }
    ).then(async (resp) => {
        if (resp.status == 400) {
            return {
                updated: false,
            }
        }
        const data = await resp.json();
        return {
            updated: true,
            body: data
        }
    })
}