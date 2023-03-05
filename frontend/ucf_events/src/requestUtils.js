import { logOut } from './Components/Home/home';

export const DEV_MODE = true;

function getToken() {
    const token = window.sessionStorage.getItem('authenticationToken');
    if (token === null) {
        logOut();
        return '';
    }
    else
        return token;
}

export async function refreshJWT() {
    const authenticationToken = window.sessionStorage.getItem('authenticationToken');
    const refreshToken = window.sessionStorage.getItem('refreshToken');
    if (authenticationToken === null || refreshToken === null) {
        logOut();
        return;
    }

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + refreshToken
        },
        body: JSON.stringify({
            authenticationToken: authenticationToken
        })
    };

    let res = await fetch(route + 'refresh', options);
    try {
        if (res.status === 200) {
            let data = await res.json();
            let newAuthenticationToken = data.authenticationToken;
            window.sessionStorage.setItem('authenticationToken', newAuthenticationToken);
            return newAuthenticationToken;
        }
        else {
            logOut();
            return '';
        }
    }
    catch (err) {
        console.log(err);
        logOut();
        return '';
    }
}

export function headers() {
    if (DEV_MODE) {
        return {
            'Content-Type': 'application/json'
        }
    }
    else {
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    }
}

export const route = DEV_MODE ? 'http://127.0.0.1:5000' : 'Don\'t know yet';