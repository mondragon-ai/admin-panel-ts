import styles from "../../styles/Main.module.css";
import AllItemHeader from "../../components/ui/headers/AllItemHeader";
import { useState } from "react";
import {
    faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ProductContainerRow
} from "../../components/ui/rows/ProductContainerRow";
import {
    ItemContainerHeader
} from "../../components/ui/headers/ItemContainerHeader";
import { Product } from "../../lib/types/products";
import Underline from "../../components/ui/Underline";
import * as crypto from "crypto"
// import { filterActive, filterAll } from "../../lib/helpers/ActiveFilter";
import { MainRowContainerHeader } from "../../components/ui/headers/MainRowContainerHeader";
import { GetServerSideProps } from "next";
import { impoweredRequest } from "../../lib/helpers/requests";


import { algoliasearch } from "algoliasearch";

// Instantiate the client
const client = algoliasearch('9HC6EQSC7S', 'de139a052d86174f4b708e160db11c4b');

// const products: Product[] = [
//     {
//         title: "1776 Hoodie",
//         status: false,
//         id: crypto.randomBytes(10).toString("hex"),
//         price: 6840,
//         collections: ["SALE", "Shirts"],
//         tags: ["VIP_ONLY"],
//         options: {
//             options1: ["Color", "Size"],
//             options2: ["Color", "Size"],
//             options3: ["Color", "Size"],
    
//         },
//         quantity: 20,
//         description: "description here",
//         compare_at_price: 0,
//         weight: 0.5,
//         is_digital: false,
//         sell_overstock: true,
//         requires_shipping: false,
//         videos: [
//             {
//                 id: "vid_" + crypto.randomBytes(10).toString("hex"),
//                 url: "",
//                 type: "YOUTUBE"
//             }
//         ],
//     },
//     {
//         title: "1776 Hoodie",
//         status: false,
//         id: crypto.randomBytes(10).toString("hex"),
//         price: 6840,
//         collections: ["SALE", "Shirts"],
//         tags: ["VIP_ONLY"],
//         options: {
//             options1: ["Color", "Size"],
//             options2: ["Color", "Size"],
//             options3: ["Color", "Size"],
    
//         },
//         quantity: 20,
//         description: "description here",
//         compare_at_price: 0,
//         weight: 0.5,
//         is_digital: false,
//         sell_overstock: true,
//         requires_shipping: false,
//         videos: [
//             {
//                 id: "vid_" + crypto.randomBytes(10).toString("hex"),
//                 url: "",
//                 type: "YOUTUBE"
//             }
//         ],
//     }
// ]

interface Prop {
    itemTxt: string
    products: Product[],
    size: number
}

export default function AllProducts(props: Prop) {
    const { products, size} = props;

    const [list, setProducts] = useState<any[]>(products);
    const [filterState, setFilter] = useState<"" | "INACTIVE" | "ACTIVE">("");

    const [query, setQuery] = useState<string>("")
    const [results, setResults] = useState<any[]>([])

    const updateSearch = async (v: string) => {
        // Add a new record to your Algolia index
        // const { taskID } = await client.saveObject({
        //     indexName: '9HC6EQSC7S',
        //     body: {
        //         title: 'My Algolia Object',
        //     },
        // });
        
        // // Poll the task status to know when it has been indexed
        // await client.waitForTask({ indexName: '9HC6EQSC7S', taskID });
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
            setResults(results[0].hits);
            console.log('[Results]', results[0].hits);
        }
    };

    return (
        <div className={`${styles.col}`}>
            <AllItemHeader 
                title={"Products"}
                createTxt={"Create Product"}
                createPage={"/products/create"}
                />
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.col} ${styles.card}`}>
                    <div style={{ alignItems: "center"}} className={`${styles.row} ${styles.itemRowHContainer}`}>
                        <MainRowContainerHeader 
                            list={products}
                            type={filterState}
                            setState={setProducts}
                            setFilter={setFilter} />
                        <div className={`${styles.row}  ${styles.itemsCardSearch}`}>
                            <div className={`${styles.row}`}>
                                <div
                                    className={`${styles.formItem} ${styles.row}`} >
                                    <input
                                        onChange={(e) => updateSearch(e.target.value)}
                                        type="text"
                                        name="search_product"
                                        placeholder="" />
                                    <label style={{ 
                                        top: query != "" ? "-5px" : "", 
                                        fontSize: query != "" ? "10px" : ""}}>{` 🔍 Search Products` }</label>
                                </div>
                            </div>
                            <div className={`${styles.row} ${styles.itemsFilterBtn}`}>
                                <FontAwesomeIcon icon={faFilter} />
                                <h5>Active</h5>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.col} ${styles.itemsContainer}`}>
                        <ItemContainerHeader 
                            rowOneUpper={"Title"}
                            rowOneLower={"Options"}
                            rowTwoUpper={"Price"}
                            rowTwoLower={"Status"}
                            rowThree={"Collections"}
                            rowFour={"Tags"}/>
                        {query === "" && size > 0 && list && list.map((p) => {
                            console.log(p.id);
                                return (
                                    <div key={p.id} className={`${styles.col} ${styles.itemRow}`}>
                                        <Underline width={100} />
                                        <ProductContainerRow 
                                            key={p.id}
                                            p={p} />
                                    </div>
                                );
                        })}
                        {query !== "" && size > 0 && results && results.map((p) => {
                            console.log(p.id);
                                return (
                                    <div key={p.id} className={`${styles.col} ${styles.itemRow}`}>
                                        <Underline width={100} />
                                        <ProductContainerRow 
                                            key={p.id}
                                            p={p} />
                                    </div>
                                );
                        })}
                    </div>
                </div>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const url = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/products";
    const result = await impoweredRequest(url, "POST", {product_uuid: ""});

    console.log(" ==> SERVER SIDE");
    console.log(result);

    if (!result) {
        throw new Error("Product list error");
    }

    console.log(" ==> SERVER SIDE");
    console.log(result);

    let products = [{}] as Product[];
    let size = 0;

    if (result?.data) {
        products = result?.data?.result,
        size = result?.data?.size
    }

    return {
        props: {
            size: size,
            products: products
        }
    }
}

// export default AllProducts;