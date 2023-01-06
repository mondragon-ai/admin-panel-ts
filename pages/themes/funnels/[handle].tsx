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
import { VariantRow } from "../../../components/ui/rows/VariantRow";

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

    //

    const {
        title,
        steps,
        id
    } = funnel

    const [currStep, setCurrStep] = useState(steps && (steps[0].name + "_" + steps[0].order));

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
                                            <div style={{ paddingTop: "1rem"}} className={`${styles.col}`} onClick={(e) => setCurrStep(step.name + "_" + step.order)}>
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

                    {/* Card */}
                    <div style={{paddingTop: "0"}} className={`${styles.twoThird} ${styles.col}`}>
                        {
                            steps && steps[0] ? steps.map(step => {
                                if (currStep == step.name + "_" + step.order) {

                                    if ("CONFIRMATION" == step.name) {
                                        return (
                                            <div 
                                                style={{
                                                    display: ""
                                                }}
                                                key={step.name + "_" + step.order}
                                                className={`${styles.col}`}>
                                                <Card  
                                                    width={50}
                                                    title={"Step Details - " + step.name.replaceAll("_", " ").toLocaleLowerCase()}
                                                    header={""}
                                                    subHeader={""}
                                                    card_type="INFO"
                                                >
                                                    <div  className={`${styles.col}`}>

                                                        <div  className={`${styles.row}`}>
                                                        
                                                        </div>
                                                        <div  className={`${styles.row}`}>
                                                            <div  className={`${styles.col}`}>
                                                                <h3 style={{padding: "2rem 0 "}}>URLS</h3>
                                                                    <div className={`${styles.formItem} ${styles.row}`}
                                                                        style={{
                                                                            width:"100%",
                                                                            padding: "0 5px",
                                                                            paddingBottom: "2rem"
                                                                        }}>
                                                                        <input
                                                                            style={{
                                                                                color: "var(--accent)",
                                                                                width: "100%"
                                                                            }}
                                                                            disabled={true}
                                                                            value={"/" + step.name}
                                                                            type="text"
                                                                            name="title" />
                                                                        <label htmlFor="title" style={{ 
                                                                            top: funnel?.title && funnel.title !== "" ? "-5px" : "", 
                                                                            fontSize: funnel?.title &&funnel.title !== "" ? "10px" : ""}}>Current Page Url</label>
                                                                    </div>
                                                                    <div className={`${styles.formItem} ${styles.row}`}
                                                                        style={{
                                                                            width:"100%",
                                                                            padding: "0 5px"
                                                                        }}>
                                                                        <input
                                                                            style={{
                                                                                color: "white",
                                                                                width: "100%"
                                                                            }}
                                                                            onChange={(e) => setFunnel({
                                                                                ...funnel,
                                                                                title: e.target.value
                                                                            })}
                                                                            // value={"/" + ( steps ? steps.filter(s => (step.order + 1) === s.order)[0].name : "")}
                                                                            type="text"
                                                                            name="title" />
                                                                        <label htmlFor="title" style={{ 
                                                                            top: funnel?.title && funnel.title !== "" ? "-5px" : "", 
                                                                            fontSize: funnel?.title &&funnel.title !== "" ? "10px" : ""}}>Redirect Url - Success</label>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </div>
                                        )
                                    } if ("OPT_IN" == step.name) {
                                        return (
                                            <div 
                                                style={{
                                                    display: ""
                                                }}
                                                key={step.name + "_" + step.order}
                                                className={`${styles.col}`}>
                                                <Card  
                                                    width={50}
                                                    title={"Step Details - " + step.name.replaceAll("_", " ").toLocaleLowerCase()}
                                                    header={""}
                                                    subHeader={""}
                                                    card_type="INFO"
                                                >
                                                    <div  className={`${styles.col}`}>
                                                        <div  className={`${styles.col}`}>
                                                            <h3 style={{padding: "2rem 0"}}>Products</h3>
                                                            {
                                                                step.products && step.products.map(product => {
                                                                   return (
                                                                        <div key={product.variant_id}  className={`${styles.col}`}>
                                                                            <Underline width={100} />
                                                                            <VariantRow item={product} />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <div  className={`${styles.row}`}>
                                                            
                                                            <div className={`${styles.formItem} ${styles.col}`}
                                                                style={{
                                                                    width: "100%",
                                                                    padding: "2rem 0px"
                                                                }}>
                                                                <p style={{margin: "1rem 0", width: "90%"}}>Use Bump?</p>
                                                                <div className={`${styles.formItem} ${styles.row}`}
                                                                    style={{padding: 0, width: "10%"}} id="">
                                                                    <div 
                                                                        // onClick={() => setCheckboxes({...checkboxes, is_digital: !checkboxes.is_digital}) as Dispatch<any>}
                                                                        style={{
                                                                        background: true ? "white" : "red",
                                                                        height: "15px",
                                                                        width: "15px",
                                                                        borderRadius: "2px",
                                                                        border: true ? "0.5px solid red" : "0.5px solid white"
                                                                    }} id="">
                                                                        <div></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div  className={`${styles.row}`}>
                                                            <div  className={`${styles.col}`}>
                                                                <h3 style={{padding: "2rem 0 "}}>URLS</h3>
                                                                    <div className={`${styles.formItem} ${styles.row}`}
                                                                        style={{
                                                                            width:"100%",
                                                                            padding: "0 0px",
                                                                            paddingBottom: "2rem"
                                                                        }}>
                                                                        <input
                                                                            style={{
                                                                                color: "var(--accent)",
                                                                                width: "100%"
                                                                            }}
                                                                            disabled={true}
                                                                            value={"/" + step.name}
                                                                            type="text"
                                                                            name="title" />
                                                                        <label htmlFor="title" style={{ 
                                                                            top: funnel?.title && funnel.title !== "" ? "-5px" : "", 
                                                                            fontSize: funnel?.title &&funnel.title !== "" ? "10px" : ""}}>Current Page Url</label>
                                                                    </div>
                                                                    <div className={`${styles.formItem} ${styles.row}`}
                                                                        style={{
                                                                            width:"100%",
                                                                            padding: "0px"
                                                                        }}>
                                                                        <input
                                                                            style={{
                                                                                color: "white",
                                                                                width: "100%"
                                                                            }}
                                                                            onChange={(e) => setFunnel({
                                                                                ...funnel,
                                                                                title: e.target.value
                                                                            })}
                                                                            // value={"/" + ( steps ? steps.filter(s => (step.order + 1) === s.order)[0].name : "")}
                                                                            type="text"
                                                                            name="title" />
                                                                        <label htmlFor="title" style={{ 
                                                                            top: funnel?.title && funnel.title !== "" ? "-5px" : "", 
                                                                            fontSize: funnel?.title &&funnel.title !== "" ? "10px" : ""}}>Redirect Url - Success</label>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </div>
                                        )
                                    }  if ("UPSELL" == step.name) {
                                        return (
                                            <div 
                                                style={{
                                                    display: ""
                                                }}
                                                key={step.name + "_" + step.order}
                                                className={`${styles.col}`}>
                                                <Card  
                                                    width={50}
                                                    title={"Step Details - " + step.name.replaceAll("_", " ").toLocaleLowerCase()}
                                                    header={""}
                                                    subHeader={""}
                                                    card_type="INFO"
                                                >
                                                    <div  className={`${styles.col}`}>
                                                        <div  className={`${styles.col}`}>
                                                            <h3 style={{padding: "2rem 0"}}>Products</h3>
                                                            {
                                                                step.products && step.products.map(product => {
                                                                   return (
                                                                        <div key={product.variant_id}  className={`${styles.col}`}>
                                                                            <Underline width={100} />
                                                                            <VariantRow item={product} />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <div  className={`${styles.row}`}>
                                                        
                                                        </div>
                                                        <div  className={`${styles.row}`}>
                                                            <div  className={`${styles.col}`}>
                                                                <h3 style={{padding: "2rem 0 "}}>URLS</h3>
                                                                    <div className={`${styles.formItem} ${styles.row}`}
                                                                        style={{
                                                                            width:"100%",
                                                                            padding: "0 5px",
                                                                            paddingBottom: "2rem"
                                                                        }}>
                                                                        <input
                                                                            style={{
                                                                                color: "var(--accent)",
                                                                                width: "100%"
                                                                            }}
                                                                            disabled={true}
                                                                            value={"/" + step.name}
                                                                            type="text"
                                                                            name="title" />
                                                                        <label htmlFor="title" style={{ 
                                                                            top: funnel?.title && funnel.title !== "" ? "-5px" : "", 
                                                                            fontSize: funnel?.title &&funnel.title !== "" ? "10px" : ""}}>Current Page Url</label>
                                                                    </div>
                                                                    <div className={`${styles.formItem} ${styles.row}`}
                                                                        style={{
                                                                            width:"100%",
                                                                            padding: "0 5px",
                                                                            paddingBottom: "2rem"
                                                                        }}>
                                                                        <input
                                                                            style={{
                                                                                color: "white",
                                                                                width: "100%"
                                                                            }}
                                                                            // value={"/" + ( steps? steps.filter(s => (step.order + 1) === s.order)[0].name : "")}
                                                                            type="text"
                                                                            name="title" />
                                                                        <label htmlFor="title" style={{ 
                                                                            top: funnel?.title && funnel.title !== "" ? "-5px" : "", 
                                                                            fontSize: funnel?.title &&funnel.title !== "" ? "10px" : ""}}>Redirect Url - Accept</label>
                                                                    </div>
                                                                    <div className={`${styles.formItem} ${styles.row}`}
                                                                        style={{
                                                                            width:"100%",
                                                                            padding: "0 5px"
                                                                        }}>
                                                                        <input
                                                                            style={{
                                                                                color: "white",
                                                                                width: "100%"
                                                                            }}
                                                                            // value={"/" + ( steps ? steps.filter(s => (step.order + 2) === s.order || (step.order + 1) === s.order)[0].name : "")}
                                                                            type="text"
                                                                            name="title" />
                                                                        <label htmlFor="title" style={{ 
                                                                            top: funnel?.title && funnel.title !== "" ? "-5px" : "", 
                                                                            fontSize: funnel?.title &&funnel.title !== "" ? "10px" : ""}}>Redirect Url - Decline</label>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div 
                                                style={{
                                                    display: ""
                                                }}
                                                key={step.name + "_" + step.order}
                                                className={`${styles.col}`}>
                                                <Card  
                                                    width={50}
                                                    title={"Step Details - " + step.name.replaceAll("_", " ").toLocaleLowerCase()}
                                                    header={""}
                                                    subHeader={""}
                                                    card_type="INFO"
                                                >
                                                    <div  className={`${styles.col}`}>
    
                                                    </div>
                                                </Card>
                                            </div>
                                        )
                                    }
                                }
                            }) : null
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