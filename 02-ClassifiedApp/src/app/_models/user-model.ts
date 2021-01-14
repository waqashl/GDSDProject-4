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
    status: string;
    token?:string;
    user?:User;
    message: string;
}

export class UserModelResponse{
    name?:String;
    email?:String;
    userType?:number;
    id:number;
    isActive:number;
}