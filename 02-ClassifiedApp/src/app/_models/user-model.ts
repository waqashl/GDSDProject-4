export class User {
    id?: number;
    email?: string;
    name?: string;
    userType?:number;
    isActive?:number;
    address?: string;
    postalCode?: string;
    dob?: string;
    password?: string;
    
    user: User;
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