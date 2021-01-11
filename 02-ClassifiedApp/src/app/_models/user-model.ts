export class User {
    id?: number;
    email?: string;
    name?: string;
    password?: string;
    token?: string;
    dob?: string;
    address?: string;
    postalCode: string;

    // to parse loginUser Response Model.
    user: User;
}