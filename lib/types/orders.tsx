import { ShippingLines } from "./addresses"
import { Address } from "./customers"
import { DicsountCode } from "./discounts"

export interface Orders {
    title: string,
    status: boolean,
    id: string,
    total_price: string,
    tags: string[],
    email: string,
    first_name: string,
    last_name: string
}    
export interface DraftOrders {
    title: string,
    status: boolean,
    id: string,
    total_price: string,
    tags: string[],
    email: string,
    first_name: string,
    last_name: string
}    


export interface Carts {
    title: string,
    status: boolean,
    id: string,
    total_price: string,
    tags: string[],
    email: string,
    first_name: string,
    last_name: string
}


export interface LineItem {
    title: string,
    status: boolean,
    id: string,
    url: string,
    price: number,
    tags: string[],
    compare_at_price: number,
    option1: string,
    option2: string,
    option3: string,
    quantity: number
}



export interface Order {
    order_name: string,
    high_risk: boolean,
    line_items: LineItem[],
    updated_at: FirebaseFirestore.Timestamp,
    created_at: FirebaseFirestore.Timestamp,
    addresses: Address[],
    id?: string,
    phone?: string,
    checkout_url?: string
    type?: "FUNNEL" | "STORE",
    isActive?: boolean,
    gateway?: "STRIPE" | "SQUARE" | "",
    used_gift_card?: boolean,
    has_discount?: boolean,
    gift_card?: string
    discount_code?: DicsountCode,
    browser_ip?: string,
    current_subtotal_price?: number, 
    current_discount_value?: number,
    current_gift_card_value?: number, 
    current_total_price: number, 
    customer_id?: string,
    email?: string,
    tags?: string[],
    note?: string,
    shipping_line?: ShippingLines,
    fullfillment_status?: "PRINTED" | "SENT" | "TRANSIT" | "HOLD" | "DELIVERED" | "LOST",
    payment_status?: "PAID" | "UNPAID",
    transaction_id: string,
    store_type?: "SHOPIFY" | "IMPOWERED" | "",
    first_name: string,
    last_name: string,
}
