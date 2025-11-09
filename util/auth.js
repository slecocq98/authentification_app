import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.firebaseApiKey;

async function authenticate(email, password, mode) {
    console.log(API_KEY);
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true
    });
    console.log(response.data);
    const token = response.data.idToken;
    return token;
}
async function createUser(email, password) {
    console.log('Creating user...');
    console.log(email, password);
    return authenticate(email, password, 'signUp');

}
async function login(email, password) {
    return authenticate(email, password, 'signInWithPassword');

}
export { createUser, login };