import Link from "next/link";
import styles from "../../../styles/Main.module.css";

// Fonts
import { 
    Saira_Extra_Condensed,
} from '@next/font/google'
import { FunctionComponent } from "react";

const saira = Saira_Extra_Condensed({
    weight: "400",
})

interface Props {
    back_route: string,
    title: string,
    special_btn: string,
    special_btn_route: string
}

export const DetailPageHeader: FunctionComponent<Props> = ({
    back_route,
    title,
    special_btn,
    special_btn_route
}) => {
    return (
        <header className={`${styles.row} ${styles.allItemHeader}`}>
            <div 
                style={{
                    justifyContent: "flex-start"
                }}
                className={`${styles.row}`}>
                <Link href={back_route}>
                    <h2>🔙</h2>
                </Link>
                <div style={{
                    textOverflow: "initial",
                    whiteSpace: "nowrap",
                    overflow: "hidden"
                }}>
                    <h2 style={{lineHeight:window.innerWidth > 720 ? "60px" : "inherent", textOverflow: "ellipsis"}}
                        className={`${saira.className} ${styles.detailPageItemHeaderText}`}>{title}</h2>
                </div>
            </div>
            <div className={`${styles.row}`}>
                {/* <div className={`${styles.col}`}>
                    <Link href={createPage}>
                        <button>{createTxt}</button>
                    </Link>
                </div> */}
                <div className={`${styles.col}`}>
                    <Link href={special_btn_route}>
                        <button>{special_btn}</button>
                    </Link>
                </div>
            </div>
        </header>
    )
}