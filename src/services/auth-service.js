import { API_KEY } from './api-service-config.js'
const AUTH_URL =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

export default class apiService {

    signIn = async (credentials) => {
        const result = await fetch(AUTH_URL, {
            method: "POST",
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...credentials, returnSecureToken: true}),
        });
        if (!result.ok) {
            console.log(result);
            throw new Error(`Sign In Failed`);
        }
        return await result.json();
    }

    signUp = async (credentials) => {
        const result = await fetch(SIGNUP_URL, {
            method: "POST",
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...credentials, returnSecureToken: true}),
        });
        if (!result.ok) {
            console.log(result);
            throw new Error(`Sign Up Failed`);
        }
        return await result.json();
    }
}