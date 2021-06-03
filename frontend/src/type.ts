export interface Post{
    _id:string;
    title:string;
    message:string;
    creatorName:string;
    creator:string;
    tags:Array<string>;
    file:string;
    likes:Array<string>;
    createdAt:string;
}

// export interface UserProfile{

// }

export interface BaseUser{
    name:string,
    email:string,
    _id:string,
    imageUrl:string;
}

export interface signInUser extends BaseUser{
    type:"normal";
    token:string;
}

export interface GoogleUser extends BaseUser{
    type:"google";
    googleId:string;
}

export interface SearchQuery{
    search:string;
    tags:string;
}

export interface NormalCredential{
    type:"normalSignIn";
    email:string;
    password:string;
}

export interface GoogleCredential{
    type:"googleSignIn",
    idToken:string
}

export type Credential = NormalCredential|GoogleCredential;

export interface AuthFormData{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    confirmPassword:string
}

export type User = GoogleUser|signInUser;


// type ObjectKeys<T> = 
//   T extends object ? (keyof T)[] :
//   T extends number ? [] :
//   T extends Array<any> | string ? string[] :
//   never;


// export interface ObjectConstructor {
//     keys<T>(o: T): ObjectKeys<T>
// }

export type NotificationSeverity = "error" | "warning" | "info" | "success"| "";

export interface NotificationState{
    severity: NotificationSeverity;
    title:string;
    message:string;
    visibility:boolean 
}

export interface IDecodedToken {
    name:string;
    email: string; 
    _id: string;
    exp:number;
}