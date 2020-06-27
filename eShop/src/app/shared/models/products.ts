import { Category } from './category';

export interface Products{
    _id: string;
    name: string;
    price: number;
    category: Category;
    productImage: string;
}