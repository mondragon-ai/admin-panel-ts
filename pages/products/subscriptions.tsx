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
import { Subscriptions } from "../../lib/types/products";

const subscriptions: Subscriptions[] = [
    {
        title: "#SH-912398982",
        status: false,
        id: crypto.randomBytes(10).toString("hex"),
        product_id:  crypto.randomBytes(10).toString("hex"),
        tags: ["SALE", "Shirts"],
        email: "allMight@gobigly.com",
        first_name: "All",
        last_name: "Might",
        schedule: {
            frequency: "MONTHLY",
            date: String(1),
            trial: 0
        },
        value: "$30.00"
    },
    {
        title: "#SH-92834592454",
        status: true,
        id: crypto.randomBytes(10).toString("hex"),
        product_id:  crypto.randomBytes(10).toString("hex"),
        tags: ["VIP_ONLY", "CLICK_FUNNEL"],
        email: "allMight@gobigly.com",
        first_name: "All",
        last_name: "Might",
        schedule: {
            frequency: "TRIAL",
            date: String(1),
            trial: 7
        },
        value: "$30.00"
    }
]

interface Prop {
    itemTxt: string
}

const Subscriptions = (props: Prop) => {
    const [itemSearch, setItemSearch] = useState("");
    const [list, setOrders] = useState<any[]>(subscriptions);
    const [filterState, setFilter] = useState<"" | "INACTIVE" | "ACTIVE">("");

    return (
        <div className={`${styles.col}`}>
            <AllItemHeader 
                title={"Subscriptions"}
                createPage={"/products/subscriptions/create"}
                createTxt={"Create Subscriptions"}
                />
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.col} ${styles.card}`}>
                    <div style={{ alignItems: "center"}} className={`${styles.row} ${styles.itemRowHContainer}`}>
                        <MainRowContainerHeader
                            list={subscriptions}
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
                            rowOneUpper={"Subscription ID"}
                            rowOneLower={"Full Name"}
                            rowTwoUpper={"Order Value"}
                            rowTwoLower={"Status"}
                            rowThree={"Schedule"}
                            rowFour={"Tags"}/>
                        {list && list.map((s: Subscriptions) => {
                            console.log(s.id);
                                return (
                                    <div key={s.id} className={`${styles.col} ${styles.itemRow}`}>
                                        <Underline width={100} />
                                        <MainRowContainer
                                            href={`/products/subscriptions/${s.id}`} 
                                            id={s.id}
                                            colOneTop={s.title}
                                            colOneBottom={s.first_name + " " + s.last_name}
                                            colTwoTop={s.value}
                                            colTwoBottom={s.status}
                                            colThree={s.schedule}
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

export default Subscriptions;