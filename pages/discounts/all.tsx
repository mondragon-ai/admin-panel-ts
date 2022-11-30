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
import { Discounts } from "../../lib/types/discounts";
import { numberFormat } from "../../lib/helpers/formatters";

const discounts: Discounts[] = [
    {
        status: true, 
        title: "SUMMERSALE",
        value_type: "PERCENTAGE",
        value: 40,
        type: "CODE" ,
        code: "HIUYU2887",
        id: "dis_" + crypto.randomBytes(10).toString('hex'),
        automatic_type: "",
    },
    {
        status: true, 
        title: "SIGN UP",
        value_type: "FIXED",
        value: 500,
        type: "CODE" ,
        code: "81be10123",
        id: "dis_" + crypto.randomBytes(10).toString('hex'),
        automatic_type: "",
    },
    {
        status: true, 
        title: "VIP Member",
        value_type: "PERCENTAGE",
        value: 40,
        type: "AUTOMATIC" ,
        code: "",
        id: "dis_" + crypto.randomBytes(10).toString('hex'),
        automatic_type: "TAGS",
        requirement: {
            customers: ["VIP"],
            products: [],
            collections: [],
        },
        exclude: {
            customers: [],
            products: ["EXCLUDE_VIP"],
            collections: [],
        },
    },
]

interface Prop {
    itemTxt: string
}

const Discounts = (props: Prop) => {
    const [itemSearch, setItemSearch] = useState("");
    const [list, setOrders] = useState<Discounts[]>(discounts);
    const [filterState, setFilter] = useState<"" | "INACTIVE" | "ACTIVE">("");


    let tag_list: string[] = [];

    return (
        <div className={`${styles.col}`}>
            <AllItemHeader 
                title={"Discounts"}
                createPage={"/discounts/create"}
                createTxt={"Create Discount"}
                />
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.col} ${styles.card}`}>
                    <div style={{ alignItems: "center"}} className={`${styles.row} ${styles.itemRowHContainer}`}>
                        <MainRowContainerHeader
                            list={discounts}
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
                            rowOneUpper={"Title"}
                            rowOneLower={"Discount Code"}
                            rowTwoUpper={"Order Value"}
                            rowTwoLower={"Status"}
                            rowThree={"Value Type / Code Type"}
                            rowFour={"Tags"}/>

                        {list && list.map((s: Discounts) => {


                            if (s.requirement) {
                                tag_list = [
                                    ...tag_list,
                                    ...s.requirement?.products,
                                    ...s.requirement?.collections,
                                    ...s.requirement?.customers
                                ]
                            }

                            console.log(tag_list);

                            if (s.exclude) {
                                tag_list = [
                                    ...tag_list,
                                    ...s.exclude?.products,
                                    ...s.exclude?.collections,
                                    ...s.exclude?.customers
                                ]
                            }
                            console.log(tag_list);

                            console.log(s.id);
                                return (
                                    <div key={s.id} className={`${styles.col} ${styles.itemRow}`}>
                                        <Underline width={100} />
                                        <MainRowContainer
                                            href={`/discounts/${s.id}`} 
                                            id={s.id}
                                            colOneTop={s.title}
                                            colOneBottom={s.code}
                                            colTwoTop={s.value_type == "FIXED" ? numberFormat(s.value / 100) : s.value + "%"}
                                            colTwoBottom={s.status}
                                            colThree={s.value_type + " / " + s.automatic_type}
                                            colFour={tag_list} />
                                    </div>
                                );
                        })}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Discounts;