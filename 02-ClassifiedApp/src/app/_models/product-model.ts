export interface Product {
    id: number;
    title: string;
    location: string;
    status: number;
    category: number;
    price: number;
    thumbnail: string;
}

export interface ProductModelResponse {
    status: string;
    products: Product[];
}