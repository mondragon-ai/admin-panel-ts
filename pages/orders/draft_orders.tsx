// import styles from "../../styles/Main.module.css";

// export function AllDraftOrders() {
//     return (
//         <div className={`${styles.col}`}>
//             hello
//         </div>
//     );
// }

// export default AllDraftOrders;

// import styles from "../../styles/Main.module.css";

// export const AllCart = () => {
//     return (
//         <div className={`${styles.col}`}>
//             hello
//         </div>
//     );
// }

// export default AllCart;

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
import { Carts, DraftOrders, Order } from "../../lib/types/orders";
import { GetServerSideProps } from "next";
import { impoweredRequest } from "../../lib/helpers/requests";
import { numberFormat } from "../../lib/helpers/formatters";

const orders: Carts[] = [
    {
        title: "#SH-912398982",
        status: false,
        id: crypto.randomBytes(10).toString("hex"),
        total_price: "$29.94",
        tags: ["SALE", "Shirts"],
        email: "allMight@gobigly.com",
        first_name: "All",
        last_name: "Might",
    },
    {
        title: "#SH-92834592454",
        status: true,
        id: crypto.randomBytes(10).toString("hex"),
        total_price: "$164.91",
        tags: ["VIP_ONLY", "CLICK_FUNNEL"],
        email: "allMight@gobigly.com",
        first_name: "All",
        last_name: "Might",
    }
]

interface Prop {
    itemTxt: string,
    orders: DraftOrders[],
    size: number
}

export default function  AllCart(props: Prop) {
    const [itemSearch, setItemSearch] = useState("");
    const [list, setOrders] = useState<DraftOrders[]>(props.orders ? props.orders : []);
    const [filterState, setFilter] = useState<"" | "INACTIVE" | "ACTIVE">("");

    return (
        <div className={`${styles.col}`}>
            <AllItemHeader 
                title={"Draft Orders"}
                createPage={"/orders/draft_orders/create"}
                createTxt={"Create Order"}
                />
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.col} ${styles.card}`}>
                    <div style={{ alignItems: "center"}} className={`${styles.row} ${styles.itemRowHContainer}`}>
                        <MainRowContainerHeader
                            list={orders}
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
                            rowOneUpper={"Order ID"}
                            rowOneLower={"Full Name"}
                            rowTwoUpper={"Order Value"}
                            rowTwoLower={"Payment Status"}
                            rowThree={"Email"}
                            rowFour={"Tags"}/>
                        {list && list.map((p: DraftOrders) => {
                            console.log(p.id);
                                return (
                                    <div key={p.id} className={`${styles.col} ${styles.itemRow}`}>
                                        <Underline width={100} />
                                        <MainRowContainer
                                            href={`/orders/d/${p.id}`} 
                                            id={p.id as string}
                                            colOneTop={p.order_number as string}
                                            colOneBottom={p?.first_name as string + " " + (p?.last_name ? p?.last_name : "") as string}
                                            colTwoTop={numberFormat(Number(p?.current_total_price ? p.current_total_price : 0 ) /100)}
                                            colTwoBottom={!p.fullfillment_status?.includes("SENT") ? true : false}
                                            colThree={p.email as string}
                                            colFour={p.tags as string[]} />
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
    const dev_server = "http://localhost:5001/impowered-funnel/us-central1/funnel"
    // const url = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel";
    const result = await impoweredRequest(dev_server + "/draft_orders", "POST", {dra_uuid: ""});

    if (!result) {
        throw new Error("Product list error");
    }

    let orders = [{}] as Order[];
    let size = 0;

    if (result?.result) {
        orders = result?.result?.orders,
        size = result?.result?.size
    }

    return {
        props: {
            size: size,
            orders: orders
        }
    }
}
