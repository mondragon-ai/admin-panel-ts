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
import { GetServerSideProps } from "next";
import { numberFormat } from "../../lib/helpers/formatters";
import { impoweredRequest } from "../../lib/helpers/requests";

// const subscriptions: Subscriptions[] = [
//     {
//         order_name: "#SH-92834592454",
//         status: true,
//         customer: {
//             cus_uuid: "",
//             email: "allMight@gobigly.com",
//             first_name: "All",
//             last_name: "Might",
//             addresses: [
//                 {
//                     line1: "420 Bigly ln",
//                     line2: "",
//                     city: "South Park",
//                     state: "AR",
//                     zip: "72704",
//                     country: "US",
//                     type: "BOTH", 
//                     name: ""
//                 }
//             ]
//         },
//         payment_method: "STRIPE",
//         schedule: {
//             next_charge_date: new Date().toDateString(),
//             interval: "MONTHLY",
//             total_charges: 3,
//             total_value: 9000,
//         },
//         product: {
//             product_id: "pro_" + crypto.randomBytes(10).toString("hex"),
//             variant_id: "var_" + crypto.randomBytes(10).toString("hex"),
//             title: "Hoodie",
//             price: 3000,
//             options1: "",
//             options2: "",
//             options3: "",
//             url: ""
//         },
//         id: "sub_" + crypto.randomBytes(10).toString("hex"),
//         value: 3000
//     },
//     {
//         order_name: "#SH-92834592454",
//         status: true,
//         customer: {
//             cus_uuid: "",
//             email: "allMight@gobigly.com",
//             first_name: "All",
//             last_name: "Might",
//             addresses: [
//                 {
//                     line1: "420 Bigly ln",
//                     line2: "",
//                     city: "South Park",
//                     state: "AR",
//                     zip: "72704",
//                     country: "US",
//                     type: "BOTH", 
//                     name: ""
//                 }
//             ]
//         },
//         payment_method: "STRIPE",
//         schedule: {
//             next_charge_date: new Date().toDateString(),
//             interval: "MONTHLY",
//             total_charges: 3,
//             total_value: 9000,
//         },
//         product: {
//             product_id: "pro_" + crypto.randomBytes(10).toString("hex"),
//             variant_id: "var_" + crypto.randomBytes(10).toString("hex"),
//             title: "Hoodie",
//             price: 3000,
//             options1: "",
//             options2: "",
//             options3: "",
//             url: ""
//         },
//         id: "sub_" + crypto.randomBytes(10).toString("hex"),
//         value: 3000
//     }
// ]

interface Prop {
    subscriptions: Subscriptions[]
}

const Subscriptions = ({subscriptions}: Prop) => {
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
                            rowTwoUpper={"Product Value"}
                            rowTwoLower={"Status"}
                            rowThree={"Schedule"}
                            rowFour={"Total Sub Value"}/>
                        {list && list.map((s: Subscriptions) => {
                            console.log(s.id);
                                return (
                                    <div key={s.id} className={`${styles.col} ${styles.itemRow}`}>
                                        <Underline width={100} />
                                        <MainRowContainer
                                            href={`/products/subscriptions/${s.id}`} 
                                            id={s.id}
                                            colOneTop={s?.order_number}
                                            colOneBottom={s?.customer?.first_name + " " + s?.customer?.last_name}
                                            colTwoTop={numberFormat(Number(s?.product?.price)/100)}
                                            colTwoBottom={s.status}
                                            colThree={s?.schedule?.type}
                                            colFour={numberFormat(Number(s?.schedule?.total_value)/100)} />
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
    // const url = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/subscriptions";
    const DEV_SERVER = "http://localhost:5001/impowered-funnel/us-central1/funnel/subscriptions";
    const result = await impoweredRequest(DEV_SERVER, "POST", {sub_uuid: ""});

    console.log(" ==> SERVER SIDE");
    console.log(result);

    if (!result) {
        throw new Error("Product list error");
    }

    console.log(" ==> SERVER SIDE");
    console.log(result);

    let subscriptions = [{}] as Subscriptions[];
    let size = 0;

    if (result?.result) {
        subscriptions = result?.result?.subscriptions,
        size = result?.result?.size
    }

    return {
        props: {
            size: size,
            subscriptions: subscriptions
        }
    }
}


export default Subscriptions;