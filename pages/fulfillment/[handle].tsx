import { Dispatch, FunctionComponent,  SetStateAction,  useState } from "react";
// import FormProgress from "../../components/ui/FormProgress";
import styles from "../../styles/Main.module.css";
import * as crypto from "crypto";
import { Card } from "../../components/ui/Card";
// import Underline from "../../components/ui/Underline";
// import { VariantRow } from "../../components/ui/rows/VariantRow";


// Instantiate the client
import { algoliasearch } from "algoliasearch";
import { DetailPageHeader } from "../../components/ui/headers/DetailPageHeader";
import { GetServerSideProps } from "next";
// import { impoweredRequest } from "../../lib/helpers/requests"; 
import { ApiTimeline } from "../../components/ui/ApiTimeline";
import { numberFormat } from "../../lib/helpers/formatters";
import { Fulfillment } from "../../lib/types/fulfillment";
import Underline from "../../components/ui/Underline";
import { VariantRow } from "../../components/ui/rows/VariantRow";
import { LineItem } from "../../lib/types/orders";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { impoweredRequest } from "../../lib/helpers/requests";
const client = algoliasearch('9HC6EQSC7S', 'de139a052d86174f4b708e160db11c4b');

// const f: Fulfillment = 
//     {
//         status: false,
//         id: "ful_" + crypto.randomBytes(10).toString("hex"),
//         merchant_address: {
//             line1: "420 Bigly St",
//             line2: "",
//             city: "South Park",
//             state: "NM",
//             zip: "42069",
//             country: "72704",
//             name: "Bigly",
//             contact: "thanks@gobigly.com"
//         },
//         recipient_address: {
//             line1: "420 Bigly St",
//             line2: "",
//             city: "South Park",
//             state: "NM",
//             zip: "42069",
//             country: "72704",
//             name: "obi",
//             contact: "obi@gobigly.com"
//         },
//         shipping_detail: {
//             service: "USPS",
//             type: "STANDARD",
//             packaging: "PACKAGE",
//             weight: 0.22,
//             insurance: false,
//         },
//         order_summary: {
//             order_number: "#SH-IJBH934H",
//             total_price: 6500,
//             line_items: [
//                 {
//                     url: "", 
//                     title: "Vip Product",
//                     quantity: 3,
//                     price: 3000,
//                     options1: "COLOR",
//                     options2: "SIZE",
//                     options3: "",
//                 }
//             ]
//         },
//         label_url: ""
// }
interface Prop {
    fulfillments: Fulfillment[]
}

const FulfillmentDetail: FunctionComponent<Prop> = ({
    fulfillments
}) => {
    if (!fulfillments) {
        // throw new Error("Data not fetched");        
    }

    // const [steps, setIndex] = useState(f);
    // const [formStep, setFormStep] = useState("STEP_ONE");

    const [fulfillment, setFulfillment] = useState(fulfillments && fulfillments.length > 0 ? fulfillments[0] : {} as Fulfillment);


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

    console.log(fulfillment)

    const comments = [
        {
            date: new Date().toDateString(),
            content: "Gift Card created"
        }
    ];


    const [checkboxes, setCheckboxes] = useState({
        is_digital: false,
        sell_overstock: true,
        requires_shipping: false
    })

    return (
        <div className={`${styles.col}`}>
            {/* Sub Header - page specific */}
            <DetailPageHeader
                back_route={"/fulfillment"}
                title={fulfillment?.order_summary?.order_number}
                special_btn={"Delete"}
                special_btn_route={"/products/gift_cards"} />
            
            {/* Main container */}
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.row} ${styles.mobileContainer}`}>

                    <div className={`${styles.col} ${styles.oneThird}`}>

                        
                    <Card  
                            width={50}
                            title="Shipment Details"
                            header={""}
                            subHeader={""}
                            card_type="INFO"
                            >
                                <div className={`${styles.col}`}>
                                    {
                                        fulfillment.return_address ?
                                        <div className={`${styles.col}`}>
                                            <h5>Merchant Address</h5>
                                            <div className={`${styles.row}`}>
                                                <p style={{paddingTop: "0rem",lineHeight: "1.3rem"}}>
                                                    {fulfillment.return_address.line1} <br /> 
                                                    {fulfillment.return_address.line2 ? <>{fulfillment.return_address.line2} <br /></> : null} 
                                                    {fulfillment.return_address.city} <br /> 
                                                    {fulfillment.return_address.state} <br /> 
                                                    {fulfillment.return_address.country} <br /> 
                                                    <br /> 
                                                    {fulfillment.return_address.name} <br /> 
                                                </p>
                                                <p style={{paddingTop: "0rem"}}>📋</p>
                                            </div> 
                                        </div> : null
                                    }
                                    <div className={`${styles.col}`} style={{paddingTop: "1rem"}}>
                                        <Underline width={100} />
                                    </div>
                                    {
                                        fulfillment?.customer?.addresses[0]? 
                                        <div className={`${styles.col}`} style={{paddingTop: "1rem"}}>
                                            <h5>Recipient Address</h5>
                                            <div className={`${styles.row}`}>
                                                <p style={{paddingTop: "0rem",lineHeight: "1.3rem"}}>
                                                    {fulfillment?.customer?.addresses[0]?.line1} <br /> 
                                                    {fulfillment?.customer?.addresses[0]?.line2 ? <>{fulfillment.customer?.addresses[0]?.line2} <br /></> : null} 
                                                    {fulfillment?.customer?.addresses[0]?.city} <br /> 
                                                    {fulfillment?.customer?.addresses[0]?.state} <br /> 
                                                    <br /> 
                                                    {fulfillment?.customer?.addresses[0]?.name} <br /> 
                                                </p>
                                                <p style={{paddingTop: "0rem"}}>📋</p>
                                            </div> 
                                        </div> : null
                                    }
                                </div>
                        </Card>
                        <Card  
                            width={50}
                            title="Shipping Details"
                            header={""}
                            subHeader={""}
                            card_type="INFO"
                            >
                                <div className={`${styles.col}`}>
                                    {
                                        fulfillment?.shipping_line ?
                                        <div className={`${styles.col}`}>
                                            <div className={`${styles.row}`}>
                                                <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                                    <p>Provider</p>
                                                </div>
                                                <div style={{ justifyContent: "flex-end",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                                    <p> {fulfillment.shipping_line?.provider}</p>
                                                </div>
                                            </div>

                                            <div className={`${styles.row}`}>
                                                <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                                    <p>Priority Type</p>
                                                </div>
                                                <div style={{ justifyContent: "flex-end",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                                    <p> {fulfillment?.shipping_line?.rate}</p>
                                                </div>
                                            </div>



                                            <div className={`${styles.row}`}>
                                                <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                                    <p>Packaging Type</p>
                                                </div>
                                                <div style={{ justifyContent: "flex-end",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                                    <p> {fulfillment?.shipping_line?.packaging_type}</p>
                                                </div>
                                            </div>


                                            <div className={`${styles.row}`}>
                                                <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                                    <p>Weight</p>
                                                </div>
                                                <div style={{ justifyContent: "flex-end",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                                    <p> {fulfillment?.shipping_line?.weight} Oz </p>
                                                </div>
                                            </div>
                                            

                                            <div className={`${styles.row}`} style={{ justifyContent: "flex-end", alignItems: "center",}}>
                                                <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                                    <p>Insurance</p>
                                                </div>
                                                <div style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: "1rem"}} className={`${styles.row}`}>
                                                    <div onClick={() => setCheckboxes({...checkboxes, requires_shipping: !checkboxes.requires_shipping})}
                                                        style={{
                                                            background: checkboxes.requires_shipping ? "white" : "red",
                                                            height: "15px",
                                                            width: "15px",
                                                            borderRadius: "2px",
                                                            border: checkboxes.requires_shipping ? "0.5px solid red" : "0.5px solid white"
                                                        }} id="">
                                                        <div></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> : null
                                    }
                                </div>
                        </Card>
                    
                    </div>
                    <div className={`${styles.col} ${styles.twoThird}`} style={{paddingTop: "0"}} >

                        <Card card_type="INFO"
                            title="Order Summary"
                            header={""}>
                            <div className={`${styles.col}`}>
                                <div className={`${styles.col}`}>
                                    <div className={`${styles.row} ${styles.mobileContainer} `} style={{justifyContent: "space-between", alignItems: "center"}}>
                                        <div className={`${styles.row}  ${styles.mobileContainer}`} style={{justifyContent: "flex-start", alignItems: window?.innerWidth > 720 ? "center" : "flex-start"}}>
                                            <h4>{fulfillment?.order_summary ? fulfillment?.order_summary?.order_number : ""}</h4>
                                            <p className={`${styles.tag}`}
                                                style={{
                                                    margin: window?.innerWidth > 720 ? "0 0.5rem" : "0.5rem 0",
                                                    background: "green" 
                                                }}>Paid 💰</p>
                                            <p className={`${styles.tag}`}
                                                style={{margin:  window?.innerWidth > 720 ? "0 0.5rem" : "0.5rem 0"}}>{"Unfulfilled 📦"}</p>
                                        </div>
                                        {window.innerWidth > 720 ? null : <div className={`${styles.row}`} style={{justifyContent: "flex-start", alignItems: "center"}}>
                                                <span>{new Date().toDateString()}</span>
                                            </div>}
                                        <div className={`${styles.row}`} style={{justifyContent: "flex-end"}}>
                                            <h2>{numberFormat(Number(fulfillment?.order_summary?.total_price  ? fulfillment?.order_summary?.total_price : 0)/100)}</h2>
                                        </div>
                                    </div>  
                                    {window.innerWidth > 720 ? <div className={`${styles.row}`} style={{justifyContent: "flex-start", alignItems: "center"}}>
                                        <span>{new Date().toDateString()}</span>
                                    </div> : null}
                                    {
                                        fulfillment?.order_summary?.line_items && fulfillment?.order_summary?.line_items.map(item => {
                                            return (
                                                <div key={item.title} className={`${styles.col}`} style={{marginTop: "3rem"}}>
                                                    <Underline width={100} />
                                                    <VariantRow item={item} />
                                                    <Underline width={100} />
                                                </div>
                                            )
                                        })
                                    } 
                                    <div className={`${styles.row}`} style={{justifyContent: "flex-start", alignItems: "center", marginTop: "4rem"}}>
                                        <button>View Order</button>
                                    </div> 
                                </div>  
                            </div>
                        </Card>
                        <Card card_type="DEFAULT"
                            title="Order Summary"
                            header={""}>
                            <div className={`${styles.col}`} style={{alignItems: "center"}}>
                                <div className={`${styles.col}`} style={{justifyContent: "flex-start", alignItems: "center", marginTop: "4rem"}}>
                                    <Image 
                                        style={{borderRadius: "3px", border: "1px solid black"}}
                                        src={"https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png"} 
                                        alt=""
                                        width={800}
                                        height={1000} />
                                </div> 
                                <div className={`${styles.row}`} style={{justifyContent: "flex-start", alignItems: "center", marginTop: "4rem"}}>
                                    <button>View Order</button>
                                </div> 
                            </div>
                        </Card>
                        <ApiTimeline comments={comments} />
                    </div>
                </div>
            </main>
        </div>
    ) 
}





export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { handle } = params as ParsedUrlQuery;
    const LIVE_SERVER = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/fulfillments";
    // const DEV_SERVER = "http://localhost:5001/impowered-funnel/us-central1/funnel/fulfillments";
    const result = await impoweredRequest(LIVE_SERVER, "POST", {ful_uuid: handle});

    console.log(" ==> SERVER SIDE");
    console.log(result);

    if (!result) {
        throw new Error("Product list error");
    }

    console.log(" ==> SERVER SIDE");
    console.log(result);

    let fulfillments = [{}] as Fulfillment[];
    let size = 0;

    if (result?.result) {
        fulfillments = result?.result?.fulfillments,
        size = result?.result?.size
    }

    return {
        props: {
            size: size,
            fulfillments: fulfillments
        }
    }
}

export default FulfillmentDetail;


