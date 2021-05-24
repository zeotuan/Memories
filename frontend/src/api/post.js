import {API} from './index';

const url = '/api/posts';

export const getPosts = async (page) => {
    return await API.get(`${url}?page=${page}`);
}

export const getPostById = async (id) => {
    return await API.get(`${url}/${id}`);
}

export const getPostBySearch = async (searchQuery) => {
    return await API.get(`${url}/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
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