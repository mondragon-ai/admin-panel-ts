import { Dispatch, FunctionComponent,  SetStateAction,  useState } from "react";
import FormProgress from "../../../components/ui/FormProgress";
import styles from "../../../styles/Main.module.css";
import * as crypto from "crypto";
import { Card } from "../../../components/ui/Card";
import Underline from "../../../components/ui/Underline";
import { VariantRow } from "../../../components/ui/rows/VariantRow";


// Instantiate the client
import { algoliasearch } from "algoliasearch";
const client = algoliasearch('9HC6EQSC7S', 'de139a052d86174f4b708e160db11c4b');

export type Bundle = {
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
        title: "Name & Select Prodcuts",
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


export const createBundle: FunctionComponent<Props> = () => {

    const [steps, setIndex] = useState(s);
    const [formStep, setFormStep] = useState("STEP_ONE")

    const [bundle, setBundle] = useState(b);


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

        setBundle({
            ...bundle,
            products: product_list
        })
    };

    return (
        <div className={`${styles.col}`}>
            <div className={`${styles.col} ${styles.container}`} 
                style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <FormProgress steps={steps} formStep={formStep} />
            </div>
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
                        next={"SAVE"}
                        prev={""}
                        request_key={"bundle"}
                        resource={"/bundles/create"}
                        redirect={"/products/bundles"}
                        state={bundle}
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
                                        onChange={(e) => setBundle({
                                            ...bundle,
                                            title: e.target.value
                                        })}
                                        value={bundle?.title}
                                        type="text"
                                        name="title" />
                                    <label htmlFor="title" style={{ 
                                        top: bundle?.title && bundle.title !== "" ? "-5px" : "", 
                                        fontSize: bundle?.title &&bundle.title !== "" ? "10px" : ""}}>Bundle Name</label>
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
                                        name="query" />
                                    <label htmlFor="query" style={{ 
                                        top: query !== "" ? "-5px" : "", 
                                        fontSize: query !== "" ? "10px" : ""}}>Search Products</label>
                                </div>
                            </div>
                            <div className={`${styles.col}`} style={{ padding: "2rem 0" }}>
                                <h5 style={{ padding: "0rem 0.5rem 0rem 0.5rem " }}>
                                    Products
                                </h5>
                                <div className={`${styles.col}`} style={{ padding: "2rem 0.5rem 0rem 0.5rem " }}>
                                    {
                                        query === "" && bundle.products && bundle.products.map(product => {
                                            return (
                                                <div key={product.id} className={`${styles.col}`}>
                                                    <Underline width={100} />
                                                    <VariantRow item={product} />
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        hits.length < 4 && query !== "" && hits.length > 0 && hits.map((product) => {
                                            return (
                                                <div key={product.id} className={`${styles.col} ${styles.itemRow}`} onClick={() => setBundle({...bundle, products: [...bundle.products, product]})}>
                                                    <Underline width={100} />
                                                    <VariantRow item={product} />
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    ) 
}


export default createBundle;