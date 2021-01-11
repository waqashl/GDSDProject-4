export interface ProductDetailModelResponse {
    status:        string;
    products:      ProductDetail[];
    productImages: ProductImage[];
}

export interface ProductImage {
    id:        number;
    productId: number;
    image:     string;
}

export interface ProductDetail {
    id:         number;
    title:      string;
    desc:       string;
    owner:      number;
    category:   number;
    createdAt:  Date;
    status:     number;
    price:      number;
    location:   string;
    thumbnail:  string;
    ownerName:  string;
    ownerEmail: string;
}