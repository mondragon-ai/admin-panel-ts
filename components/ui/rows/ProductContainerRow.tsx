import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { numberFormat } from "../../../lib/helpers/formatters";
import { Product } from "../../../lib/types/products";

// styling
import styles from "../../../styles/Main.module.css";
import Underline from "../Underline";

export interface ColFromList {
    width: string,
    html: string,
    id: number
}

export const ProductContainerRow: FunctionComponent<any>  = ({p}) => {

    const PRODUCT: Product = p;
    const { title, status, options, price, collections, tags, images } = PRODUCT;

    const URL = images && images[0] ? images[0].url : "https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png";

    return (
        <Link 
            style={{
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "1rem 0",
                color: "gray"
            }}
            key={p.id}
            className={`${styles.row}`}
            href={`/products/p/${p.id}`}>
            <div 
                style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    // padding: "1rem 0",
                    color: "gray"
                }}
                key={p.id}
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
                        justifyContent: "flex-start",
                        alignItems: "center", 
                    }} 
                    className={`${styles.row} ${styles.rowOneMobile}`}>
                    <div className={`${styles.col}`} style={{
                        paddingRight: window?.innerWidth > 720 ? "1rem" : 0,
                        width: 'auto',
                        justifySelf: "center"}}>
                        <Image 
                            style={{borderRadius: "3px", border: "1px solid black"}}
                            src={URL}
                            alt={"imPowered Logo"}
                            width={35}
                            height={35}
                        />
                    </div>
                    <div className={`${styles.col}`} >
                        <span 
                            style={{
                                fontSize: "1rem",
                            }}>{title}</span>
                        <div 
                            style={{
                                fontSize: "1rem",
                                justifyContent: "flex-start"
                            }}
                            className={`${styles.row}`}>
                            {options?.options1.map((option, i) => (<p key={option} className={`${styles.rowSubHead}`}>{option} {i != options.options1.length-1 ? ", " : ""}</p>) )}
                        </div>
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
                    }}>{numberFormat(Number(price)/100)}</span>
                    {status ? <p
                        style={{
                            background: "#aff2af",
                            border: "1px solid #7aff7a",
                            color: "gray"
                        }} className={`${styles.statusSubHead}`}>Active</p> : <p className={`${styles.statusSubHead}`}>Drafted</p> }
                </div>
                <div 
                    style={{
                        width: "30%",
                        justifyContent: "flex-start",
                        overflow: "hidden"
                    }} 
                    className={`${styles.row} ${styles.noneMobile}`}>
                    {collections?.map((collection, i) => (<p key={collection} className={`${styles.tagRowItem}`}>{collection}{i != collections.length-1 ? ", " : ""}</p>) )}
                </div>
                <div 
                    style={{
                        width: "20%",
                        justifyContent: "flex-start"
                    }} 
                    className={`${styles.row} ${styles.noneMobile}`}>
                    {tags?.map((tag, i) => (<p key={tag}>{tag}{i != tags.length-1 ? ", " : ""}</p>) )}
                </div>
            </div>
        </Link>
    )
}