export interface Post{
    _id:string;
    title:string;
    message:string;
    creatorName:string;
    creator:string;
    tags:Array<string>;
    selectedFile:string;
    likes:Array<string>;
    createdAt:string;
}

interface BaseUser{
    name:string,
    email:string,
    _id:string
}


export interface GoogleUser extends BaseUser{
    imageUrl:string;
    googleId:string;

}

export interface SearchQuery{
    search:string;
    tags:string;
}

export interface Credential{
    email:string;
    password:string;
}

export interface AuthFormData{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    confirmPassword:string
}

export type User = GoogleUser;
