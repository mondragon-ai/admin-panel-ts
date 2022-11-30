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
import { GiftCard } from "../../lib/types/products";
import { numberFormat } from "../../lib/helpers/formatters";

const giftCards: GiftCard[] = [
    {
        first_name: "Darth",
        last_name: "Vader",
        email: "vader@gobigly.com",
        status: false,
        id: "gif_" + crypto.randomBytes(10).toString("hex"),
        tags: ["SALE", "Shirts"],
        balance: 0,
        value: 40
    },
    {
        first_name: "Darth",
        last_name: "Maul",
        email: "maul@gobigly.com",
        status: true,
        id: "gif_" + crypto.randomBytes(10).toString("hex"),
        tags: ["SALE", "Shirts"],
        balance: 27.93,
        value: 40
    }
]

interface Prop {
    itemTxt: string
}

const GiftCards = (props: Prop) => {
    const [itemSearch, setItemSearch] = useState("");
    const [list, setOrders] = useState<any[]>(giftCards);
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
                            list={giftCards}
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
                            rowOneUpper={"Full Name"}
                            rowOneLower={"Email"}
                            rowTwoUpper={""}
                            rowTwoLower={"Status"}
                            rowThree={"Value / Balance"}
                            rowFour={"Tags"}/>
                        {list && list.map((s: GiftCard) => {
                            console.log(s.id);
                                return (
                                    <div key={s.id} className={`${styles.col} ${styles.itemRow}`}>
                                        <Underline width={100} />
                                        <MainRowContainer
                                            href={`/products/gift_cards/${s.id}`} 
                                            id={s.id}
                                            colOneTop={s.first_name + " " + s.last_name}
                                            colOneBottom={s.email}
                                            colTwoTop={""}
                                            colTwoBottom={s.status}
                                            colThree={numberFormat(s.value) + " / " +  numberFormat(s.balance)}
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

export default GiftCards;