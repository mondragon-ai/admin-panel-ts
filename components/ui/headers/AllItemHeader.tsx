import styles from "../../../styles/Main.module.css";

// components
import { FunctionComponent } from "react";

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
/**
 * Sub Header for page to show all [items] in collection of rows.
 * @param title: string 
 * @param createTxt: string 
 * @param createPage: string
 * @returns 
 */
export const AllItemHeader: FunctionComponent<Props> = ({
    title,
    createTxt,
    createPage,
}) => {
    return (
        <header className={`${styles.row} ${styles.allItemHeader}`}>
            <div className={`${styles.row}`}>
                <h2 className={`${saira.className} ${styles.allItemHeaderText}`}>{title}</h2>
            </div>
            <div className={`${styles.row}`}>
                {/* <div className={`${styles.col}`}>
                    <Link href={createPage}>
                        <button>{createTxt}</button>
                    </Link>
                </div> */}
                <div className={`${styles.col}`}>
                    <Link href={createPage}>
                        <button>{createTxt}</button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default AllItemHeader;