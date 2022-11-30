export interface Product {
    id?: string,
    title: string,
    status?: boolean,
    price?: string | number,
    collections?: string[],
    tags?: string[],
    options?: string[]
    quantity: number,
    weight?: number
}

export interface Bundle {
    id: string,
    title: string,
    status: boolean,
    collections: string[],
    tags: string[],
    products: string[],
    price: number
}

export interface GiftCard {
    id: string,
    status: boolean,
    balance: number,
    value: number,
    tags: string[],
    first_name: string,
    last_name: string,
    email: string,
}

export interface Collections { 
    id: string,
    title: string,
    status: boolean,
    collections: string[],
    tags: string[],
    products: string[]
}

export interface Subscriptions {
    id: string,
    title: string,
    status: boolean,
    product_id: string,
    collections?: string[],
    tags: string[],
    options?: string[]
    email: string,
    first_name: string,
    last_name: string,
    schedule: Scheudle,
    value: string
}

export interface Scheudle {
    frequency: "MONTHLY" | "DAILY" | "ANNUALLY" | "TRIAL",
    date: string,
    trial: number
 }

export interface ProductList {
    size: number,
    list: Product[]
}