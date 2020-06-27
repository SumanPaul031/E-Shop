export interface Summary {
    result: Result;
}
  
export interface Result {
    last30DaysSummary: Last30DaysSummary;
    overAll: OverAll;
}
  
export interface OverAll {
    products: number;
    orders: number;
    users: number;
}
  
export interface Last30DaysSummary {
    userRegistered: number;
    sale: number;
    orders: number;
    productWise30DaysSummary: ProductWise30DaysSummary[];
}
  
export interface ProductWise30DaysSummary {
    _id: string;
    quantity: number;
    totalSale: number;
    product: Product;
}
  
export interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    productImage: string;
    __v: number;
}