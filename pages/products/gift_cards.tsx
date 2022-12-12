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
import { impoweredRequest } from "../../lib/helpers/requests";
import { GetServerSideProps } from "next";

// const giftCards: GiftCard[] = [
//     {
//         first_name: "Darth",
//         last_name: "Vader",
//         email: "vader@gobigly.com",
//         status: false,
//         id: "gif_" + crypto.randomBytes(10).toString("hex"),
//         tags: ["SALE", "Shirts"],
//         balance: 0,
//         value: 40
//     },
//     {
//         first_name: "Darth",
//         last_name: "Maul",
//         email: "maul@gobigly.com",
//         status: true,
//         id: "gif_" + crypto.randomBytes(10).toString("hex"),
//         tags: ["SALE", "Shirts"],
//         balance: 27.93,
//         value: 40
//     }
// ]

interface Prop {
    gift_cards: GiftCard[]
}

const GiftCards = ({
    gift_cards
}: Prop) => {
    
    if (!gift_cards) {
        // throw new Error("Data not fetched");        
    }
    const [itemSearch, setItemSearch] = useState("");
    const [list, setOrders] = useState<any[]>(gift_cards);
    const [filterState, setFilter] = useState<"" | "INACTIVE" | "ACTIVE">("");

    return (
        <div className={`${styles.col}`}>
            <AllItemHeader 
                title={"Gift Cards"}
                createPage={"/products/collections/create"}
                createTxt={"Create Gift Card"}
                />
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.col} ${styles.card}`}>
                    <div style={{ alignItems: "center"}} className={`${styles.row} ${styles.itemRowHContainer}`}>
                        <MainRowContainerHeader
                            list={list}
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
                                        fontSize: itemSearch != "" ? "10px" : ""}}>{` 🔍 Search Gift Cards` }</label>
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
                            rowFour={"-"}/>
                        {list && list.map((s: GiftCard) => {
                            console.log(s.id);
                                return (
                                    <div key={s.id} className={`${styles.col} ${styles.itemRow}`}>
                                        <Underline width={100} />
                                        <MainRowContainer
                                            href={`/products/gift_cards/${s.id}`} 
                                            id={s.id}
                                            colOneTop={s.customer.first_name + " " + s?.customer?.last_name}
                                            colOneBottom={s?.customer?.email}
                                            colTwoTop={""}
                                            colTwoBottom={s?.current_balance > 0 ? true : false}
                                            colThree={numberFormat(s?.starting_balance/100) + " / " +  numberFormat(s?.current_balance/100)}
                                            colFour={[]} />
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
    // const url = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/gift_cards";
    const DEV_SERVER = "http://localhost:5001/impowered-funnel/us-central1/funnel/gift_cards";
    const result = await impoweredRequest(DEV_SERVER, "POST", {gif_uuid: ""});

    console.log(" ==> SERVER SIDE");
    console.log(result);

    if (!result) {
        throw new Error("Product list error");
    }

    console.log(" ==> SERVER SIDE");
    console.log(result);

    let gift_cards = [{}] as GiftCard[];
    let size = 0;

    if (result?.result) {
        gift_cards = result?.result?.gift_cards,
        size = result?.result?.size
    }

    return {
        props: {
            size: size,
            gift_cards: gift_cards
        }
    }
}

export default GiftCards;