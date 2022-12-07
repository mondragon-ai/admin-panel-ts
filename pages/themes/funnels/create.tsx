import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { Card } from "../../../components/ui/Card";
import { DetailPageHeader } from "../../../components/ui/headers/DetailPageHeader";
// import { LineItem, Order } from "../../../lib/types/orders";
import styles from "../../../styles/Main.module.css";

import * as crypto from "crypto";
// import { VariantRow } from "../../../components/ui/rows/VariantRow";
import Underline from "../../../components/ui/Underline";
// import Link from "next/link";
// import { numberFormat } from "../../../lib/helpers/formatters";
// import { ApiTimeline } from "../../../components/ui/ApiTimeline";
// import { GetServerSideProps } from "next";
// import { ParsedUrlQuery } from "querystring";
// import { impoweredRequest } from "../../../lib/helpers/requests";
// import { user } from "firebase-functions/v1/auth";
import { Funnel } from "../../../lib/types/funnels";
import FormProgress from "../../../components/ui/FormProgress";
import { VariantRow } from "../../../components/ui/rows/VariantRow";

const date = new Date().toString(); //.substring(0,15);


// Instantiate the client
import { algoliasearch } from "algoliasearch";
const client = algoliasearch('9HC6EQSC7S', 'de139a052d86174f4b708e160db11c4b');

type Bundle = {
    title: string,
    type_to_compare: "TAGS" | "DATE" | "BEST_SELLERS" | "SOLD" | "QUANITY",
    condition: "===" | ">=" | "<=" | "!==",
    compare_against: string,
    notes: string,
    products: 
    {
        id: string,
        title: string,

    }[],
    image: {
        url: string,
        alt: string, 
        id: string
    }
}

type Props = {
    setProduct:  Dispatch<SetStateAction<Bundle>>,
    product: Bundle,
    navForm?: Dispatch<SetStateAction<string>>,
    setTags?: Dispatch<SetStateAction<string[]>>,
    setTagState?: Dispatch<SetStateAction<string>>,
    tags?: string[],
    setIndex?: Dispatch<SetStateAction<{
        required: boolean;
        complete: boolean;
        active: boolean;
        title: string;
        step: string;
    }[]>>,
    steps?: {
        required: boolean;
        complete: boolean;
        active: boolean;
        title: string;
        step: string;
    }[],
    state?: any;
    checkboxes?: any;
    setCheckboxes?: any;
}
 
const f = {
    title: "Bryce Wellness Funell",
    id: "fun_" + crypto.randomBytes(10).toString('hex'),
    steps: [
        {
            name: "OPT_IN",
            order: 1,
        },
        {
            name: "UPSELL",
            order: 2,
        },
        {
            name: "CONFIRMATION",
            order: 3,
        }
    ]
}

type FunnelProps = {
    funnels: Funnel[]
}

type TimeProp = {
    _seconds: 0
}


const s = [
    {
        required: true,
        complete: false,
        active: true,
        title: "Funnel Details",
        step: "STEP_ONE"
    },
]

export const FunnelCreate: FunctionComponent<FunnelProps> = () => {

    // Progress form state
    const [st, setIndex] = useState(s);
    const [formStep, setFormStep] = useState("STEP_ONE");
    const [funnelStep, setFunnelStep] = useState("");

    // funnel state to push to be
    const [funnel, setFunnel] = useState(f);

    // steps state, appened to funnnel
    const [steps,  setSteps] = useState(
        {
            name: "",
            order: 0
        }
    )

    // test state for query 
    const [query, setQuery] = useState<string>("");

    // Algolia Search Results
    const [results, setResults] = useState<any[]>([]);


    const updateSearch = async (v: string) => {

        console.log(v)

        setQuery(v);

        // setSteps(
        //     {
        //         ...steps,
        //         name: v
        //     }
        // );
        
        // Fetch search results
        const { results } = await client.search({
            requests: [
                {
                    indexName: 'prod_product_search_engine',
                    query: query,
                    hitsPerPage: 50,
                },
            ],
        });
    
        if (results[0].hits) {
            setResults(results[0].hits);
            console.log('[Results]', results[0].hits);
        }
    };

    let step_options: string[] = [
        "OPT_IN", "UPSELL", "DOWNSELL", "CONFIRMATION"
    ],
    searchString = steps?.name.trim().toLowerCase();


    if (searchString.length > 0) {
        step_options = step_options.filter(function(i) {
        return i.toLowerCase().match( searchString );
      });
    }


    if (searchString == "") {
        step_options = [
            "OPT_IN", "UPSELL", "DOWNSELL", "CONFIRMATION"
        ]
    }

    const addStep = (e: any) => {
        const key = e.key;

        if (key === "Enter") {
            switch (e.target?.id) {
                case "OPT_IN" : 

                    setFunnel(
                        {
                            ...funnel,
                            steps: [
                                ...funnel?.steps,
                                steps
                            ],

                        }
                    )
                default: 
            }
        }
    }

    const ket_string = "funnel";
    return (
        <div className={`${styles.col}`}>
            <div className={`${styles.col} ${styles.container}`} 
                style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <FormProgress steps={st} formStep={formStep} />
            </div>
            <div className={`${styles.col} ${styles.container}`}
                style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <div className={`${styles.col} ${styles.twoThird}`}>
                    <Card title={"Funnel Detail"}
                        header={""}
                        card_type={"CREATE"}
                        next={"SAVE"}
                        prev={""}
                        request_key={ket_string}
                        resource={"/funnels/create"}
                        redirect={"/themes/funnels/all"}
                        state={funnel}
                    >
                        <div className={`${styles.col}`}>
                            
                            <div className={`${styles.col}`}>
                                
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
                                        value={funnel?.title}
                                        type="text"
                                        name="title" />
                                    <label htmlFor="title" style={{ 
                                        top: funnel?.title && funnel.title !== "" ? "-5px" : "", 
                                        fontSize: funnel?.title &&funnel.title !== "" ? "10px" : ""}}>Funnel Title</label>
                                </div>
                            </div>
                            
                            <div className={`${styles.row}`}
                                style={{
                                    padding: "2rem 0",
                                    position: "relative"
                                }}
                            >


                                {
                                    steps?.name !== "" && steps?.name !== "OPT_IN"  ? 
                                    <div className={`${styles.formItem} ${styles.row}`}
                                        style={{
                                            width:"60%",
                                            padding: "0 5px",
                                            height: "auto",
                                            top: 100,
                                            zIndex: 100,
                                            position: "absolute"
                                        }}>
                                            <div className={`${styles.col}`}
                                                style={{
                                                    padding: "1rem 5px",
                                                    background: "black",
                                                    borderRadius: "4px",
                                                    position: "relative"
                                                }}>
                                                {
                                                    step_options.length > 0 ? 
                                                    step_options.map(step => {
                                                        return (
                                                            <div className={`${styles.col}`}>
                                                                <div className={`${styles.row}`}style={{
                                                                    padding: "1rem 5px",
                                                                    color: "var(--accent)",
                                                                    borderRadius: "4px",
                                                                    position: "relative"
                                                                }}>
                                                                    <h4 onClick={(e) => setSteps({
                                                                        ...steps,
                                                                        name: step
                                                                    })}>{step}</h4>
                                                                </div>
                                                                <Underline width={100} />
                                                            </div>
                                                        )
                                                    }) : null
                                                }
                                            </div>
                                    </div> : null 
                                }
                                
                                <div className={`${styles.formItem} ${styles.row}`}
                                    style={{
                                        width:"60%",
                                        padding: "0 5px"
                                    }}>
                                    <input
                                        style={{
                                            color: "white",
                                            width: "100%"
                                        }}
                                        onChange={(e) => setSteps(
                                            {
                                                ...steps,
                                                name: e.target.value,
                                            }
                                        )}
                                        id={"OPT_IN"}
                                        value={steps?.name}
                                        onKeyDown={(e) => addStep(e)}
                                        type="text"
                                        name="step_type" />
                                    <label htmlFor="step_type" style={{ 
                                        top: steps?.name !== "" ? "-5px" : "", 
                                        fontSize: steps?.name !== "" ? "10px" : ""}}>Step Type</label>
                                </div>

                                <div className={`${styles.formItem} ${styles.row}`}
                                    style={{
                                        width:"40%",
                                        padding: "0 5px"
                                    }}>
                                    <input
                                        style={{
                                            color: "white",
                                            width: "100%"
                                        }}
                                        onChange={(e) => setSteps({
                                            ...steps,
                                            order: Number( e.target.value)
                                        })}
                                        id={"OPT_IN"}
                                        onKeyDown={(e) => addStep(e)}
                                        value={steps?.order}
                                        type="number"
                                        name="step_name" />
                                    <label htmlFor="step_name" style={{ 
                                        top: steps?.order && steps?.order > 0 ? "-5px" : "", 
                                        fontSize: steps?.order && steps?.order > 0 ? "10px" : ""}}>Step Order</label>
                                </div>

                            </div>

                            
                            <div className={`${styles.col}`}
                                style={{
                                    padding: "2rem 0",
                                    position: "relative"
                                }}
                            >
                                <div className={`${styles.row}`}>
                                    <h5>Step Name</h5>
                                    <h5>Step Order</h5>
                                </div>

                                {
                                    funnel?.steps && funnel?.steps.length > 0 ?
                                    funnel?.steps.map(step => {
                                        return (
                                            <div className={`${styles.col}`}>
                                                <div 
                                                    onClick={(e) => setFunnelStep(step.name)}
                                                    className={`${styles.row} ${styles.links}`}
                                                    style={{padding: "1rem 0", cursor: "pointer"}}>
                                                    <p>{step.name.replaceAll("_", " ")}</p>
                                                    <p>{step.order}</p>
                                                </div>
                                                <Underline width={100} />
                                            </div>
                                        )
                                    }) : null
                                }
                            </div>

                        </div>
                    </Card>

                    {/* {
                        funnelStep === "OPT_IN" ? 
                        <Card title={"Opt In Details"}
                            header={""}
                            card_type={"DEFAULT"}
                        >
                            <div className={`${styles.col}`} style={{position: "relative"}}>
                                <div className={`${styles.col}`}>
                                    
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
                                            onChange={(e) => updateSearch(e.target.value)}
                                            value={query}
                                            type="text"
                                            name="product_query" />
                                        <label htmlFor="product_query" style={{ 
                                            top: query !== "" ? "-5px" : "", 
                                            fontSize: query !== "" ? "10px" : ""}}>Search Product / Bundles</label>
                                    </div>
                                </div>
                                <div className={`${styles.col}`}
                                    style={{
                                        padding: "2rem 0",
                                        position: "relative"
                                    }}
                                >
                                    <div className={`${styles.row}`}>
                                        <h5>Title</h5>
                                        <h5>Price</h5>
                                    </div>

                                    {   
                                        results && results.length > 0 ?
                                        results.map(product => {
                                            return (
                                                <div className={`${styles.col}`}
                                                    onClick={(e) => console.log(product)}
                                                    style={{padding: "1rem 0", cursor: "pointer"}}>
                                                    <VariantRow item={product} />
                                                    <Underline width={100} />
                                                </div>
                                            )
                                        }) : null
                                    }
                                    {  
                                        results && results.length > 0 ?
                                        results.map(product => {
                                            return (
                                                <div className={`${styles.col}`}>
                                                    <div 
                                                        onClick={(e) => console.log(product)}
                                                        className={`${styles.row}`}
                                                        style={{padding: "1rem 0", cursor: "pointer"}}>
                                                        <VariantRow item={product} />
                                                    </div>
                                                    <Underline width={100} />
                                                </div>
                                            )
                                        }) : null
                                    }
                                </div>
                            </div>
                        </Card> : null
                    } */}
                </div>
            </div>
        </div>
    ) 
}

export default FunnelCreate;