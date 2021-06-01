import {API} from './index';
import {SearchQuery, Post} from '../type';
// import {PostData} from '../component/Forms/Form';
// import axios from 'axios';
const url = '/api/posts';

export const getPosts = async (page:number|null) => {
    return await API.get(`${url}?page=${page?page:'1'}`);
};

export const getPostById = async (id:string) => {
    return await API.get(`${url}/${id}`);
};

export const getPostBySearch = async (searchQuery:SearchQuery) => {
    return await API.get(`${url}/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
};

export const createPost = async (newPost:FormData) => {
    return await API.post(url,newPost);
};

export const updatePost = async (id:Post['_id'], post:FormData) => {
    return await API.patch(`${url}/${id}`,post);
};

export const deletePost = async (id:Post['_id']) => {
    return await API.delete(`${url}/${id}`);
};

export const likePost = async (id:Post['_id']) => {
    return await API.patch(`${url}/${id}/likePost`);
};