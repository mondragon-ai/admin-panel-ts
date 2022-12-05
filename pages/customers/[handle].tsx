// import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { Card } from "../../components/ui/Card";
import { DetailPageHeader } from "../../components/ui/headers/DetailPageHeader";
import styles from "../../styles/Main.module.css";
import * as crypto from "crypto";
import * as admin from "firebase-admin";
import { ApiTimeline } from "../../components/ui/ApiTimeline";
import { VariantRow } from "../../components/ui/rows/VariantRow";
import { LineItem } from "../../lib/types/orders";
import Underline from "../../components/ui/Underline";
import { numberFormat } from "../../lib/helpers/formatters";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps } from "next";
import { impoweredRequest } from "../../lib/helpers/requests";
import { Customer } from "../../lib/types/customers";

// Dummy Data
const customer = {
    tags: ["VIP"],
    id: "cus_" + crypto.randomBytes(10).toString("hex"),
    first_name: "Obi",
    last_name: "Kanobi",
    email: "Kanobi@gobigly.com",
    addresses: [
        {
            type: "BOTH",
            line1: "420 Bigly",
            line2: "",
            city: "South Park",
            state: "NM",
            zip: "72704",
            country: "US",
            name: "Obi Kanobi"
        }
    ],
    last_order: {
        id: "ord_" + crypto.randomBytes(10).toString("hex"),
        line_items: [
            {
                title: "Hoodie 1776",
                price: 8984,
                compare_at_price: 0,
                quantity: 3,
                option1: "Small",
                option2: "Blue",
                option3: "",
                id: "var_" + crypto.randomBytes(10).toString("hex"),

            }
        ],
        total_price: 3000,
        order_number: "#SH-" + crypto.randomBytes(5).toString("hex").toUpperCase(),
    },
    notes: "API TL ALT ++ CS ",
    total_orders: 3,
    total_spent: 42069,
}

const api_timeline: {
    date: string,
    content: string
}[] = [
    {
        date: new Date().toString().substring(0, 15),
        content: "Customer created"
    }
]

const name = "Obi Kanobi";



export interface CustomerDetailProps {
    c: Customer
} 


export const CustomerDetail: FunctionComponent<CustomerDetailProps> = (props) => {

    const [c, setCustomer] = useState(props.c);
    const [tag, setTag] = useState("");
    const [notes, setNotes] = useState(customer.notes);

    const {
        first_name,
        last_name,
        email,
        addresses,
        last_order,
        total_orders,
        total_spent
    } = c;

    const date = new Date().toLocaleString()

    const AOV_CALC = (total_spent ? total_spent : 0) / (total_orders ? total_orders : 1);
  
    return (
        <div className={`${styles.col}`}>
        {/* Sub Header - page specific */}
            <DetailPageHeader 
            back_route={"/customers/all"}
            title={name}
            special_btn={"Delete Product"}
            special_btn_route={"/products/all"} />

            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.row} ${styles.mobileContainer}`}>
                    <div className={`${styles.col} ${styles.oneThird}`}>

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
                                                                {a.type} <br /> 
                                                            </p>
                                                            <p style={{paddingTop: "0rem"}}>📋</p>
                                                        </div> 
                                                        <h5 style={{marginTop: "1.2rem"}}>Billing Address</h5>
                                                        <div className={`${styles.row}`}>
                                                            <p style={{paddingTop: "0rem",lineHeight: "1.3rem"}}>
                                                                {a.line1} <br /> 
                                                                {a.line2 ? <>{a.line2} <br /></> : null} 
                                                                {a.city} <br /> 
                                                                {a.state} <br /> 
                                                                {a.country} <br /> 
                                                                {a.type} <br /> 
                                                            </p>
                                                            <p style={{paddingTop: "0rem"}}>📋</p>
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
                                                                {a.type} <br /> 
                                                            </p>
                                                            <p style={{paddingTop: "0rem"}}>📋</p>
                                                        </div> 
                                                    </div>
                                                )
                                            }

                                            if (a.type == "BILLING") {
                                                return (
                                                    <div className={`${styles.col}`} style={{marginTop: "1.2rem"}}>
                                                        <h5>Shipppig Address</h5>
                                                        <div className={`${styles.row}`}>
                                                            <p style={{paddingTop: "0rem",lineHeight: "1.3rem"}}>
                                                                {a.line1} <br /> 
                                                                {a.line2 ? <>{a.line2} <br /></> : null} 
                                                                {a.city} <br /> 
                                                                {a.state} <br /> 
                                                                {a.country} <br /> 
                                                                {a.type} <br /> 
                                                            </p>
                                                            <p style={{paddingTop: "0rem"}}>📋</p>
                                                        </div> 
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                        </Card>

                        <Card card_type="INFO"
                            title="Tags & Notes"
                            header={""}>
                            <div className={`${styles.col}`}>
                                <div className={`${styles.col}`}>
                                    <div className={`${styles.formItem} ${styles.row}`}
                                        style={{
                                            width:  "100%",
                                            padding: "0px"
                                        }}>
                                        <input
                                            style={{
                                                color: "white"
                                            }}
                                            onChange={(e) => setTag(e.target.value)}
                                            value={tag}
                                            type="text"
                                            name="tags" />
                                        <label style={{ 
                                            top: tag !== "" ? "-5px" : "", 
                                            fontSize: tag !== "" ? "10px" : ""}}>Tags</label>
                                    </div>
                                    
                                    <div className={`${styles.row}`}>
                                        <div className={`${styles.formItem} ${styles.row}`}
                                            style={{
                                                width: window.innerWidth > 720 ? "33%" : "100%",
                                                padding: "0 5px"
                                            }}>
                                            { 
                                                customer && customer.tags.length > 0 ?  customer.tags.map(v => {
                                                return <p 
                                                    key={v}
                                                    id={"tags"}
                                                    // onClick={(e) => deleteTag(e, v, setProduct, setTagState, product, tagText)}
                                                    className={`${styles.tagItem}`}>{v} <b>x</b> </p> 
                                                }) : null
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.col}`}
                                    style={{
                                        width:  "100%",
                                        padding: "1rem 0"
                                    }}>
                                    <div className={`${styles.formItem} ${styles.row}`}>
                                        <textarea
                                            style={{
                                                color: "white",
                                                width: "100%",
                                                height: 300,
                                                borderRadius: "6px",
                                                background: "transparent",
                                                padding: "0.8rem 0.8rem"
                                            }}
                                            onChange={(e) => setNotes(e.target.value)}
                                            value={notes}
                                            name="notes" />
                                        <label style={{ 
                                            top: true ? "-5px" : "", 
                                            fontSize: true ? "10px" : ""}}>Notes</label>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className={`${styles.col} ${styles.twoThird}`}
                        style={{padding: 0}}>

                        <Card card_type="INFO"
                            title=""
                            header={""}>
                            <div className={`${styles.col}`}>
                                <div className={`${styles.row} ${styles.mobileContainer}`}>
                                    <div className={`${styles.col}`} style={{alignItems: "center"}}>
                                        <h5>Amount</h5>
                                        <h2>{numberFormat(Number(total_spent ? total_spent/100 : 0))}</h2>
                                    </div>  
                                    <div className={`${styles.col}`} style={{
                                        alignItems: "center",
                                        margin:  window.innerWidth > 720 ? "" : "1rem 0",
                                        borderRight: window.innerWidth > 720 ? "1px solid white" : "",
                                        borderLeft:  window.innerWidth > 720 ? "1px solid white" : ""}}>
                                        <h5>Orders</h5>
                                        <h2>{Number(total_orders ? total_orders : 0)}</h2>
                                    </div>  
                                    <div className={`${styles.col}`} style={{alignItems: "center"}}>
                                        <h5>Average Order Value</h5>
                                        <h2>{numberFormat(Number(AOV_CALC/100))}</h2>
                                    </div>  
                                </div>  
                            </div>
                        </Card>


                            <Card card_type="INFO"
                                title="Last Order Placed"
                                header={""}>
                                <div className={`${styles.col}`}>
                                    <div className={`${styles.col}`}>
                                        <div className={`${styles.row} ${styles.mobileContainer} `} style={{justifyContent: "space-between", alignItems: "center"}}>
                                            <div className={`${styles.row}  ${styles.mobileContainer}`} style={{justifyContent: "flex-start", alignItems: window?.innerWidth > 720 ? "center" : "flex-start"}}>
                                                <h4>{last_order?.order_number ? last_order?.order_number : ""}</h4>
                                                <p className={`${styles.tag}`}
                                                    style={{margin:  window?.innerWidth > 720 ? "0 0.5rem" : "0.5rem 0"}}>{"Paid 💰"}</p>
                                                <p className={`${styles.tag}`}>{"Unfulfilled 📦"}</p>
                                            </div>
                                            {window.innerWidth > 720 ? null : <div className={`${styles.row}`} style={{justifyContent: "flex-start", alignItems: "center"}}>
                                                    <span>{date}</span>
                                                </div>}
                                            <div className={`${styles.row}`} style={{justifyContent: "flex-end"}}>
                                                <h2>{numberFormat(Number(last_order?.total_price  ? last_order?.total_price : 0)/100)}</h2>
                                            </div>
                                        </div>  
                                       {window.innerWidth > 720 ? <div className={`${styles.row}`} style={{justifyContent: "flex-start", alignItems: "center"}}>
                                            <span>{date}</span>
                                        </div> : null}
                                        {
                                            last_order?.line_items && last_order?.line_items.map(item => {
                                                return (
                                                    <div key={item.id} className={`${styles.col}`} style={{marginTop: "3rem"}}>
                                                        <Underline width={100} />
                                                        <VariantRow item={item as LineItem} />
                                                        <Underline width={100} />
                                                    </div>
                                                )
                                            })
                                        } 
                                        <div className={`${styles.row}`} style={{justifyContent: "flex-start", alignItems: "center", marginTop: "4rem"}}>
                                            <button>Create Order</button>
                                            <p className={`${styles.links}`} style={{marginLeft: "1rem", padding: "0"}}>View all orders</p>
                                        </div> 
                                    </div>  
                                </div>
                            </Card>

                            <ApiTimeline comments={api_timeline} />

                        {/* <InstantSearch searchClient={client} indexName="instant_search">
                        <SearchBox />
                        </InstantSearch> */}
                    </div>
                </div>
            </main>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { handle } = params as ParsedUrlQuery;
    const dev_server = "http://127.0.0.1:5001/impowered-funnel/us-central1/funnel"
    // const url = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/customers";
    const result = await impoweredRequest(dev_server + "/customers", "POST", {cus_uuid: handle});

    console.log(" ==> SERVER SIDE");
    console.log(handle);
    console.log(result);

    if (!result) {
        throw new Error("Product list error");
    }

    console.log(" ==> SERVER SIDE");
    console.log(result);

    let customers = [{}] as Customer[];
    let size = 0;

    if (result?.result) {
        customers = result?.result?.customers,
        size = result?.result?.size
    }

    console.log(customers);
    console.log(size);
    return {
        props: {
            c: customer
        }
    }
}

export default CustomerDetail;