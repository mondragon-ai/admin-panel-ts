import Link from "next/link";
import { FunctionComponent } from "react";
import { Product, Scheudle } from "../../../lib/types/products";

// styling
import styles from "../../../styles/Main.module.css";
import Underline from "../Underline";

export interface Props {
    colOneTop: string,
    colOneBottom: string,
    colTwoTop: string | number,
    colTwoBottom: boolean,
    colThree: Scheudle | string,
    colFour: string | string[]
    id: string,
    href: string
}

export const MainRowContainer: FunctionComponent<Props>  = ({
    id,
    colOneTop,
    colOneBottom,
    colTwoTop,
    colTwoBottom,
    colThree,
    colFour,
    href
}) => {

    console.log(colThree)


    return (
        <Link 
            style={{
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "1rem 0",
                color: "gray"
            }}
            key={id}
            className={`${styles.row}`}
            href={`${href}`}>
            <div 
                style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    // padding: "1rem 0",
                    color: "gray"
                }}
                key={id}
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
                        }}>{colOneTop}</span>
                    <div 
                        style={{
                            fontSize: "1rem",
                            justifyContent: "flex-start"
                        }}
                        className={`${styles.row}`}>
                        <p> {colOneBottom}</p>
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
                    }}>{colTwoTop}</span>
                    {colTwoBottom ? <p
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
                    {typeof(colThree) == "string" ?  <p>{colThree == "" ? "-" : colThree}</p>  : 
                        colThree.trial > 0 ?  <p>{
                            colThree.frequency + " " + 
                            colThree.trial 
                        }</p>   : colThree.frequency == "DAILY" ||
                            colThree.frequency == "ANNUALLY" || 
                            colThree.frequency == "MONTHLY" ?  <p>{
                            colThree.frequency + " " + 
                            colThree.date 
                        }</p> : <div>TEST</div> }
                    {/* <p>{colThree}</p> */}
                </div>
                <div 
                    style={{
                        width: "20%",
                        justifyContent: "flex-start"
                    }} 
                    className={`${styles.row} ${styles.noneMobile}`}>
                    {typeof(colFour) != "string" ? colFour?.map((tag, i) => (<p key={tag}>{tag}{i != colFour.length-1 ? ", " : ""}</p>) ) : <p>{colFour}</p>}
                </div>
            </div>
        </Link>
    )
}