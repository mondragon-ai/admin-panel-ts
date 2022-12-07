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
    title: "T-Shirt",
    type_to_compare: "TAGS",
    condition: "===",
    compare_against: "",
    notes: "Nothing to see here, just new shit",
    products: [
        {
            id: "prod_" + crypto.randomBytes(10).toString('hex'),
            title: "test prod",
            url: "",
            option1: "",
            option2: "",
            option3: "",
            compare_at_price: 0,
            price: 42000,
        }
    ]
}

export const createBundle: FunctionComponent<Props> = () => {

    const [steps, setIndex] = useState(s);
    const [formStep, setFormStep] = useState("STEP_ONE")

    const [bundle, setBundle] = useState(b);


    const [query, setQuery] = useState<string>("")
    const [results, setResults] = useState<any[]>([])

    const updateSearch = async (v: string) => {
        setBundle({
            ...bundle,
            compare_against: v
        })
    
        setQuery(v);
        
        // Fetch search results
        const { results } = await client.search({
            requests: [
                {
                    indexName: 'prod_product_search_engine',
                    query: query,
                    hitsPerPage: 250,
                },
            ],
        });
    
        if (results[0].hits) {
            setResults(results[0].hits);
            console.log('[Results]', results[0].hits);
        }
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
                    <Card title={"Collection Detail"}
                        header={""}
                        card_type={"CREATE"}
                        next={"SAVE"}
                        prev={""}
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
                                        fontSize: bundle?.title &&bundle.title !== "" ? "10px" : ""}}>Collections</label>
                                </div>
                            </div>
                            <div className={`${styles.row}`}
                                style={{
                                    padding: "2rem 0"
                                }}
                            >
                                
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
                                        onChange={(e) => setBundle({
                                            ...bundle,
                                            type_to_compare: e.target.value
                                        })}
                                        disabled={true}
                                        value={bundle?.type_to_compare}
                                        type="text"
                                        name="type_to_compare" />
                                    <label htmlFor="type_to_compare" style={{ 
                                        top: bundle?.type_to_compare && bundle.type_to_compare !== "" ? "-5px" : "", 
                                        fontSize: bundle?.type_to_compare &&bundle.type_to_compare !== "" ? "10px" : ""}}>Type to Compare</label>
                                </div>
                                <div className={`${styles.formItem} ${styles.row}`}
                                    style={{
                                        width:"20%",
                                        padding: "0 5px"
                                    }}>
                                    <input
                                        style={{
                                            color: "white",
                                            width: "100%"
                                        }}
                                        onChange={(e) => setBundle({
                                            ...bundle,
                                            condition: e.target.value
                                        })}
                                        disabled={true}
                                        value={bundle?.condition}
                                        type="text"
                                        name="condition" />
                                    <label htmlFor="condition" style={{ 
                                        top: bundle?.condition && bundle.condition !== "" ? "-5px" : "", 
                                        fontSize: bundle?.condition &&bundle.condition !== "" ? "10px" : ""}}>Condition</label>
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
                                        onChange={(e) => setBundle({
                                            ...bundle,
                                            compare_against: e.target.value
                                        })}
                                        value={bundle?.compare_against}
                                        type="text"
                                        name="compare_against" />
                                    <label htmlFor="compare_against" style={{ 
                                        top: bundle?.compare_against && bundle.compare_against !== "" ? "-5px" : "", 
                                        fontSize: bundle?.compare_against &&bundle.compare_against !== "" ? "10px" : ""}}>Compare Against</label>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card title={"Products In Collection"}
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
                                                    <VariantRow item={product} />
                                                    <Underline width={100} />
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        query !== "" && results.length > 0 && results.map((product) => {
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