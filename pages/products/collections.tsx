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
import { Collections } from "../../lib/types/products";

const collections: Collections[] = [
    {
        collections: [],
        products: [],
        title: "T-Shirts",
        status: false,
        id: "col_" + crypto.randomBytes(10).toString("hex"),
        tags: ["SALE", "Shirts"]
    },
    {
        collections: [],
        products: [
            "pro_" + crypto.randomBytes(10).toString("hex")
        ],
        title: "T-Shirts",
        status: false,
        id: crypto.randomBytes(10).toString("hex"),
        tags: ["SALE", "Shirts"]
    }
]

interface Prop {
    itemTxt: string
}

const Collections = (props: Prop) => {
    const [itemSearch, setItemSearch] = useState("");
    const [list, setOrders] = useState<any[]>(collections);
    const [filterState, setFilter] = useState<"" | "INACTIVE" | "ACTIVE">("");

    return (
        <div className={`${styles.col}`}>
            <AllItemHeader 
                title={"Collections"}
                createPage={"/products/collections/create"}
                createTxt={"Create Collection"}
                />
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.col} ${styles.card}`}>
                    <div style={{ alignItems: "center"}} className={`${styles.row} ${styles.itemRowHContainer}`}>
                        <MainRowContainerHeader
                            list={collections}
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
                            rowOneUpper={"Collection Name"}
                            rowOneLower={""}
                            rowTwoUpper={"Product Count"}
                            rowTwoLower={"Status"}
                            rowThree={""}
                            rowFour={"Tags"}/>
                        {list && list.map((s: Collections) => {
                            console.log(s.id);
                                return (
                                    <div key={s.id} className={`${styles.col} ${styles.itemRow}`}>
                                        <Underline width={100} />
                                        <MainRowContainer
                                            href={`/products/collections/${s.id}`} 
                                            id={s.id}
                                            colOneTop={s.title}
                                            colOneBottom={""}
                                            colTwoTop={s.products.length}
                                            colTwoBottom={s.status}
                                            colThree={""}
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

export default Collections;