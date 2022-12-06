import styles from "../../../styles/Main.module.css";
import AllItemHeader from "../../../components/ui/headers/AllItemHeader";
import { useState } from "react";
import {
    faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ItemContainerHeader
} from "../../../components/ui/headers/ItemContainerHeader";
import Underline from "../../../components/ui/Underline";
// import * as crypto from "crypto"
// import { filterActive, filterAll } from "../../lib/helpers/ActiveFilter";
import { MainRowContainerHeader } from "../../../components/ui/headers/MainRowContainerHeader";
import { GetServerSideProps } from "next";
import { impoweredRequest } from "../../../lib/helpers/requests";


import { algoliasearch } from "algoliasearch";
import { numberFormat } from "../../../lib/helpers/formatters";
import { MainRowContainer } from "../../../components/ui/rows/MainRowContainer";
import { Funnel } from "../../../lib/types/funnels";

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
    funnels: Funnel[],
    size: number
}

export default function AllFunnels(props: Prop) {
    const { funnels, size} = props;

    const [list, setProducts] = useState<any[]>(funnels);
    const [filterState, setFilter] = useState<"" | "INACTIVE" | "ACTIVE">("");

    // const [query, setQuery] = useState<string>("")
    // const [results, setResults] = useState<any[]>([])

    // const updateSearch = async (v: string) => {
    //     setQuery(v);
        
    //     // Fetch search results
    //     const { results } = await client.search({
    //         requests: [
    //         {
    //             indexName: 'prod_product_search_engine',
    //             // You can make typos, we handle it
    //             query: query,
    //             hitsPerPage: 50,
    //         },
    //         ],
    //     });
    
    //     if (results[0].hits) {
    //         setResults(results[0].hits);
    //         console.log('[Results]', results[0].hits);
    //     }
    // };

    return (
        <div className={`${styles.col}`}>
            <AllItemHeader 
                title={"Funnels"}
                createTxt={"Create Funnel"}
                createPage={"/themes/funnels/create"}
                />
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.col} ${styles.card}`}>
                    <div style={{ alignItems: "center", justifyContent: "space-between"}} className={`${styles.row} ${styles.itemRowHContainer}`}>
                        <MainRowContainerHeader 
                            list={list}
                            type={filterState}
                            setState={setProducts}
                            setFilter={setFilter} />
                        <div className={`${styles.row}  ${styles.itemsCardSearch}`}>
                            <div className={`${styles.row}`}>
                                <div
                                    className={`${styles.formItem} ${styles.row}`} >
                                    <input
                                        // onChange={(e) => updateSearch(e.target.value)}
                                        type="text"
                                        name="search_product"
                                        placeholder="" />
                                    <label style={{ 
                                        top: true ? "-5px" : "", 
                                        fontSize: true ? "10px" : ""}}>{` 🔍 Search Products` }</label>
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
                            rowOneLower={"Funnel Steps"}
                            rowTwoUpper={"Sales"}
                            rowTwoLower={"Status"}
                            rowThree={"Aov | Orders | Earnings"}
                            rowFour={"Tags"}/>
                        {list && list.map((f: Funnel) => {
                            console.log(f);
                                return (
                                    <div key={f.id} className={`${styles.col} ${styles.itemRow}`}>
                                        <Underline width={100} />
                                        <MainRowContainer
                                            href={`/themes/funnels/${f.id}`} 
                                            id={f.id as string}
                                            colOneTop={f.title as string}
                                            colOneBottom={f?.steps ? f?.steps?.map(step => {return  " " + step.name }).toString() : ""}
                                            colTwoTop={numberFormat(Number(f?.total_earnings ? f.total_earnings : 0 ) /100)}
                                            colTwoBottom={f.status}
                                            colThree={
                                                numberFormat(Number(f?.total_aov ? f.total_aov : 0 ) /100) + " / " + 
                                                numberFormat(Number(f?.total_orders ? f.total_orders : 0 ) /100) + " / " + 
                                                numberFormat(Number(f?.total_earnings ? f.total_earnings : 0 ) /100)
                                            }
                                            colFour={f.tags as string[]} />
                                    </div>
                                );
                        })}
                    </div>

                    {/* <div className={`${styles.col} ${styles.itemsContainer}`}>
                        <ItemContainerHeader 
                            rowOneUpper={"Title"}
                            rowOneLower={"Funnel Steps"}
                            rowTwoUpper={"Sales"}
                            rowTwoLower={"Status"}
                            rowThree={"Earnings / AoV / Orders"}
                            rowFour={"Tags"}/>
                        {true && size > 0 && list && list.map((p) => {
                            console.log(f.id);
                                return (
                                    <div key={p.id} className={`${styles.col} ${styles.itemRow}`}>
                                        <Underline width={100} />
                                        <ProductContainerRow 
                                            key={p.id}
                                            p={p} />
                                    </div>
                                );
                        })}
                        {/* {query !== "" && size > 0 && results && results.map((p) => {
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
                    </div> */}
                </div>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const url = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/funnels";
    const result = await impoweredRequest(url, "POST", {fun_uuid: ""});

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
            size: size,
            funnels: funnels
        }
    }
}

// export default AllProducts;