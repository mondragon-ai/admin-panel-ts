import { Address } from "./customers";

export type Fulfillment = {
    status: boolean,
    id: string,
    merchant_address: {
        line1: string,
        line2: string,
        city: string,
        state: string,
        zip: string,
        country: string,
        name: string,
        contact: string
    },
    label_url: string,
    updated_at: FirebaseFirestore.Timestamp;
    created_at: FirebaseFirestore.Timestamp;
    customer:{
        cus_uuid: string,
        first_name: string,
        last_name:string,
        email: string,
        addresses: Address[]
    },
    last_order: {
        order_number: string
        total_price: number
        line_items: [
            {
                url: string
                title: string
                quantity: number
                price: number,
                options1: string,
                options2: string,
                options3: string,
            }
        ]
    },
    return_address: Address,
    shipping_line: {
        provider: "USPS" | "UPS",
        rate: "STANDARD" | "INTERNATIONAL" | "EXPRESS" | "EXPRESS_I"
        packaging_type: "ENVELOPE" | "PACKAGE",
        weight: number,
        insurance: boolean
        price: number
    },
    tracking_id: string, 
}