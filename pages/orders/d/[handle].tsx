import { FunctionComponent, useState } from "react";
import { Card } from "../../../components/ui/Card";
import { DetailPageHeader } from "../../../components/ui/headers/DetailPageHeader";
import { LineItem, Order } from "../../../lib/types/orders";
import styles from "../../../styles/Main.module.css";

import * as crypto from "crypto";
import { VariantRow } from "../../../components/ui/rows/VariantRow";
import Underline from "../../../components/ui/Underline";
import Link from "next/link";
import { numberFormat } from "../../../lib/helpers/formatters";
import { ApiTimeline } from "../../../components/ui/ApiTimeline";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { impoweredRequest } from "../../../lib/helpers/requests";
import { user } from "firebase-functions/v1/auth";

const date = new Date().toString(); //.substring(0,15);

// const line_items: LineItem[] = [
//     {
//         title: "Hoodie - 1776",
//         status: false,
//         id: "pro_" + crypto.randomBytes(10).toString('hex'),
//         url: "",
//         price: 1000,
//         tags: [""],
//         compare_at_price: 0,
//         option1: "Large",
//         option2: " Black",
//         option3: "",
//         quantity: 1
//     },
//     {
//         title: "Hoodie - 1776",
//         status: false,
//         id: "pro_" + crypto.randomBytes(10).toString('hex'),
//         url: "",
//         price: 1000,
//         tags: [""],
//         compare_at_price: 0,
//         option1: "Large",
//         option2: " Black",
//         option3: "",
//         quantity: 3
//     }
// ]

// const first_name = "Obi";
// const last_name = "Kanobi";

// const email = "Kanobi@gobigly.com";

// const addresses = [
//     {
//         line1: "420 Bigly ln",
//         line2: "",
//         city: "Denver",
//         state: "NM", 
//         zip: "72704",
//         country: "US",
//         type: "BOTH"
//     }
// ]

// const code = "-";
// const total = 3050;
// const total_items = 0;
// const shipping_price = 599;
// const shipping_name = "Standard Shipping";
// const discount_value = 0;

type OrderProps = {
    orders: Order[]
}

type TimeProp = {
    _seconds: number
}

export const OrderDetail: FunctionComponent<OrderProps> = ({orders}) => {



    const [order, setOrder] = useState(orders[0] ? orders[0] : {} as Order);

    const {
        transaction_id,
        payment_status,
        fullfillment_status,
        shipping_line,
        current_total_price,
        discount_code,
        email,
        addresses,
        first_name,
        last_name,
        line_items,
        order_number,
        updated_at
    } = order

    const seconds = updated_at && (updated_at as any)._seconds ?  Number((updated_at as any)._seconds )*1000: new Date().toLocaleString();
    console.log(fullfillment_status)

    const order_date = new Date((seconds)).toLocaleString();
    
    return (
        <div className={`${styles.col}`}>
            <div className={`${styles.row}`} 
                style={{height: "100%", background: "black", zIndex: 100}}></div>
            {/* Sub Header - page specific */}
            <DetailPageHeader 
                back_route={"/orders/all"}
                title={order_number ? order_number : ""}
                special_btn={"Refund"}
                special_btn_route={"/orders/refund"} />
            
            {/* Main container */}
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.row} ${styles.mobileContainer}`}>

                    {/* Left 1/3 Column Container */}
                    <div className={`${styles.oneThird}`}>

                    <Card  
                            width={50}
                            title="Customer Details"
                            header={""}
                            subHeader={""}
                            card_type="INFO"
                            >
                                <div className={`${styles.col}`}>
                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>{first_name} {last_name}</p>
                                    </div>
                                    <h5>Contact</h5>
                                    <div style={{ paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p style={{paddingTop: "0rem"}}>{email}</p>
                                        <p style={{paddingTop: "0rem"}}>????</p>
                                    </div>
                                    {
                                        addresses && addresses.map(a => {
                                            if (a.type == "BOTH") {
                                                return (
                                                    <div className={`${styles.col}`}>
                                                        <h5>Shipppig Address</h5>
                                                        <div className={`${styles.row}`}>
                                                            <p style={{paddingTop: "0rem",lineHeight: "1.3rem"}}>
                                                                {a.line1} <br /> 
                                                                {a.line2 ? <>{a.line2} <br /></> : null} 
                                                                {a.city} <br /> 
                                                                {a.state} <br /> 
                                                                {a.country} <br /> 
                                                                {/* {a.type} <br />  */}
                                                            </p>
                                                            <p style={{paddingTop: "0rem"}}>????</p>
                                                        </div> 
                                                        <h5 style={{marginTop: "1.2rem"}}>Billing Address</h5>
                                                        <div className={`${styles.row}`}>
                                                            <p style={{paddingTop: "0rem",lineHeight: "1.3rem"}}>
                                                                {a.line1} <br /> 
                                                                {a.line2 ? <>{a.line2} <br /></> : null} 
                                                                {a.city} <br /> 
                                                                {a.state} <br /> 
                                                                {a.country} <br /> 
                                                                {/* {a.type} <br />  */}
                                                            </p>
                                                            <p style={{paddingTop: "0rem"}}>????</p>
                                                        </div> 
                                                    </div>
                                                )
                                            }
                                            if (a.type == "SHIPPING") {
                                                return (
                                                    <div className={`${styles.col}`}>
                                                        <h5>Shipppig Address</h5>
                                                        <div className={`${styles.row}`}>
                                                            <p style={{paddingTop: "0rem",lineHeight: "1.3rem"}}>
                                                                {a.line1} <br /> 
                                                                {a.line2 ? <>{a.line2} <br /></> : null} 
                                                                {a.city} <br /> 
                                                                {a.state} <br /> 
                                                                {a.country} <br /> 
                                                                {/* {a.type} <br />  */}
                                                            </p>
                                                            <p style={{paddingTop: "0rem"}}>????</p>
                                                        </div> 
                                                        <h5 style={{marginTop: "1.2rem"}}>Billing Address</h5>
                                                        <div className={`${styles.row}`}>
                                                            <p style={{paddingTop: "0rem",lineHeight: "1.3rem"}}>
                                                                -
                                                            </p>
                                                        </div> 
                                                    </div>
                                                )
                                            }

                                            if (a.type == "BILLING") {
                                                return (
                                                    <div className={`${styles.col}`} style={{marginTop: "1.2rem"}}>
                                                        
                                                        <h5 style={{marginTop: "1.2rem"}}>Shipppig Address</h5>
                                                        <div className={`${styles.row}`}>
                                                            <p style={{paddingTop: "0rem",lineHeight: "1.3rem"}}>
                                                                -
                                                            </p>
                                                        </div> 
                                                        <h5>Shipppig Address</h5>
                                                        <div className={`${styles.row}`}>
                                                            <p style={{paddingTop: "0rem",lineHeight: "1.3rem"}}>
                                                                {a.line1} <br /> 
                                                                {a.line2 ? <>{a.line2} <br /></> : null} 
                                                                {a.city} <br /> 
                                                                {a.state} <br /> 
                                                                {a.country} <br /> 
                                                                {/* {a.type} <br />  */}
                                                            </p>
                                                            <p style={{paddingTop: "0rem"}}>????</p>
                                                        </div> 
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                        </Card>
                        <Card  
                            width={50}
                            title="Payment Details"
                            header={transaction_id ? transaction_id : "Payment needed first."}
                            subHeader={order_date}
                            status={transaction_id !== "" ? true : false}
                            card_type="PAYMENT"
                            >
                            <div className={`${styles.col}`}>

                                <div className={`${styles.row}`}>
                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>Discount</p>
                                    </div>
                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>{discount_code?.title ? discount_code?.title : "-"}</p>
                                    </div>
                                    <div style={{ justifyContent: "flex-end",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>{numberFormat(Number(discount_code?.value ? discount_code?.value : 0)/100)}</p>
                                    </div>
                                </div>


                                <div className={`${styles.row}`}>
                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>Shipping</p>
                                    </div>
                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>{shipping_line?.title ? shipping_line?.title : "Shipping"}</p>
                                    </div>
                                    <div style={{ justifyContent: "flex-end",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>{numberFormat(Number(shipping_line?.price ? shipping_line?.price : 0)/100)}</p>
                                    </div>
                                </div>


                                <div className={`${styles.row}`}>
                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>Subtotal</p>
                                    </div>
                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>{line_items && line_items.length > 1 ? line_items.length + " items" : "1 item"} </p>
                                    </div>
                                    <div style={{ justifyContent: "flex-end",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>{numberFormat(Number(current_total_price ? current_total_price : 0)/100)}</p>
                                    </div>
                                </div>
                                <Underline width={100} />


                                <div style={{

                                }} className={`${styles.row}`}>
                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p> <b> Total</b></p>
                                    </div>
                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>-</p>
                                    </div>
                                    <div style={{ justifyContent: "flex-end",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>{numberFormat(Number(current_total_price ? current_total_price : 0)/100)}</p>
                                    </div>
                                </div>

                                {
                                    !payment_status ? <div style={{paddingTop: "4rem"}} className={`${styles.row}`}>
                                        <Link href={"/checkout/invoice"}><button className="altBtn">Send Invoice</button></Link>
                                    </div> : null
                                }

                            </div>
                        </Card>
                    </div>

                    {/* Right 2/3 Column Container */}
                    <div style={{paddingTop: "0"}} className={`${styles.twoThird} ${styles.col}`}>
                        <Card  
                            width={50}
                            title="Order Details"
                            header={"No tracking available yet."}
                            subHeader={order_date}
                            status={!fullfillment_status?.includes("SENT") ? true : false}
                            card_type="ORDER"
                            >
                                <div  className={`${styles.col}`}>
                                    {
                                        line_items && line_items.map(item => {
                                            return (
                                                <>
                                                <div key={item.id} style={{padding: "1rem 0"}} className={`${styles.row}  ${styles.varRowContainer}` }>
                                                    <VariantRow
                                                        item={item} />
                                                </div>
                                                <Underline width={100} />
                                                </>
                                            )
                                        })
                                    }
                                    <div style={{paddingTop: "4rem"}}className={`${styles.row}`}>
                                        <Link href={"/fulfillment/create"}><button className="altBtn">Create Label</button></Link>
                                    </div>
                                </div>
                        </Card>

                        <ApiTimeline />
                    </div>

                </div>
            </main>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { handle } = params as ParsedUrlQuery;
    const dev_server = "http://127.0.0.1:5001/impowered-funnel/us-central1/funnel"
    // const url = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel";
    const result = await impoweredRequest(dev_server + "/draft_orders", "POST", {dra_uuid: handle});

    if (!result) {
        throw new Error("Product list error");
    }

    let orders = [{}] as Order[];
    let size = 0;

    if (result?.result) {
        orders = result?.result?.orders,
        size = result?.result?.size
    }

    console.log(orders);
    console.log(size);

    return {
        props: {
            orders: orders
        }
    }
}

export default OrderDetail;