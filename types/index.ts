// Type definitions for Fruit Wholesale App

export type ProductCategory = 'Seasonal' | 'Imported' | 'Exotic';
export type ProductUnit = 'kg' | 'box';
export type OrderStatus = 'Placed' | 'Processing' | 'Delivered' | 'Cancelled';
export type PaymentMethod = 'UPI' | 'Card' | 'Cash';

export interface Product {
    id: string;
    name: string;
    category: ProductCategory;
    pricePerUnit: number;
    unit: ProductUnit;
    imageUrl: string;
    isBestSeller: boolean;
    description?: string;
    stock: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    pricePerUnit: number;
    unit: ProductUnit;
}

export interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    date: string;
    deliveryDate: string;
    notes?: string;
    paymentMethod: PaymentMethod;
}

export interface User {
    id: string;
    email: string;
    isGuest: boolean;
}

export interface Offer {
    id: string;
    title: string;
    subtitle: string;
    backgroundColor: string;
    textColor: string;
    discount?: string;
}
