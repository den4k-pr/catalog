

export interface Product {
    _id: string,
    quantity: number,
    name: string;
    description: string;
    price: number;
    sale: boolean;
    slug: string;
    category: string;
    categorySlug: string;
    images: string[];
}

export interface ProductAdmin {
    _id?: string,
    name: string;
    description: string;
    price: number;
    sale: boolean;
    slug: string;
    category: string;
    categorySlug: string;
    images: string[];
}
