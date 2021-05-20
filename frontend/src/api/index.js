import axios from 'axios';

const url = 'http://localhost:3002/api/posts';

export const getPost = async () => {
    return await axios.get(url);
}

export const createPost = async (newPost) => {
    return await axios.post(url,newPost);
}

export const updatePost = async (id, post) => {
    return await axios.patch(`${url}/${id}`,post);
}