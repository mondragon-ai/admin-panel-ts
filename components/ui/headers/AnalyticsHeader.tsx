import styles from "../../../styles/Main.module.css";
// components
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";

// Fonts
import { 
    Saira_Extra_Condensed,
} from '@next/font/google'
// import Link from "next/link";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import '../.././../node_modules/react-date-picker/dist/DatePicker.css';
import { impoweredRequest } from "../../../lib/helpers/requests";
import { useRouter } from "next/router";
import { DailyFunnel, FunnelAnalytics } from "../../../lib/types/analytics";

const saira = Saira_Extra_Condensed({
    weight: "400",
})

// Interface
interface Props {
    title: string,
    setAnalytics: Dispatch<SetStateAction<FunnelAnalytics | any>>,
    ANALYTICS: FunnelAnalytics | any
    fun_uuid: string
}

export const AnalyticsHeader: FunctionComponent<Props> = ({
    title,
    setAnalytics,
    ANALYTICS,
    fun_uuid
}) => {
    const [start, setStart] = useState(new Date(new Date().toString().substring(0,15)));
    const [end, setEnd] = useState(new Date());


    const searchFunnelAnalytics = async () => {
        const payload =  {
            search_data: {
                start: start ? new Date(start.toString()).getTime() / 1000 : 0,
                end: end ? new Date(end.toString()).getTime() / 1000 : 0,
            },
            fun_uuid: fun_uuid
        } 
        const URL = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/analytics/search/funnels";
        const DEV_URL = "http://localhost:5001/impowered-funnel/us-central1/funnel/analytics/search/funnels";

        const response = await impoweredRequest(DEV_URL, "POST", payload);


        console.log(payload);
        if (response && response.data) {
            alert("[SUCCESS] ✅")
            console.log(response)
            setAnalytics({
                ...ANALYTICS,
                ...response.data
            })
        } else {
            alert("[ERROR] 🚨")
            console.log(response)
        }
    }
    const searchAnalytics = async () => {
        const payload =  {
            search_data: {
                start: start ? new Date(start.toString()).getTime() / 1000 : 0,
                end: end ? new Date(end.toString()).getTime() / 1000 : 0,
            },
        } 
        const URL = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/analytics/search";
        const DEV_URL = "http://localhost:5001/impowered-funnel/us-central1/funnel/analytics/search";

        const response = await impoweredRequest(DEV_URL, "POST", payload);


        console.log(payload);
        if (response && response.data) {
            alert("[SUCCESS] ✅")
            console.log(response)
            setAnalytics({
                ...ANALYTICS,
                ...response.data
            })
        } else {
            alert("[ERROR] 🚨")
            console.log(response)
        }
    }
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
                    <div style={{
                        paddingRight: '20px'
                    }}>
                    {
                        start && end && fun_uuid !== "" ? <button onClick={() => searchFunnelAnalytics()}> Search</button> : 
                        start && end && fun_uuid === "" ? <button onClick={() => searchAnalytics()}> Search</button> : null
                    }
                    </div> 
                    <div className={`${styles.col}`}>
                        <DatePicker onChange={setStart} value={start} />
                        {/* {new Date(start.toString()).getTime() / 1000} */}
                    </div>
                    <div className={`${styles.col}`}>
                        <DatePicker onChange={setEnd} value={end} />
                        {/* {new Date(end.toString()).getTime() / 1000} */}
                    </div>
                </div>
            </div>
        </header>
    )
}