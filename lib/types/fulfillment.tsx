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
    recipient_address: {
        line1: string,
        line2: string,
        city: string,
        state: string,
        zip: string,
        country: string,
        name: string,
        contact: string
    },
    shipping_detail: {
        service: string,
        type: string,
        packaging: string,
        weight: number,
        insurance: boolean
    },
    order_summary: {
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
    label_url: ""
}