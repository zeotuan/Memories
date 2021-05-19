import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if(process.env.NODE_ENV === 'dev'){
    MONGO_URI = process.env.DEV_MONGO_URI;
}else if (process.env.NODE_ENV ==='test'){
    MONGO_URI = process.env.TEST_MONGO_URI
}
const PORT = process.env.PORT || 3000;

export default {
    MONGO_URI,
    PORT
}