export interface CategoryModelResponse {

    status: string;
    categories?: Category[];
}


export interface Category {
    id: number;
    name: string;
    isActive: number;
}
