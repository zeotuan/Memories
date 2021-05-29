export interface Post{
    _id:string;
    title:string;
    message:string;
    creatorName:string;
    creator:string;
    tags:Array<string>;
    file:any;
    likes:Array<string>;
    createdAt:string;
}

interface BaseUser{
    name:string,
    email:string,
    _id:string
}


export interface GoogleUser extends BaseUser{
    type:"google";
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


type ObjectKeys<T> = 
  T extends object ? (keyof T)[] :
  T extends number ? [] :
  T extends Array<any> | string ? string[] :
  never;


export interface ObjectConstructor {
    keys<T>(o: T): ObjectKeys<T>
}

export type NotificationSeverity = "error" | "warning" | "info" | "success"| "";

export interface NotificationState{
    severity: NotificationSeverity;
    title:string;
    message:string;
    visibility:boolean 
}