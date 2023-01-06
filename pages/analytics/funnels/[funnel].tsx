import styles from "../../../styles/Main.module.css";
import {AnalyticsHeader} from "../../../components/ui/headers/AnalyticsHeader";
import { FunnelStats } from "../../../components/ui/FunnelStats";
import { GetServerSideProps } from "next";
import { impoweredRequest } from "../../../lib/helpers/requests";
import { DailyFunnel, FunnelAnalytics } from "../../../lib/types/analytics";
import { numberFormat } from "../../../lib/helpers/formatters";
import { ParsedUrlQuery } from "querystring";

export  const FunnelDailyAnalytics = (props: any) => {

    console.log(" ==> CLIENT SIDE");
    const ANALYTICS: FunnelAnalytics = props.data;
    console.log(ANALYTICS);



    if (!ANALYTICS) {
        throw new Error("DATA NOT FOUND. RELOAD");
        
    }
    
    const {
        total_sales,
        total_aov,
        total_earnings,
    } = ANALYTICS;


    return (
        <div className={`${styles.col}`}>
            <AnalyticsHeader title="Funnel Analytics" createTxt="" createPage=""/> 
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.col} ${styles.card} `}>
                    <div 
                        style={{
                            alignItems: "center"
                        }}
                        className={`${styles.row} ${styles.mobileContainer}`}>
                        <div 
                            style={{
                                alignItems: window.innerWidth < 720 ? "center" : "",
                                justifyContent: window.innerWidth < 720 ? "center" : "",
                            }}
                            className={`${styles.col}`}>
                            <h5>Earning Per Click</h5>
                            <h2>{total_earnings ? numberFormat(total_earnings/100) : numberFormat(0)}</h2>
                        </div>
                        <div 
                            style={{
                                margin: "1rem auto",
                                alignItems: window.innerWidth < 720 ? "center" : "",
                                justifyContent: window.innerWidth < 720 ? "center" : "",
                            }}
                            className={`${styles.col}`}>
                            <h5>Gross Sales</h5>
                            <h2>{total_sales ? numberFormat(total_sales/100) : numberFormat(0)}</h2>
                        </div>
                        <div 
                            style={{
                                alignItems: window.innerWidth < 720 ? "center" : "",
                                justifyContent: window.innerWidth < 720 ? "center" : "",
                            }}
                            className={`${styles.col}`}>
                            <h5>Average Cart Values</h5>
                            <h2>{total_aov ? numberFormat(total_aov/100) : numberFormat(0)}</h2>
                        </div>
                    </div>
                </div>
                <FunnelStats ANALYTICS={ANALYTICS} />
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { funnel } = params as ParsedUrlQuery;
    const LIVE_SERVER = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/analytics/funnels";
    // const DEV_SERVER = "http://localhost:5001/impowered-funnel/us-central1/funnel/analytics/funnels";
    const result = await impoweredRequest(LIVE_SERVER, "POST",{fun_uuid: funnel});

    if (!result) {
        throw new Error("Fetching anaytics");
    }

    console.log(" ==> SERVER SIDE");
    console.log(result);

    return {
        props: result
    }
}

export default FunnelDailyAnalytics;