import { LineItem } from "./orders";

export interface Customer {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    status: boolean,
    tags: string[],
    addresses: Address[],
    last_order: LastOrder,
    notes: string,
    total_orders: number,
    total_spent: number,
    
}

export type Address = {
    type: string,
    line1: string,
    line2: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    name: string
}

export type LastOrder = {
    id: string,
    line_items: LineItem[],
    total_price: number,
    order_number: string,
}