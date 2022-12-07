import { FunctionComponent, useState } from "react";
import { Card } from "../../../components/ui/Card";
import { DetailPageHeader } from "../../../components/ui/headers/DetailPageHeader";
import styles from "../../../styles/Main.module.css";

// import * as crypto from "crypto";
import Underline from "../../../components/ui/Underline";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { impoweredRequest } from "../../../lib/helpers/requests";
import { Funnel } from "../../../lib/types/funnels";

// const date = new Date().toString(); //.substring(0,15);

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

type FunnelProps = {
    funnels: Funnel[]
}

type TimeProp = {
    _seconds: number
}

export const FunnelDetail: FunctionComponent<FunnelProps> = ({funnels}) => {

    const [funnel, setFunnel] = useState(funnels[0] ? funnels[0] : {} as Funnel);

    const {
        title,
        steps,
        id
    } = funnel

    return (
        <div className={`${styles.col}`}>
            <div className={`${styles.row}`} 
                style={{height: "100%", background: "black", zIndex: 100}}></div>
            {/* Sub Header - page specific */}
            <DetailPageHeader 
                back_route={"/themes/funnels/all"}
                title={title}
                special_btn={"Delete"}
                special_btn_route={"/themes/funnels/all"} />
            
            {/* Main container */}
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.row} ${styles.mobileContainer}`}>

                    {/* Left 1/3 Column Container */}
                    <div className={`${styles.oneThird}`}>

                        <Card width={50}
                            title="Funnel Details"
                            header={title}
                            subHeader={""}
                            card_type="DEFAULT"
                        >
                            <div className={`${styles.col}`}>
                                {/* <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.col} ${styles.formItem}`}>
                                    <p>{id}</p>
                                </div> */}
                                <div style={{ paddingBottom: "1rem"}} className={`${styles.row} ${styles.formItem}`}>
                                    <p>#{id}</p>
                                    <p>📋</p>
                                </div> 


                                <div style={{ paddingTop: "1rem"}} className={`${styles.col}`}>
                                    <div style={{ paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <h5>Step Name</h5>
                                        <h5>Order</h5>
                                    </div>
                                </div>

                                {
                                    steps && steps.map(step => {
                                        return (
                                            <div style={{ paddingTop: "1rem"}} className={`${styles.col}`}>
                                                <Underline width={100} />   
                                                <div style={{ paddingTop: "1rem"}} className={`${styles.row}`}>
                                                    <p style={{paddingTop: "0rem"}}>{step?.name?.replaceAll("_", " ")}</p>
                                                    <p style={{paddingTop: "0rem"}}>{step?.order}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Card>
                    </div>

                    {/* Right 2/3 Column Container */}
                    <div style={{paddingTop: "0"}} className={`${styles.twoThird} ${styles.col}`}>
                        {
                            steps && steps[0] ?
                            <Card  
                                width={50}
                                title="Step Details"
                                header={""}
                                subHeader={""}
                                card_type="INFO"
                            >
                                <div  className={`${styles.col}`}>

                                </div>
                            </Card> : null
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { handle } = params as ParsedUrlQuery;
    // const dev_server = "http://127.0.0.1:5001/impowered-funnel/us-central1/funnel"
    const url = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel";
    const result = await impoweredRequest(url + "/funnels", "POST", {fun_uuid: handle});

    if (!result) {
        throw new Error("Funnel list error");
    }

    let funnels = [{}] as Funnel[];
    let size = 0;

    if (result?.result) {
        funnels = result?.result?.funnels,
        size = result?.result?.size
    }

    console.log(funnels);
    console.log(size);

    return {
        props: {
            funnels: funnels
        }
    }
}

export default FunnelDetail;