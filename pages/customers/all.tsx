import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AllItemHeader from "../../components/ui/headers/AllItemHeader";
import { ItemContainerHeader } from "../../components/ui/headers/ItemContainerHeader";
import { CustomerContainerRow } from "../../components/ui/rows/CustomerContainerRow";
import Underline from "../../components/ui/Underline";
import styles from "../../styles/Main.module.css";
import { Customer } from "../../lib/types/customers";
import { MainRowContainerHeader } from "../../components/ui/headers/MainRowContainerHeader";

interface Prop {
    itemTxt: string
}

const customers: Customer[] = [
    
    {
        id: "9q2b92br",
        first_name: "Darth",
        last_name: "Vader",
        email: "vader@gobigly.com",
        status: true,
        total_orders: 100,
        total_value: 1000,
        tags: ["VIP_MEMBER"]
    },
    {
        id: "o23i023",
        first_name: "Luke",
        last_name: "Skywalker",
        email: "luke@gobigly.com",
        status: false,
        total_orders: 100,
        total_value: 10000,
        tags: ["VIP_MEMBER"]
    },
    {
        id: "2342bewf2342",
        first_name: "Darth",
        last_name: "Vader",
        email: "vader@gobigly.com",
        status: true,
        total_orders: 100,
        total_value: 1000,
        tags: ["VIP_MEMBER"]
    },
    {
        id: "13243i023",
        first_name: "Luke",
        last_name: "Skywalker",
        email: "luke@gobigly.com",
        status: false,
        total_orders: 100,
        total_value: 10000,
        tags: ["VIP_MEMBER"]
    },
    {
        id: "9q2bg445",
        first_name: "Darth",
        last_name: "Vader",
        email: "vader@gobigly.com",
        status: true,
        total_orders: 100,
        total_value: 1000,
        tags: ["VIP_MEMBER"]
    },
    {
        id: "o23i0x234",
        first_name: "Luke",
        last_name: "Skywalker",
        email: "luke@gobigly.com",
        status: false,
        total_orders: 100,
        total_value: 10000,
        tags: ["VIP_MEMBER"]
    },
    {
        id: "1c34c1452as",
        first_name: "Darth",
        last_name: "Vader",
        email: "vader@gobigly.com",
        status: true,
        total_orders: 100,
        total_value: 1000,
        tags: ["VIP_MEMBER"]
    },
    {
        id: "qw434tv324t",
        first_name: "Luke",
        last_name: "Skywalker",
        email: "luke@gobigly.com",
        status: false,
        total_orders: 100,
        total_value: 10000,
        tags: ["VIP_MEMBER"]
    }
]

const cols = [
    {
        width: "10"
    }
]

export default function AllCustomers(props: Prop) {
    const [itemSearch, setItemSearch] = useState("");
    const [list, setProducts] = useState<any[]>(customers);
    const [filterState, setFilter] = useState<"" | "INACTIVE" | "ACTIVE">("");

    return (
        <div className={`${styles.col}`}>
            <AllItemHeader
                title={"Customers"}
                createTxt={"Create Customer"}
                createPage={"/customers/create"}
                />
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.col} ${styles.card}`}>
                    <div style={{ alignItems: "center"}} className={`${styles.row} ${styles.itemRowHContainer}`}>
                        <MainRowContainerHeader
                            list={customers}
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
                                        fontSize: itemSearch != "" ? "10px" : ""}}>{` 🔍 Search ${props.itemTxt}` }</label>
                                </div>
                            </div>
                            <div className={`${styles.row} ${styles.itemsFilterBtn}`}>
                                <FontAwesomeIcon icon={faFilter} />
                                <h5>Filter</h5>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.col} ${styles.itemsContainer}`}>
                        <ItemContainerHeader
                            rowOneUpper={"Name"}
                            rowOneLower={"Email"}
                            rowTwoUpper={"Total Orders"}
                            rowTwoLower={"Status"}
                            rowThree={"Total Value"}
                            rowFour={"Tags"} />
                        {list && list.map((c) => {
                            console.log("test");
                                return (
                                    <div key={c.id} className={`${styles.col} ${styles.itemRow}`}>
                                        <Underline width={100} />
                                        <CustomerContainerRow 
                                            c={c} />
                                    </div>
                                );
                        })}
                    </div>
                </div>
            </main>

        </div>
    )
}