import axios from 'axios';
import {API} from './index';

const url = '/api/posts';

export const getPost = async () => {
    return await API.get(url);
}

export const createPost = async (newPost) => {
    return await API.post(url,newPost);
}

export const updatePost = async (id, post) => {
    return await API.patch(`${url}/${id}`,post);
}

export const deletePost = async (id, post) => {
    return await API.delete(`${url}/${id}`);
}

export const likePost = async (id) => {
    return await API.patch(`${url}/${id}/likePost`);
}