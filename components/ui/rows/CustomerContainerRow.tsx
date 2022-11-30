
import Link from "next/link";
import { FunctionComponent } from "react";
import { numberFormat } from "../../../lib/helpers/formatters";
import { Customer } from "../../../lib/types/customers";
import styles from "../../../styles/Main.module.css";

export const CustomerContainerRow: FunctionComponent<any> = ({c}) => {
    const CUSTOMER: Customer = c;
    const {
        id,
        first_name,
        last_name,
        email,
        status,
        tags,
        total_orders,
        total_value
    } = CUSTOMER;

    return (
        <Link href={`/customers/${id}`} 
            key={id}
            style={{
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "1rem 0",
                color: "gray"
            }}
            className={`${styles.row}`}>
            <div 
                style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    // padding: "1rem 0",
                    color: "gray"
                }}
                className={`${styles.row}`}>
                <div 
                    style={{
                        width: "5%",
                        alignItems: "center"
                    }} className={`${styles.col} ${styles.checkboxMobile}`}>
                    <input type="checkbox" name="" id="" />
                </div>
                <div 
                    style={{
                        width: "30%",
                        justifyContent: "flex-start"
                    }} 
                    className={`${styles.col} ${styles.rowOneMobile}`}>
                    <span 
                        style={{
                            fontSize: "1rem",
                        }}>{first_name + " " + last_name}</span>
                    <div 
                        style={{
                            fontSize: "0.7rem",
                            justifyContent: "flex-start"
                        }}
                        className={`${styles.row} `}>
                        <span>{email}</span>
                    </div>
                </div>
                <div 
                    style={{
                        width: "15%",
                        justifyContent: "flex-start"
                    }} 
                    className={`${styles.col} ${styles.rowTwoMobile}`}>
                    <span 
                    style={{
                        fontSize: "1rem"
                    }}>{total_orders}</span>
                    {
                        status ? 
                        <p style={{
                            background: "#aff2af",
                            border: "1px solid #7aff7a",
                            color: "gray"
                        }} className={`${styles.statusSubHead} `}>Active</p> : 
                        <p className={`${styles.statusSubHead}`}>Drafted</p>
                    }
                </div>
                <div 
                    style={{
                        width: "30%",
                        justifyContent: "flex-start",
                        overflow: "hidden"
                    }} 
                    className={`${styles.row} ${styles.noneMobile}`}>
                    {numberFormat(Number(total_value))}
                </div>
                <div 
                    style={{
                        width: "20%",
                        justifyContent: "flex-start"
                    }} 
                    className={`${styles.row} ${styles.noneMobile}`}>
                    {tags?.map((tag, i) => (<p>{tag}{i != tags.length-1 ? ", " : ""}</p>) )}
                </div>
            </div>

        </Link>
    )
};