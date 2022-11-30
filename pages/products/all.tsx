import styles from "../../styles/Main.module.css";
import AllItemHeader from "../../components/ui/headers/AllItemHeader";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
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
import { filterActive, filterAll } from "../../lib/helpers/ActiveFilter";
import { MainRowContainerHeader } from "../../components/ui/headers/MainRowContainerHeader";

const products: Product[] = [
    {
        title: "1776 Hoodie",
        status: false,
        id: crypto.randomBytes(10).toString("hex"),
        price: "$68.00",
        collections: ["SALE", "Shirts"],
        tags: ["VIP_ONLY"],
        options: ["Color", "Size"],
        quantity: 2
    },
    {
        title: "Desantis Land Hoodie",
        status: true,
        id: crypto.randomBytes(10).toString("hex"),
        price: "$72.00",
        collections: ["Best Sellers", "Hoodie"],
        tags: ["VIP_ONLY" ],
        options: ["Color", "Size"],
        quantity: 1
    }
]

interface Prop {
    itemTxt: string
}

export default function  AllProducts(props: Prop) {
    const [itemSearch, setItemSearch] = useState("");
    const [list, setProducts] = useState<any[]>(products);
    const [filterState, setFilter] = useState<"" | "INACTIVE" | "ACTIVE">("");

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
                                        onChange={(e) => setItemSearch(e.target.value)}
                                        type="email"
                                        name="email"
                                        placeholder="" />
                                    <label style={{ 
                                        top: itemSearch != "" ? "-5px" : "", 
                                        fontSize: itemSearch != "" ? "10px" : ""}}>{` 🔍 Search Products` }</label>
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
                        {list && list.map((p) => {
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