import styles from "../../../styles/Main.module.css";
// components
import { FunctionComponent, useState } from "react";

// Fonts
import { 
    Saira_Extra_Condensed,
} from '@next/font/google'
import Link from "next/link";

const saira = Saira_Extra_Condensed({
    weight: "400",
})

// Interface
interface Props {
    title: string,
    createTxt: string,
    createPage: string
}

export const AnalyticsHeader: FunctionComponent<Props> = ({
    title,
    createTxt,
    createPage,
}) => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    return (
        <header className={`${styles.row} ${styles.allItemHeader} ${styles.mobileContainer}`}>
            <div className={`${styles.row}`}>
                <h2 className={`${saira.className} ${styles.allItemHeaderText}`}>{title}</h2>
            </div>
            <div className={`${styles.row}`}
                    style={{
                        overflow: "visible",
                        padding: window.innerWidth > 720 ? "2.3rem 1.5rem 0 0" : "0",
                        margin: window.innerWidth > 720 ? "" : "0",                        
                    }}>
                <div 
                    style={{
                        margin: window.innerWidth > 720 ? "" : "0",                        
                    }}
                    className={`${styles.row} ${styles.analytics}`}>
                    {/* DATE PICKERS -> Lib? */}
                    <label 
                        className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: "40%",
                        }}
                        htmlFor="start">
                        <input
                            onChange={(e) => setStart(e.target.value)}
                            type="start"
                            name="start"
                            placeholder="" />
                        <label style={{ 
                            top: start != "" ? "-5px" : "", 
                            fontSize: start != "" ? "10px" : ""}}>Start Date </label>
                    </label>
                    <label 
                        className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: "40%",
                        }}
                        htmlFor="end">
                        <input
                            onChange={(e) => setEnd(e.target.value)}
                            type="end"
                            name="end"
                            placeholder="" />
                        <label style={{ 
                            top: end != "" ? "-5px" : "", 
                            fontSize: end != "" ? "10px" : ""}}>Start Date </label>
                    </label>
                </div>
            </div>
        </header>
    )
}