export class User {
    id?: number;
    email?: string;
    name?: string;
    userType?:number;
    isActive?:number;
}

export class UserDetails{
    token?:string;
    user?:User
}

export class UserModelResponse{
    name?:String;
    email?:String;
    userType?:number;
    id:number;
    isActive:number;

}