import Image from "next/image";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import styles from "../../styles/Main.module.css";
import {
    faBars
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const URL = "https://cdn.shopify.com/s/files/1/0574/9263/5817/files/bigly_logo_art_file.png?v=1626380659&width=300";
type Props = {
    state: boolean
    openState: boolean,
    toggleMenu: Dispatch<SetStateAction<boolean>>
}

export const TopBar: FunctionComponent<Props> = ({state, openState, toggleMenu}) => {
    return (
        <header className={`${styles.row} ${styles.topBar} `}>
            <div className={`${styles.row} ${styles.topLeftMobile}`}>
                <div onClick={() => toggleMenu(!openState)}><FontAwesomeIcon icon={faBars} /></div>
                <div><Image src={URL} alt={"imPowered Logo"} width={50} height={35} /></div>
            </div>
            <div className={`${styles.row} ${styles.topLeft}`}>
                <label 
                    className={`${styles.formItem} ${styles.row}`}
                    htmlFor="topSearch">
                    <input
                        type="text"
                        name="topSearch"
                        placeholder="" />
                    <label>🔍 Search here</label>
                </label>
            </div>
            <div className={`${styles.row} ${styles.topRight}`}>
            {   
                state ? <>
                    <div className={`${styles.col} `}>
                        <h5>Logout</h5>

                        <div className={`${styles.row} ${styles.underlineAnimate}`}>
                            <div className={``}></div>
                        </div>
                    </div>
                    <div style={{ borderRadius: "50%"}}>
                        <Image
                            className={styles.userIcon}
                            src={URL}
                            alt={"Profile icon"}
                            width={50}
                            height={50} />
                    </div>
                </> : <div>Enter</div>
            }
            </div>
        </header>
    )
}