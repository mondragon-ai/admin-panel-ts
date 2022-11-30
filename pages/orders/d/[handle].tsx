import { FunctionComponent } from "react";
import { Card } from "../../../components/ui/Card";
import { DetailPageHeader } from "../../../components/ui/headers/DetailPageHeader";
import { LineItem } from "../../../lib/types/orders";
import styles from "../../../styles/Main.module.css";

import * as crypto from "crypto";
import { VariantRow } from "../../../components/ui/rows/VariantRow";
import Underline from "../../../components/ui/Underline";
import Link from "next/link";
import { numberFormat } from "../../../lib/helpers/formatters";
import { ApiTimeline } from "../../../components/ui/ApiTimeline";

const date = new Date().toString(); //.substring(0,15);

const line_items: LineItem[] = [
    {
        title: "Hoodie - 1776",
        status: false,
        id: "pro_" + crypto.randomBytes(10).toString('hex'),
        url: "",
        price: 1000,
        tags: [""],
        compare_at_price: 0,
        option1: "Large",
        option2: " Black",
        option3: "",
        quantity: 1
    },
    {
        title: "Hoodie - 1776",
        status: false,
        id: "pro_" + crypto.randomBytes(10).toString('hex'),
        url: "",
        price: 1000,
        tags: [""],
        compare_at_price: 0,
        option1: "Large",
        option2: " Black",
        option3: "",
        quantity: 3
    }
]

const first_name = "Obi";
const last_name = "Kanobi";

const email = "Kanobi@gobigly.com";

const addresses = [
    {
        line1: "420 Bigly ln",
        line2: "",
        city: "Denver",
        state: "NM", 
        zip: "72704",
        country: "US",
        type: "BOTH"
    }
]

const code = "-";
const total = 3050;
const total_items = 0;
const shipping_price = 599;
const shipping_name = "Standard Shipping";
const discount_value = 0;

const payment_status = false;

export const DraftDetail: FunctionComponent = () => {
    return (
        <div className={`${styles.col}`}>
            {/* Sub Header - page specific */}
            <DetailPageHeader 
                back_route={"/draft_orders/all"}
                title={"Draft Orders"}
                special_btn={""}
                special_btn_route={"/draft_orders/all"} />
            
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
                                        <p style={{paddingTop: "0rem"}}>📋</p>
                                    </div>
                                    <h5>Addressess</h5>
                                    {
                                        addresses && addresses.map(a => {
                                            return (

                                                <div className={`${styles.row}`}>
                                                    <p style={{paddingTop: "0rem"}}>
                                                        {a.line1} <br /> 
                                                        {a.line2 ? <>a.line2 <br /></> : null} 
                                                        {a.city} <br /> 
                                                        {a.state} <br /> 
                                                        {a.country} <br /> 
                                                        {a.type} <br /> 
                                                    </p>
                                                    <p style={{paddingTop: "0rem"}}>📋</p>
                                                </div> 
                                            )
                                        })
                                    }
                                </div>
                        </Card>
                        <Card  
                            width={50}
                            title="Payment Details"
                            header={"Payment needed first."}
                            subHeader={date}
                            status={payment_status}
                            card_type="PAYMENT"
                            >
                            <div className={`${styles.col}`}>

                                <div className={`${styles.row}`}>
                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>Discount</p>
                                    </div>
                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>{code}</p>
                                    </div>
                                    <div style={{ justifyContent: "flex-end",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>{numberFormat(Number(discount_value)/100)}</p>
                                    </div>
                                </div>


                                <div className={`${styles.row}`}>
                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>Shipping</p>
                                    </div>
                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>{shipping_name}</p>
                                    </div>
                                    <div style={{ justifyContent: "flex-end",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>{numberFormat(Number(shipping_price)/100)}</p>
                                    </div>
                                </div>


                                <div className={`${styles.row}`}>
                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>Subtotal</p>
                                    </div>
                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>{total_items > 1 ? " items" : "1 item"} </p>
                                    </div>
                                    <div style={{ justifyContent: "flex-end",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>{numberFormat(Number(total)/100)}</p>
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
                                        <p>{numberFormat(Number(total)/100)}</p>
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
                            subHeader={date}
                            status={false}
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

export default DraftDetail;