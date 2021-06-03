import {OAuth2Client} from 'google-auth-library';
import config from './config.js';

const client = new OAuth2Client(config.clientId);

const verify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken:token,
        audience:config.clientId,
    })
    const payload = ticket.getPayload();
    return payload;
}

export default verify;