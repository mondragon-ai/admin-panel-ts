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
import { Product } from "../../../lib/types/products";
import Underline from "../../../components/ui/Underline";
import * as crypto from "crypto"
import { AnalyticsContainerRow } from "../../../components/ui/rows/AnalyticsContainerRow";
import { MainRowContainerHeader } from "../../../components/ui/headers/MainRowContainerHeader";

const funnels = [
    {
        title: "RAM + 10k -- Evergreen",
        status: false,
        id: crypto.randomBytes(10).toString("hex"),
        aov: "$29.94",
        total_sales: "$22,872.94",
        total_orders: "159",
        sales_rate: "8.59%",
    },
    {
        title: "Thug Nasty - Fight Bundle Pack",
        status: true,
        id: crypto.randomBytes(10).toString("hex"),
        aov: "$29.94",
        total_sales: "$22,872.94",
        total_orders: "159",
        sales_rate: "8.59%",
    }
]

const cols = [
    {
        width: "10%",
        html: '<input type="checkbox" name="" id="" />',
        id: 0
    },
    {
        width: "10%",
        html: '<input type="checkbox" name="" id="" />',
        id: 1
    },
    {
        width: "10%",
        html: '<h4>{title}</h4>',
        id: 2
    },
    {
        width: "10%",
        html: '<input type="checkbox" name="" id="" />',
        id: 2
    }
]

interface Prop {
    itemTxt: string
}

export default function  AllProducts(props: Prop) {
    const [itemSearch, setItemSearch] = useState("");
    const [list, setProducts] = useState<any[]>(funnels);
    const [filterState, setFilter] = useState<"" | "INACTIVE" | "ACTIVE">("");

    return (
        <div className={`${styles.col}`}>
            <AllItemHeader 
                title={"Funnel Analytics"}
                createPage={"/analytics/funnels/create"}
                createTxt={"Create Report"}
                />
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.col} ${styles.card}`}>
                    <div style={{ alignItems: "center"}} className={`${styles.row} ${styles.itemRowHContainer}`}>
                        <MainRowContainerHeader
                            list={funnels}
                            type={filterState}
                            setState={setProducts}
                            setFilter={setFilter} />
                        <div className={`${styles.row}  ${styles.itemsCardSearch}`}>
                            <div className={`${styles.row}`}>
                                <div
                                    className={`${styles.formItem} ${styles.row}`} >
                                    <input
                                        onChange={(e) => setItemSearch(e.target.value)}
                                        type="cardSearch"
                                        name="cardSearch"
                                        placeholder="" />
                                    <label style={{ 
                                        top: itemSearch != "" ? "-5px" : "", 
                                        fontSize: itemSearch != "" ? "10px" : ""}}>{` 🔍 Search ${props.itemTxt}` }</label>
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
                            rowOneLower={"First Sales Rate"}
                            rowTwoUpper={"AOV"}
                            rowTwoLower={"Status"}
                            rowThree={"Total Sales"}
                            rowFour={"Total Orders"}/>
                        {list && list.map((p) => {
                            console.log(p.id);
                                return (
                                    <div key={p.id} className={`${styles.col} ${styles.itemRow}`}>
                                        <Underline width={100} />
                                        <AnalyticsContainerRow 
                                            key={p.id}
                                            id={p.id}
                                            colOneTop={p.title}
                                            colOneBottom={p.sales_rate}
                                            colTwoTop={p.aov}
                                            colTwoBottom={p.status}
                                            colThree={p.total_sales}
                                            colFour={p.total_orders} />
                                    </div>
                                );
                        })}
                    </div>
                </div>
            </main>
        </div>
    )
}