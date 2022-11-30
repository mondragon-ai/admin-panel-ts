import { FunctionComponent } from "react";
import styles from "../../../styles/Main.module.css";

export const ItemContainerHeader: FunctionComponent<any> = ({
    rowOneUpper,
    rowOneLower,
    rowTwoUpper,
    rowTwoLower,
    rowThree,
    rowFour
}) => {
    return (
        <div 
            style={{
                justifyContent: "flex-start",
                alignItems: "flex-end",
                paddingBottom: "1rem",
                // borderBottom: "1px solid gray"
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
                    width: "30%"
                }} 
                className={`${styles.col} ${styles.rowOneMobile}`}>
                <span 
                style={{
                    fontSize: "1rem"
                }}>{rowOneUpper}</span>
                <p>{rowOneLower}</p>
            </div>
            <div 
                style={{
                    width: "15%"
                }} 
                className={`${styles.col} ${styles.rowTwoMobile}`}>
                <span 
                style={{
                    fontSize: "1rem"
                }}>{rowTwoUpper}</span>
                <p>{rowTwoLower}</p>
            </div>
            <div 
                style={{
                    width: "30%"
                }} 
                className={`${styles.col} ${styles.noneMobile}`}>
                <p>{rowThree}</p>
            </div>
            <div 
                style={{
                    width: "20%"
                }} 
                className={`${styles.col} ${styles.noneMobile}`}>
                <p>{rowFour}</p>
            </div>
        </div>
    )
}