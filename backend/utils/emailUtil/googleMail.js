import {google} from 'googleapis';
import config from '../config.js';
// might need for api oauth flow
const defaultScope  = [
    'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
]

function createConnection(){
    return new google.auth.OAuth2(
        config.clientId, config.clientSecret, 'http://localhost:3000'
    )
};

function getGooglePlusApi(auth) {
    return google.plus({ version: 'v1', auth });
  }

function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
        access_type:'offline',
        prompt:'consent',
        scope:'defaultScope'
    });
};


function urlGoogle(){
    const auth = createConnection()
    const url = getConnectionUrl(auth); 
    return url;
}