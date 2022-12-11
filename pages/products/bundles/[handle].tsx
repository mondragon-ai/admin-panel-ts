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
import { ProdCollection } from "../../../lib/types/products";
import { numberFormat } from "../../../lib/helpers/formatters";
import { ParsedUrlQueryInput } from "querystring";
const client = algoliasearch('9HC6EQSC7S', 'de139a052d86174f4b708e160db11c4b');

type Bundle = {
    title: string,
    total: number,
    new_price: number,
    tags: string[],
    notes: string,
    products: {
        id: string,
        title: string,
        url: string,
        option1: string,
        option2: string,
        option3: string,
        compare_at_price: number,
        price: number,
    }[]
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
 
const s = [
    {
        required: true,
        complete: false,
        active: false,
        title: "Product",
        step: "STEP_ONE"
    },
    
]
const b = {
    title: "",
    total: 0,
    new_price: 0,
    tags: [],
    notes: "",
    products: [
        {
            id: "",
            title: "",
            url: "",
            option1: "",
            option2: "",
            option3: "",
            compare_at_price: 0,
            price: 0,
        }
    ]
}

interface Prop {
    bundles: Bundle[]
}

const BundleDetail: FunctionComponent<Prop> = ({bundles}) => {

    const [steps, setIndex] = useState(s);
    const [formStep, setFormStep] = useState("STEP_ONE")

    const [bundle, setBundle] = useState(bundles && bundles[0] ? bundles[0] : {} as Bundle);


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
    }[]>([]);

    const updateSearch = async (v: string) => {
    
        setQuery(v);
        
        // Fetch search results
        const { results } = await client.search({
            requests: [
            {
                indexName: 'prod_product_search_engine',
                // You can make typos, we handle it
                query: query,
                hitsPerPage: 50,
            },
            ],
        });
    
        if (results[0].hits) {
            setResults(results[0].hits as any);
            console.log('[Results]', results[0].hits);
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

    const addToColleciton = (product: {
        id: string,
        title: string,
        url: string,
        option1: string,
        option2: string,
        option3: string,
        compare_at_price: number,
        price: number,
    }) => {

        setBundle({
            ...bundle,
            total: product.price + bundle?.total,
            products: [...bundle.products, product]
        });

        setQuery("");
    }

    const removeFromColllection = (product: {
        id: string,
        title: string,
        url: string,
        option1: string,
        option2: string,
        option3: string,
        compare_at_price: number,
        price: number,
    }) => {

        let list = bundle.products ? bundle.products.filter(p => p.id !== product.id) : [];

        setBundle({
            ...bundle,
            total: bundle?.total - product.price,
            products: list
        });
    }

    return (
        <div className={`${styles.col}`}>
            {/* Sub Header - page specific */}
            <DetailPageHeader
                back_route={"/products/bundles"}
                title={bundle.title}
                special_btn={"Delete"}
                special_btn_route={"/products/bundles"} />
            
            {/* Main container */}
            <main className={`${styles.col} ${styles.container}`}>
                {/* <div className={`${styles.row} ${styles.mobileContainer}`}> */}

                    
            <div className={`${styles.col} ${styles.container}`}
                style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <div className={`${styles.col} ${styles.twoThird}`}>
                    <Card title={"Bundle Detail"}
                        header={""}
                        card_type={"CREATE"}
                        next={"UPDATE"}
                        prev={""}
                        resource={"/bundles/update"}
                        redirect={"/products/bundles"}
                        state={{bundle: bundle}}
                    >
                        <div className={`${styles.col}`}>
                            
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
                                            onChange={(e) => setBundle({
                                                ...bundle,
                                                title: e.target.value
                                            })}
                                            value={bundle?.title && bundle.title}
                                            type="text"
                                            name="title" />
                                        <label htmlFor="title" style={{ 
                                            top: bundle?.title &&bundle.title !== "" ? "-5px" : "", 
                                            fontSize: bundle?.title &&bundle.title !== "" ? "10px" : ""}}>Bundle Title</label>
                                    </div>
                                </div>

                                <div className={`${styles.row}`} style={{}}>
                                    <div className={`${styles.formItem} ${styles.row}`}
                                        style={{
                                            width:"100%",
                                            padding: "1rem 5px"
                                        }}>
                                        <input
                                            style={{
                                                color: "var(--accent)",
                                                width: "100%"
                                            }}
                                            onChange={(e) => setBundle({
                                                ...bundle,
                                                total: Number(e.target.value.replace("$", "").replace(".", "").replace(",", ""))
                                            })}
                                            disabled={true}
                                            value={numberFormat(Number(bundle?.total)/100)}
                                            type="text"
                                            name="price" />
                                        <label htmlFor="price" style={{ 
                                            top: bundle?.total && bundle.total > 0  ? "-5px" : "", 
                                            fontSize: bundle?.total && bundle.total > 0 ?  "10px" : ""}}>Bundle Price</label>
                                    </div>

                                    <div className={`${styles.formItem} ${styles.row}`}
                                        style={{
                                            width:"100%",
                                            padding: "1rem 5px"
                                        }}>
                                        <input
                                            style={{
                                                color: "white",
                                                width: "100%"
                                            }}
                                            onChange={(e) => setBundle({
                                                ...bundle,
                                                new_price: Number(e.target.value.replace("$", "").replace(".", "").replace(",", ""))
                                            })}
                                            value={numberFormat(Number(bundle?.new_price)/100)}
                                            type="text"
                                            name="compare_at_price" />
                                        <label htmlFor="compare_at_price" style={{ 
                                            top: bundle?.new_price && bundle.new_price > 0 ? "-5px" : "", 
                                            fontSize: bundle?.new_price && bundle.new_price > 0 ? "10px" : ""}}>Sale Price</label>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card title={"Products in Bundle"}
                        header={""}
                        card_type={"DEFAULT"}
                    >
                        <div className={`${styles.col}`} style={{position: "relative"}}>
                            <div className={`${styles.col}`} style={{background: "black"}}>
                                
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
                                    onChange={(e) => updateSearch(e.target.value)}
                                    value={query}
                                    type="text"
                                    name="query" />
                                <label htmlFor="query" style={{ 
                                    top: query !=="" ? "-5px" : "", 
                                    fontSize: query !== "" ? "10px" : ""}}>Search Products</label>
                            </div>
                            <div className={`${styles.col}`} style={{ padding: "2rem 0" }}>
                                <h5 style={{ padding: "0rem 0.5rem 0rem 0.5rem " }}>
                                    Products
                                </h5>
                                <div className={`${styles.col}`} style={{ padding: "2rem 0.5rem 0rem 0.5rem " }}>
                                    {
                                        query === "" && bundle.products ? bundle.products.map(product => {
                                            return (
                                                <div key={product.id} className={`${styles.col}`} onClick={() => removeFromColllection(product)} style={{cursor: "pointer"}}>
                                                    <Underline width={100} />
                                                    <VariantRow item={product} />
                                                </div>
                                            )
                                        }) : null
                                    }
                                    {
                                        query !== "" && hits.length > 0 ? hits.map((product) => {
                                            return (
                                                <div key={product.id} className={`${styles.col} ${styles.itemRow}`} onClick={() => addToColleciton(product)}>
                                                    <Underline width={100} />
                                                    <VariantRow item={product} />
                                                </div>
                                            );
                                        }) : null
                                    }
                                </div>
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
    const LIVE_SERVER = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/bundles";
    // const DEV_SERVER = "http://localhost:5001/impowered-funnel/us-central1/funnel/bundles";
    const {handle} = params as ParsedUrlQueryInput;
    const result = await impoweredRequest(LIVE_SERVER, "POST", {bun_uuid: handle});

    console.log(" ==> SERVER SIDE");
    console.log(result);

    if (!result) {
        throw new Error("Bundle list error");
    }

    console.log(" ==> SERVER SIDE");
    console.log(result);

    let bundles = [{}] as Bundle[];
    let size = 0;

    if (result?.result) {
        bundles = result?.result?.bundles,
        size = result?.result?.size
    }

    return {
        props: {
            size: size,
            bundles: bundles
        }
    }
}



export default BundleDetail;


