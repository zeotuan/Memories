import axios from 'axios';

const url = 'http://localhost:3002/api/posts';

export const getPost = async () => {
    return await axios.get(url);
}