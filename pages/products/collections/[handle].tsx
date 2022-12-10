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
const c = {
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

interface Prop {
    collections: ProdCollection[]
}

const CollectionDetail: FunctionComponent<Prop> = ({collections}) => {

    const [steps, setIndex] = useState(s);
    const [formStep, setFormStep] = useState("STEP_ONE")

    const [collection, setCollection] = useState(collections && collections.length > 0 ? collections[0] : {} as ProdCollection);


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

        setCollection({
            ...collection,
            compare_against: v
        })

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

    console.log(collection)

    return (
        <div className={`${styles.col}`}>
            {/* Sub Header - page specific */}
            <DetailPageHeader
                back_route={"/products/collections"}
                title={collection.title}
                special_btn={"Delete"}
                special_btn_route={"/products/collections"} />
            
            {/* Main container */}
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.row} ${styles.mobileContainer}`}>

                    <div className={`${styles.col} ${styles.oneThird}`}>
                    
                    </div>
                    <div className={`${styles.col} ${styles.twoThird}`} style={{paddingTop: "0"}} >

                        <Card title={"Collection Detail"}
                            header={""}
                            card_type={"CREATE"}
                            next={"UPDATE"}
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
                                            onChange={(e) => setCollection({
                                                ...collection,
                                                title: e.target.value
                                            })}
                                            value={collection?.title}
                                            type="text"
                                            name="title" />
                                        <label htmlFor="title" style={{ 
                                            top: collection?.title && collection.title !== "" ? "-5px" : "", 
                                            fontSize: collection?.title &&collection.title !== "" ? "10px" : ""}}>Collection Title</label>
                                    </div>
                                </div>
                                <div className={`${styles.row}  ${styles.mobileContainer}`}
                                    style={{
                                        padding: "2rem 0"
                                    }}
                                >
                                    

                                    <div className={`${styles.formItem} ${styles.row}`}>
                                        <div className={`${styles.formItem} ${styles.row}`}
                                            style={{
                                                width: window?.innerWidth > 720 ? "40%" : "60%",
                                                padding: "0 5px"
                                            }}>
                                            <input
                                                style={{
                                                    color: "white",
                                                    width: "100%"
                                                }}
                                                onChange={(e) => setCollection({
                                                    ...collection,
                                                    type_to_compare: e.target.value
                                                })}
                                                disabled={true}
                                                value={collection?.type_to_compare}
                                                type="text"
                                                name="type_to_compare" />
                                            <label htmlFor="type_to_compare" style={{ 
                                                top: collection?.type_to_compare && collection.type_to_compare !== "" ? "-5px" : "", 
                                                fontSize: collection?.type_to_compare && collection.type_to_compare !== "" ? "10px" : ""}}>Type to Compare</label>
                                        </div>
                                        <div className={`${styles.formItem} ${styles.row}`}
                                            style={{
                                                width: window?.innerWidth > 720 ? "40%" : "40%",
                                                padding: "0 5px"
                                            }}>
                                            <input
                                                style={{
                                                    color: "white",
                                                    width: "100%"
                                                }}
                                                onChange={(e) => setCollection({
                                                    ...collection,
                                                    condition: e.target.value
                                                })}
                                                disabled={true}
                                                value={collection?.condition}
                                                type="text"
                                                name="condition" />
                                            <label htmlFor="condition" style={{ 
                                                top: collection?.condition && collection.condition !== "" ? "-5px" : "", 
                                                fontSize: collection?.condition && collection.condition !== "" ? "10px" : ""}}>Condition</label>
                                        </div>

                                    </div>
                                    <div className={`${styles.formItem} ${styles.row}`}
                                        style={{
                                            width: window?.innerWidth > 720 ? "40%" : "100%",
                                            padding: "0 5px"
                                        }}>
                                        <input
                                            style={{
                                                color: "white",
                                                width: "100%"
                                            }}
                                            onChange={(e) => updateSearch(e.target.value)}
                                            value={collection?.compare_against}
                                            type="text"
                                            name="query" />
                                        <label htmlFor="query" style={{ 
                                            top: collection?.compare_against !== "" ? "-5px" : "", 
                                            fontSize: collection?.compare_against !== "" ? "10px" : ""}}>Compare Against</label>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card title={"Products In Collection"}
                            header={""}
                            card_type={"INFO"}
                            >
                            <div className={`${styles.col}`} style={{position: "relative"}}>
                                <div className={`${styles.col}`} style={{ padding: "1rem 0" }}>
                                    <div className={`${styles.col}`} style={{ padding: "0em 0.5rem 0rem 0.5rem " }}>
                                        {
                                            query === "" && collection.products && collection.products.map(product => {
                                                return (
                                                    <div key={product.id} className={`${styles.col}`}>
                                                        <VariantRow item={product} />
                                                        <Underline width={100} />
                                                    </div>
                                                )
                                            })
                                        }
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
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    ) 
}



export const getServerSideProps: GetServerSideProps = async () => {
    const url = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/collections";
    const result = await impoweredRequest(url, "POST", {col_uuid: ""});

    console.log(" ==> SERVER SIDE");
    console.log(result);

    if (!result) {
        throw new Error("Product list error");
    }

    console.log(" ==> SERVER SIDE");
    console.log(result);

    let collections = [{}] as ProdCollection[];
    let size = 0;

    if (result?.result) {
        collections = result?.result?.collections,
        size = result?.result?.size
    }

    return {
        props: {
            size: size,
            collections: collections
        }
    }
}



export default CollectionDetail;


