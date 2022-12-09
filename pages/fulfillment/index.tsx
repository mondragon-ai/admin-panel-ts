import styles from "../../styles/Main.module.css";

import AllItemHeader from "../../components/ui/headers/AllItemHeader";
import { useState } from "react";
import {
    faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     ProductContainerRow
// } from "../../components/ui/rows/ProductContainerRow";
import {
    ItemContainerHeader
} from "../../components/ui/headers/ItemContainerHeader";
import Underline from "../../components/ui/Underline";
import * as crypto from "crypto"
import { MainRowContainerHeader } from "../../components/ui/headers/MainRowContainerHeader";
import { MainRowContainer } from "../../components/ui/rows/MainRowContainer";
import { GetServerSideProps } from "next";
import { numberFormat } from "../../lib/helpers/formatters";
import { Fulfillment } from "../../lib/types/fulfillment";

const fulfillments: Fulfillment[] = [
    {
        status: false,
        id: "ful_" + crypto.randomBytes(10).toString("hex"),
        merchant_address: {
            line1: "420 Bigly St",
            line2: "",
            city: "South Park",
            state: "NM",
            zip: "42069",
            country: "72704",
            name: "Bigly",
            contact: "thanks@gobigly.com"
        },
        recipient_address: {
            line1: "420 Bigly St",
            line2: "",
            city: "South Park",
            state: "NM",
            zip: "42069",
            country: "72704",
            name: "obi",
            contact: "obi@gobigly.com"
        },
        shipping_detail: {
            service: "USPS",
            type: "STANDARD",
            packaging: "PACKAGE",
            weight: 0.22,
            insurance: false,
        },
        order_summary: {
            order_number: "#SH-IJBH934H",
            total_price: 6500,
            line_items: [
                {
                    url: "", 
                    title: "Vip Product",
                    quantity: 3,
                    price: 3000,
                    options1: "COLOR",
                    options2: "SIZE",
                    options3: "",
                }
            ]
        },
        label_url: ""
    },
    {
        status: false,
        id: "ful_" + crypto.randomBytes(10).toString("hex"),
        merchant_address: {
            line1: "420 Bigly St",
            line2: "",
            city: "South Park",
            state: "NM",
            zip: "42069",
            country: "72704",
            name: "Bigly",
            contact: "thanks@gobigly.com"
        },
        recipient_address: {
            line1: "420 Bigly St",
            line2: "",
            city: "South Park",
            state: "NM",
            zip: "42069",
            country: "72704",
            name: "obi",
            contact: "obi@gobigly.com"
        },
        shipping_detail: {
            service: "USPS",
            type: "STANDARD",
            packaging: "PACKAGE",
            weight: 0.22,
            insurance: false,
        },
        order_summary: {
            order_number: "#SH-IJBH934H",
            total_price: 6500,
            line_items: [
                {
                    url: "", 
                    title: "Vip Product",
                    quantity: 3,
                    price: 3000,
                    options1: "COLOR",
                    options2: "SIZE",
                    options3: "",
                }
            ]
        },
        label_url: ""
    }
]

interface Prop {
    fulfillments: Fulfillment[]
}

const AllfFlfillments = ({}: Prop) => {
    const [itemSearch, setItemSearch] = useState("");
    const [list, setOrders] = useState<any[]>(fulfillments);
    const [filterState, setFilter] = useState<"" | "INACTIVE" | "ACTIVE">("");

    return (
        <div className={`${styles.col}`}>
            <AllItemHeader 
                title={"Fulfillment"}
                createPage={""}
                createTxt={""}
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
                                        fontSize: itemSearch != "" ? "10px" : ""}}>{` 🔍 Search Fulfillment` }</label>
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
                            rowOneUpper={"Order Type"}
                            rowOneLower={"Full Name"}
                            rowTwoUpper={"Product Value"}
                            rowTwoLower={"Status"}
                            rowThree={"Address"}
                            rowFour={"Order Number"}/>
                        {list && list.map((s: Fulfillment) => {
                            console.log(s.id);
                                return (
                                    <div key={s.id} className={`${styles.col} ${styles.itemRow}`}>
                                        <Underline width={100} />
                                        <MainRowContainer
                                            href={`/fulfillment/${s.id}`} 
                                            id={s.id}
                                            colOneTop={s?.shipping_detail?.type}
                                            colOneBottom={s?.recipient_address?.name }
                                            colTwoTop={numberFormat(Number(s?.order_summary?.total_price)/100)}
                                            colTwoBottom={s.status}
                                            colThree={s?.merchant_address.line1 + " " + s?.recipient_address?.city + " " + s?.recipient_address?.state}
                                            colFour={s?.order_summary?.order_number} />
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
    // const result = await impoweredRequest(url, "POST", {gif_uuid: ""});

    // console.log(" ==> SERVER SIDE");
    // console.log(result);

    // if (!result) {
    //     throw new Error("Product list error");
    // }

    // console.log(" ==> SERVER SIDE");
    // console.log(result);

    // let gift_cards = [{}] as GiftCard[];
    // let size = 0;

    // if (result?.data) {
    //     gift_cards = result?.data?.gift_cards,
    //     size = result?.data?.size
    // }

    return {
        props: {
            // size: size,
            // gift_cards: gift_cards
        }
    }
}

export default AllfFlfillments;