import axios from 'axios';

const url = 'http://localhost:3002/api/auth';

export const login = async () => {
    return await axios.post(`${url}`);
}
