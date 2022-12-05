export interface Discounts {
    status: boolean, 
    title: string,
    value_type: "FIXED" | "PERCENTAGE",
    value: number,
    type: "CODE" | "AUTOMATIC",
    code: string | "",
    id: string,
    automatic_type: "BOGO" | "GOAL" | "TAGS" | "",
    requirement?: {
        customers: string[],
        products: string[],
        collections: string[],
    },
    exclude?: {
        customers: string[],
        products: string[],
        collections: string[],
    },
    include?: {
        customers: string[],
        products: string[],
        collections: string[],
    },
}
export interface DicsountCode {
    id: string,
    title: string,
    type: string,
    value_type: string,
    value: number,
  }