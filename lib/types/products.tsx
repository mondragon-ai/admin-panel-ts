export interface Product {
    title: string;
    price: number;
    description?: string;
    compare_at_price?: number;
    quantity: number;
    weight?: number;
    status: boolean;
    id: string;
    is_digital?: boolean;
    sell_overstock?: boolean;
    requires_shipping?: boolean;
    tags: string[],
    collections: string[],
    option1?: string,
    option2?: string,
    option3?: string,
    options: {
        options1: string[],
        options2: string[],
        options3: string[]
    },
    videos: {
        id: string,
        url: string,
        type: "YOUTUBE" | "VIMEO"
    }[],
    images: {
        id: string,
        url: string,
        alt: string
    }[],
    variants?: Variant[],
    sku?: string,
}


export interface Variant 
  {
    product_id?: string,
    variant_id?: string,
    sku?: string,
    compare_at?: number,
    price?: number,
    option1?: string,
    option2?: string,
    option3?: string,
    quantity?: number,
    status?: boolean,
    updated_at?: any,
    created_at?: any
    image_url?: string,
    inventory?: number
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

export interface ProdCollection { 
    id: string,
    title: string,
    status: boolean,
    collections: string[],
    tags: string[],
    notes: string,
    type_to_compare: string,
    compare_against: string,
    condition: string,
    products: {
        id: string,
        title: string,
        url: string,
        option1: string,
        option2: string,
        option3: string,
        compare_at_price: number,
        price: number,
    }[]
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