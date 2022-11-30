import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { filterActive, filterAll } from "../../../lib/helpers/ActiveFilter";
import styles from "../../../styles/Main.module.css";

interface Props {
    list: any[],
    type: "INACTIVE" | "ACTIVE" | "",
    setState: Dispatch<SetStateAction<any[]>>,
    setFilter:  Dispatch<SetStateAction<"INACTIVE" | "ACTIVE" | "">>
}

export const MainRowContainerHeader: FunctionComponent<Props> = ({
    list,
    type,
    setState,
    setFilter
}) => { 

    return (
        <div  className={`${styles.row} ${styles.itemsCardHeader}`}>
            <div 
                style={{ background: type == "" ? "black" : "" }}
                onClick={() => filterAll(list, setState, setFilter)}>
                    <h5>ALL</h5>
            </div>
            <div 
                style={{ background: type == "INACTIVE" ? "black" : "" }}
                onClick={() => filterActive(list, "INACTIVE", setState, setFilter)}>
                    <h5>Draft</h5>
            </div>
            <div
                style={{ background: type == "ACTIVE" ? "black" : "" }}
                onClick={() => filterActive(list, "ACTIVE", setState, setFilter)}>
                    <h5>Active</h5>
            </div>
        </div>
    )
}