import { Dispatch, FunctionComponent,  SetStateAction,  useState } from "react";
import FormProgress from "../../../components/ui/FormProgress";
import styles from "../../../styles/Main.module.css";
import * as crypto from "crypto";
import { Card } from "../../../components/ui/Card";
import Underline from "../../../components/ui/Underline";
import { VariantRow } from "../../../components/ui/rows/VariantRow";


// Instantiate the client
import { algoliasearch } from "algoliasearch";
import { DetailPageHeader } from "../../../components/ui/headers/DetailPageHeader";
import { GetServerSideProps } from "next";
import { impoweredRequest } from "../../../lib/helpers/requests";
import { ProdCollection, Subscriptions } from "../../../lib/types/products";
import { numberFormat } from "../../../lib/helpers/formatters";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
const client = algoliasearch('9HC6EQSC7S', 'de139a052d86174f4b708e160db11c4b');

const s = [
    {
        required: true,
        complete: false,
        active: false,
        title: "Product",
        step: "STEP_ONE"
    },
    
]
// const subscriptions: Subscriptions[] = [
//     {
//         order_name: "#SH-92834592454",
//         status: true,
//         customer: {
//             cus_uuid: "",
//             email: "allMight@gobigly.com",
//             first_name: "All",
//             last_name: "Might",
//             addresses: [
//                 {
//                     line1: "420 Bigly ln",
//                     line2: "",
//                     city: "South Park",
//                     state: "AR",
//                     zip: "72704",
//                     country: "US",
//                     type: "BOTH", 
//                     name: ""
//                 }
//             ]
//         },
//         payment_method: "STRIPE",
//         schedule: {
//             next_charge_date: new Date().toDateString(),
//             interval: "MONTHLY",
//             total_charges: 3,
//             total_value: 9000,
//         },
//         product: {
//             product_id: "pro_" + crypto.randomBytes(10).toString("hex"),
//             variant_id: "var_" + crypto.randomBytes(10).toString("hex"),
//             title: "Hoodie",
//             price: 3000,
//             options1: "",
//             options2: "",
//             options3: "",
//             url: ""
//         },
//         id: "sub_" + crypto.randomBytes(10).toString("hex"),
//         value: 3000
//     },
// ]


interface Prop {
    subscriptions: Subscriptions[]
}

const SubscriptionDetail: FunctionComponent<Prop> = ({
    subscriptions
}) => {

    const [steps, setIndex] = useState(s);
    const [formStep, setFormStep] = useState("STEP_ONE")

    const [subscription, setSubscription] = useState(subscriptions && subscriptions.length > 0 ? subscriptions[0] : {} as Subscriptions);


    const [query, setQuery] = useState<string>("")
    const [hits, setResults] = useState<{
        id: string,
        title: string,
        url: string,
        option1: string,
        option2: string,
        option3: string,
        compare_at_price: number,
        price: number,
    }[]>([])

    const updateSearch = async (v: string) => {

        // setCollection({
        //     ...collection,
        //     compare_against: v
        // })

        setQuery(v);
        
        // // Fetch search results
        // const { results } = await client.search({
        //     requests: [
        //     {
        //         indexName: 'prod_product_search_engine',
        //         // You can make typos, we handle it
        //         query: query,
        //         hitsPerPage: 50,
        //     },
        //     ],
        // });
    
        // if (results[0].hits) {
        //     setResults(results[0].hits as any);
        //     console.log('[Results]', results[0].hits);
        // }

        // let product_list: {
        //     id: string,
        //     title: string,
        //     url: string,
        //     option1: string,
        //     option2: string,
        //     option3: string,
        //     compare_at_price: number,
        //     price: number,
        // }[] = []
        

        // hits.forEach(hit => {
        //     product_list = [
        //         ...product_list,
        //         {
        //             id: hit.id,
        //             title: hit.title,
        //             url: "",
        //             option1: hit.option1,
        //             option2: hit.option2,
        //             option3: hit.option3,
        //             compare_at_price: hit.compare_at_price,
        //             price: hit.price,
        //         }
        //     ]
        // })

        // setCollection({
        //     ...collection,
        //     products: product_list
        // })
    };

    console.log(subscription)

    return (
        <div className={`${styles.col}`}>
            {/* Sub Header - page specific */}
            <DetailPageHeader
                back_route={"/products/subscriptions"}
                title={subscription?.order_number}
                special_btn={"Delete"}
                special_btn_route={"/products/subscriptions"} />
            
            {/* Main container */}
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.row} ${styles.mobileContainer}`}>

                    <div className={`${styles.col} ${styles.oneThird}`}>

                        <Card  
                            title="Customer Details"
                            header={""}
                            subHeader={""}
                            card_type="INFO"
                        >
                            <div className={`${styles.col}`}>
                                <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                    <p>{subscription?.customer?.first_name} {subscription?.customer?.last_name}</p>
                                </div>
                                <h5>Contact</h5>
                                <div style={{ paddingBottom: "1rem"}} className={`${styles.row}`}>
                                    <p style={{paddingTop: "0rem"}}>{subscription?.customer?.email}</p>
                                    <p style={{paddingTop: "0rem"}}>📋</p>
                                </div>
                                {
                                    subscription?.customer?.addresses && subscription?.customer?.addresses.map(a => {
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

                        <Card 
                            title="Payment Methods"
                            header={""}
                            subHeader={""}
                            card_type="INFO"
                        >
                            <div className={`${styles.col}`}>
                                <div className={`${styles.col}`} style={{padding: "1rem 0"}}> 
                                    {/* <h5>Shipppig Address</h5> */}
                                    <div className={`${styles.row}`}>
                                        <p style={{paddingTop: "0rem",lineHeight: "1.3rem"}}>{
                                            subscription?.payment_method == "STRIPE" ? "Stripe" : "Square"
                                        } payments</p>
                                    </div> 
                                </div>
                            </div>
                        </Card>
                        
                    </div>

                    <div className={`${styles.col} ${styles.twoThird}`} style={{paddingTop: "0"}} >


                        <Card title={"Order Schedule"}
                            header={""}
                            card_type={"DEFAULT"}
                        >
                            <div className={`${styles.col}`}>
                                
                                {window?.innerWidth > 720 ? <div className={`${styles.row}`} style={{padding: "1rem 0"}}>
                                    <div className={`${styles.col}`}>
                                        <h5>Next Charge Date</h5>
                                        <p>{subscription?.schedule?.next_charge_date}</p>
                                    </div>
                                    <div className={`${styles.col}`}>
                                        <h5>Interval</h5>
                                        <p>{subscription?.schedule?.type}</p>
                                    </div>
                                    <div className={`${styles.col}`}>
                                        <h5>Total Charges</h5>
                                        <p>{numberFormat(Number(subscription?.schedule?.total_value)/100)}</p>
                                    </div>
                                </div> : <div className={`${styles.col}`} style={{padding: "0"}}>
                                    
                                    <div className={`${styles.row}`}>
                                        <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                            <p>Next Charge Date</p>
                                        </div>
                                        <div style={{ justifyContent: "flex-end",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                            <p>{subscription?.schedule?.next_charge_date}</p>
                                        </div>
                                    </div>

                                    <div className={`${styles.row}`}>
                                        <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                            <p>Interval</p>
                                        </div>
                                        <div style={{ justifyContent: "flex-end",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                            <p>{subscription?.schedule?.type}</p>
                                        </div>
                                    </div>

                                    <div className={`${styles.row}`}>
                                        <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                            <p>Total Charges</p>
                                        </div>
                                        <div style={{ justifyContent: "flex-end",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>{numberFormat(Number(subscription?.schedule?.total_value)/100)}</p>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </Card>

                        <Card title={"Products in Subscription"}
                            header={""}
                            card_type={"DEFAULT"}
                            >
                            <div className={`${styles.col}`} style={{position: "relative"}}>
                                <div className={`${styles.col}`} style={{ padding: "1rem 0" }}>
                                    <div className={`${styles.col}`} style={{ padding: "0em 0.5rem 0rem 0.5rem " }}>
                                        <div className={`${styles.col}`}>
                                            <VariantRow item={subscription.product} />
                                            <Underline width={100} />
                                        </div>
                                        {/* {
                                            query !== "" && hits.length > 0 && hits.map((product) => {
                                                return (
                                                    <div key={product.id} className={`${styles.col} ${styles.itemRow}`} onClick={() => setCollection({...collection, products: [...collection.products, product]})}>
                                                        <Underline width={100} />
                                                        <VariantRow item={product} />
                                                    </div>
                                                );
                                            })
                                        } */}
                                    </div>
                                </div>

                                <div style={{paddingTop: "4rem"}}className={`${styles.row}`}>
                                    <Link href={`/orders/${subscription?.order_number}`}><button className="altBtn">View order</button></Link>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    ) 
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { handle } = params as ParsedUrlQuery;
    // const url = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/subscriptions";
    const DEV_SERVER = "http://localhost:5001/impowered-funnel/us-central1/funnel/subscriptions";
    const result = await impoweredRequest(DEV_SERVER, "POST", {sub_uuid: handle});

    console.log(" ==> SERVER SIDE");
    console.log(result);

    if (!result) {
        throw new Error("Product list error");
    }

    console.log(" ==> SERVER SIDE");
    console.log(result);

    let subscriptions = [{}] as Subscriptions[];
    let size = 0;

    if (result?.result) {
        subscriptions = result?.result?.subscriptions,
        size = result?.result?.size
    }

    return {
        props: {
            size: size,
            subscriptions: subscriptions
        }
    }
}




export default SubscriptionDetail;


