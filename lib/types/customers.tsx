import { LineItem } from "./orders";

export interface Customer {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    status: boolean,
    tags: string[],
    last_order: LastOrder,
    notes: string,
    total_orders: number,
    total_spent: number,
    phone?: string,
    accepts_SMS?: boolean,
    accepts_email?: boolean,
    ip_address?: string,
    ORDER_STARTED?: boolean,
    stripe?: {
        UUID: string,
        PI_UUID: string, 
        CLIENT_ID: string,
        PM: string
    },
    created_at?: FirebaseFirestore.Timestamp,
    updated_at: FirebaseFirestore.Timestamp,
    line_items?: LineItem,
    addresses: Address[],
    orders: string[],
    draft_orders: string[],
    shopify_uuid: string
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
    payment_status: boolean, 
    fulfillment_status: boolean,
}