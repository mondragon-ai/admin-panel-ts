import styles from "../../styles/Main.module.css";

// export const AllOrders = () => {
//     return (
//         <div className={`${styles.col}`}>
//             hello
//         </div>
//     );
// }

// export default AllOrders;

import AllItemHeader from "../../components/ui/headers/AllItemHeader";
import { FunctionComponent, useState } from "react";
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
import Underline from "../../components/ui/Underline";
import * as crypto from "crypto"
import { MainRowContainerHeader } from "../../components/ui/headers/MainRowContainerHeader";
import { MainRowContainer } from "../../components/ui/rows/MainRowContainer";
import { Bundle } from "../../lib/types/products";
import { numberFormat } from "../../lib/helpers/formatters";

const bundles: Bundle[] = [
    {
        collections: [],
        products: [],
        title: "Chill Pack",
        status: false,
        id: "col_" + crypto.randomBytes(10).toString("hex"),
        tags: ["SALE", "Shirts"],
        price: 100
    },
    {
        collections: [],
        products: [
            "pro_" + crypto.randomBytes(10).toString("hex")
        ],
        title: "T-Shirts",
        status: false,
        id: crypto.randomBytes(10).toString("hex"),
        tags: ["SALE", "Shirts"],
        price: 100
    }
]

interface Prop {
    itemTxt: string
}

const Bundles = (props: Prop) => {
    const [itemSearch, setItemSearch] = useState("");
    const [list, setOrders] = useState<any[]>(bundles);
    const [filterState, setFilter] = useState<"" | "INACTIVE" | "ACTIVE">("");

    return (
        <div className={`${styles.col}`}>
            <AllItemHeader 
                title={"Product Bundles"}
                createPage={"/products/bundles/create"}
                createTxt={"Create Bundle"}
                />
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.col} ${styles.card}`}>
                    <div style={{ alignItems: "center"}} className={`${styles.row} ${styles.itemRowHContainer}`}>
                        <MainRowContainerHeader
                            list={bundles}
                            type={filterState}
                            setState={setOrders}
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
                                        fontSize: itemSearch != "" ? "10px" : ""}}>{` 🔍 Search orders` }</label>
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
                            rowOneUpper={"Bundle Name"}
                            rowOneLower={""}
                            rowTwoUpper={"Price"}
                            rowTwoLower={"Status"}
                            rowThree={"Total Count"}
                            rowFour={"Tags"}/>
                        {list && list.map((s: Bundle) => {
                            console.log(s.id);
                                return (
                                    <div key={s.id} className={`${styles.col} ${styles.itemRow}`}>
                                        <Underline width={100} />
                                        <MainRowContainer
                                            href={`/products/bundles/${s.id}`} 
                                            id={s.id}
                                            colOneTop={s.title}
                                            colOneBottom={""}
                                            colTwoTop={numberFormat(s.price)}
                                            colTwoBottom={s.status}
                                            colThree={"" + s.products.length + " products in this bundle"}
                                            colFour={s.tags} />
                                    </div>
                                );
                        })}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Bundles;