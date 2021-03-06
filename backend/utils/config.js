import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if(process.env.NODE_ENV === 'dev'){
    MONGO_URI = process.env.DEV_MONGO_URI;
}else if (process.env.NODE_ENV ==='test'){
    MONGO_URI = process.env.TEST_MONGO_URI
}
const PORT = process.env.PORT || 3002;
const JWT_SECRET = process.env.JWT_SECRET;
const saltRound = parseInt(process.env.saltRound);
const dbName = process.env.dbName || '';
const photoCollectionName = process.env.photoCollectionName;
const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret || '';
const email = process.env.email || ' ';
const emailPassword = process.env.emailPassword || ' ';
const host = process.env.host || 'http://localhost:';
export default {
    MONGO_URI,
    PORT,
    JWT_SECRET,
    saltRound,
    dbName,
    photoCollectionName,
    clientId,
    clientSecret,
    email,
    emailPassword,
    host
}