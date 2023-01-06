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
import { CustomSelect } from "../../../components/ui/FormElements";



// Instantiate the client
import { algoliasearch } from "algoliasearch";
const client = algoliasearch('9HC6EQSC7S', 'de139a052d86174f4b708e160db11c4b');


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

const f = {
    title: "",
    steps: [],
    id: "",
} as any


export const FunnelCreate: FunctionComponent<any> = () => {

    const [funnel, setFunnel] = useState(f as Funnel);

    const {
        title,
        steps,
        id
    } = funnel

    let funnel_steps = steps && steps.length > 0 ? steps : [];

    const [currStep, setCurrStep] = useState<string>(funnel_steps && funnel_steps[0] ? (funnel_steps[0].name + "_" + funnel_steps[0].order) : "");

    const options: any[] = [
        { value: '', label: 'SELECT OPTION' },
        { value: 'OPT_IN', label: 'Opt In' },
        { value: 'UPSELL', label: 'Upsell' },
        { value: 'DOWNSELL', label: 'Down Sell' },
        { value: 'CONFIRMED', label: 'Confirmed' },
    ];

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let curr = 0;
        let new_steps = funnel_steps && funnel_steps.length > 0 ? funnel_steps.map((s,i) => {
            if (i === steps.length - 1) {
                curr = i + 1
                return s
            }
            return s
        }) : [];

        new_steps = [
            ...new_steps,
            {
                products: [],
                name: "" + event.target.value as  "" | "OPT_IN" | "UPSELL" | "DOWNSELL" | "VIDEO" | "CONFIRMATION",
                order: (curr ? curr + 1 : 1)
            }
        ]

        setFunnel({
            ...funnel,
            steps: new_steps
        });

        setCurrStep("" + event.target.value + "_" + (curr))

    };

    const [query, setQuery] = useState("");

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

    // const search = async (e: any) => {


    //     // setQuery(v);
    //     const key = e.key;

    //     if (key === "Enter") {
    //         switch (e.target?.id) {
    //             case "query":// Fetch search results
    //                 setSearch(true)
    //                 const { results } = await client.search({
    //                     requests: [
    //                     {
    //                         indexName: 'prod_product_search_engine',
    //                         query: collection?.compare_against,
    //                         hitsPerPage: 50,
    //                     },
    //                     ],
    //                 });
                
    //                 if (results[0].hits) {
    //                     setResults(results[0].hits as any);
    //                 }
            
    //                 let product_list: {
    //                     id: string,
    //                     title: string,
    //                     url: string,
    //                     option1: string,
    //                     option2: string,
    //                     option3: string,
    //                     compare_at_price: number,
    //                     price: number,
    //                 }[] = []
                    
            
    //                 hits.forEach(hit => {
    //                     product_list = [
    //                         ...product_list,
    //                         {
    //                             id: hit.id,
    //                             title: hit.title,
    //                             url: "",
    //                             option1: hit.option1,
    //                             option2: hit.option2,
    //                             option3: hit.option3,
    //                             compare_at_price: hit.compare_at_price,
    //                             price: hit.price,
    //                         }
    //                     ]
    //                 })
    //                 console.log('[Results]', hits);
            
    //                 setCollection({
    //                     ...collection,
    //                     products: product_list
    //                 });
    //         }
    //     }
        
        
        
    // };

    console.log(funnel);

    const updateSearch = async (
        v: string,
        step?: {
            name: string,
            order: number,
            products?: {
                id: string,
                title: string,
                url: string,
                option1: string,
                option2: string,
                option3: string,
                compare_at_price: number,
                price: number,
            }
        }
    ) => {

        setQuery(v)

        const { results } = await client.search({
            requests: [
            {
                indexName: 'prod_product_search_engine',
                query: v,
                hitsPerPage: 50,
            },
            ],
        });
    
        if (results[0].hits) {
            setResults(results[0].hits as any);
        }

        let product_list: {
            id: string,
            title: string,
            url: string,
            option1: string,
            option2: string,
            option3: string,
            compare_at_price: number,
            price: number,
        }[] = []
        
        hits.forEach(hit => {
            product_list = [
                ...product_list,
                {
                    id: hit.id,
                    title: hit.title,
                    url: "",
                    option1: hit.option1,
                    option2: hit.option2,
                    option3: hit.option3,
                    compare_at_price: hit.compare_at_price,
                    price: hit.price,
                }
            ]
        })
        
    };

    const setProduct = (
        product: {
            id: string;
            title: string;
            url: string;
            option1: string;
            option2: string;
            option3: string;
            compare_at_price: number;
            price: number;
        }[],
        step: {
            name: string,
            order: number,
            products: any[],
        }
    ) => {

        let new_steps = steps && steps.length > 0 ? steps.map(s => {
            if (currStep == step.name + "_" + step.order) {
                return {
                    ...s,
                    products: [...s.products, product]
                }
            } else {
                return s
            }
        }) : [];


        setFunnel({
            ...funnel,
            steps: new_steps as any
        });

        setResults([]);

        setQuery('')
    }


    console.log('[FUNNEL]');
    console.log(funnel);

    console.log('[HITS]');
    console.log(hits);

    console.log('[QUERY]');
    console.log(query);


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
                            next={"SAVE"}
                            prev={""}
                            resource={"/funnels/create"}
                            redirect={"/themes/funnels/all"}
                            state={funnel}
                            request_key={"funnel"}
                            card_type="CREATE"
                        >
                            <div className={`${styles.col}`}>

                                <div className={`${styles.formItem} ${styles.row}`}
                                    style={{
                                        width:"100%",
                                        padding: "0rem 0px",
                                        margin: "1rem 0"
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
                                        value={title ? title : ""}
                                        type="text"
                                        name="title" />
                                    <label htmlFor="title" style={{ 
                                        top: funnel?.title && funnel.title !== "" ? "-5px" : "", 
                                        fontSize: funnel?.title &&funnel.title !== "" ? "10px" : ""}}>Funnel Title</label>
                                </div>
                                <div style={{ paddingBottom: "1rem"}} className={`${styles.row} ${styles.formItem}`}>
                                    <p>#{id}</p>
                                    <p>📋</p>
                                </div> 

                                {currStep}

                                <div style={{ paddingTop: "1rem"}} className={`${styles.col}`}>
                                    <div style={{ paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <h5>Step Name</h5>
                                        <h5>Order</h5>
                                    </div>
                                </div>

                                <div className={`${styles.formItem} ${styles.col}`}>
                                    <CustomSelect options={options} onChange={handleChange} />
                                </div>



                                {
                                    funnel_steps && funnel_steps.map(step => {
                                        return (
                                            <div key={step.name + "_" + step.order} style={{ paddingTop: "1rem"}} className={`${styles.col}`} onClick={(e) => setCurrStep(step.name + "_" + step.order)}>
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
                    <div style={{paddingTop: "0"}} className={`${styles.twoThird} ${styles.col}`}>
                        {
                            funnel_steps && funnel_steps[0] ? funnel_steps.map(step => {
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
                                                    next={"FUNNEL"}
                                                    prev={""}
                                                    card_type="CREATE"
                                                >
                                                    <div  className={`${styles.col}`}>


                                                        <div className={`${styles.formItem} ${styles.row}`}
                                                            style={{
                                                                width:"100%",
                                                                padding: "0rem 0px",
                                                                margin: "1rem 0"
                                                            }}>
                                                            <input
                                                                style={{
                                                                    color: "white",
                                                                    width: "100%"
                                                                }}
                                                                onChange={(e) => updateSearch(e.target.value)}
                                                                value={query}
                                                                type="text"
                                                                name="title" />
                                                            <label htmlFor="title" style={{ 
                                                                top: funnel?.title && funnel.title !== "" ? "-5px" : "", 
                                                                fontSize: funnel?.title &&funnel.title !== "" ? "10px" : ""}}>Pick Product</label>
                                                        </div>
                                                        <div  className={`${styles.col}`}>
                                                            {
                                                                hits && hits.length > 0 ? <>

                                                                    <h3 style={{padding: "2rem 0"}}>Products</h3>
                                                                    {
                                                                        hits.map(product => {
                                                                            return (
                                                                                <div key={product.id}  className={`${styles.col}`} onClick={() => setProduct(product as any, step)}>
                                                                                    <Underline width={100} />
                                                                                    <VariantRow item={product} />
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </> : null
                                                            }
                                                        </div>
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
                                                                            type="text"
                                                                            name="title" />
                                                                        <label htmlFor="title" style={{ 
                                                                            top: funnel?.title && funnel.title !== "" ? "-5px" : "", 
                                                                            fontSize: funnel?.title &&funnel.title !== "" ? "10px" : ""}}>Redirect Url - Success</label>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                        <div  className={`${styles.col}`} style={{paddingTop: "5rem"}}>
                                                            <button onClick={() => setCurrStep("")}>Set Step</button>
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
                                                    next={"UPDATE"}
                                                    prev={""}
                                                    card_type="CREATE"
                                                >
                                                    <div  className={`${styles.col}`}>

                                                        <div className={`${styles.formItem} ${styles.row}`}
                                                            style={{
                                                                width:"100%",
                                                                padding: "0rem 0px",
                                                                margin: "1rem 0"
                                                            }}>
                                                            <input
                                                                style={{
                                                                    color: "white",
                                                                    width: "100%"
                                                                }}
                                                                onChange={(e) => updateSearch(e.target.value)}
                                                                value={query}
                                                                type="text"
                                                                name="title" />
                                                            <label htmlFor="title" style={{ 
                                                                top: funnel?.title && funnel.title !== "" ? "-5px" : "", 
                                                                fontSize: funnel?.title &&funnel.title !== "" ? "10px" : ""}}>Pick Product</label>
                                                        </div>
                                                        <div  className={`${styles.col}`}>
                                                            {
                                                                hits && hits.length > 0 ? <>

                                                                    <h3 style={{padding: "2rem 0"}}>Products</h3>
                                                                    {
                                                                        hits.map(product => {
                                                                            return (
                                                                                <div key={product.id}  className={`${styles.col}`} onClick={() => setProduct(product as any, step)}>
                                                                                    <Underline width={100} />
                                                                                    <VariantRow item={product} />
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </> : null
                                                            }
                                                        </div>
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
                                                                            type="text"
                                                                            name="title" />
                                                                        <label htmlFor="title" style={{ 
                                                                            top: funnel?.title && funnel.title !== "" ? "-5px" : "", 
                                                                            fontSize: funnel?.title &&funnel.title !== "" ? "10px" : ""}}>Redirect Url - Decline</label>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                        <div  className={`${styles.col}`} style={{paddingTop: "5rem"}}>
                                                            <button onClick={(e) => setCurrStep("")}>Set Step</button>
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

export default FunnelCreate;