
import { LineItem } from "../../../lib/types/orders";
import styles from "../../../styles/Main.module.css";

import Image from "next/image";
import React from "react";
import Underline from "../Underline";
import { numberFormat } from "../../../lib/helpers/formatters";

type Props = {
    item: any
}
export const VariantRow: React.FC<Props> = ({
    item
}) => {

    const {url} = item;


    const URL = url && url !== "" ? url : "https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png";

    return (
        <div className={`${styles.row}`}
            style={{padding: "1rem 0"}}>
            {window?.innerWidth >720 ? <div
                className={`${styles.row}`}
                style={{
                    width: "20%",
                    justifyContent: "center"
                }}>
                    <div >
                    <Image 
                        style={{borderRadius: "3px", border: "1px solid black"}}
                        src={URL} 
                        alt=""
                        width={60}
                        height={60} />
                    </div>
            </div> : null}
            <div 
                style={{
                    width: "40%",
                    overflowX: "hidden",
                    textOverflow: "ellipsis"
                }}
                className={`${styles.col}`}>
                <h4>{item.title}</h4>
                <p style={{
                    paddingTop: "0.5rem",
                    color: "grey"
                }}>
                    {item.options1  ? "" + item.options1 : "-"}
                    {item.options2 ? " / " + item.options2 : ""}
                    {item.options3  ? " / " + item.options3 : ""}
                </p>
            </div>
            <div 
                style={{
                    width: "10%",
                    alignItems: "flex-end" 
                }}
                className={`${styles.col}`}>
                <h4>{item.quantity > 0 ? item.quantity : 1}x</h4>
                
            </div>
            <div style={{
                    width: "25%",
                    alignItems: "flex-end" 
                }} className={`${styles.col}`}>
                <h4>{item.compare_at_price > 0 ? numberFormat(Number(item.compare_at_price ? item.compare_at_price : 0)/100) : numberFormat(Number(item.price ? item.price : 0)/100)}</h4>
                <p style={{
                    paddingTop: "0.5rem",
                    color: "grey"
                }}>
                    {item.compare_at_price && item.compare_at_price > 0 ? "" + numberFormat(Number(item.price ? item.price : 0)/100) : null}
                </p>
            </div>
        </div>
    )
}