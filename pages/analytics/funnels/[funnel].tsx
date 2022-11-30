import styles from "../../../styles/Main.module.css";
import {AnalyticsHeader} from "../../../components/ui/headers/AnalyticsHeader";
import { FunnelStats } from "../../../components/ui/FunnelStats";
import { GetServerSideProps } from "next";
import { impoweredRequest } from "../../../lib/helpers/requests";
import { Analytics } from "../../../lib/types/analytics";
import { numberFormat } from "../../../lib/helpers/formatters";

export  const FunnelDailyAnalytics = (props: any) => {

    console.log(" ==> CLIENT SIDE");
    const ANALYTICS: Analytics = props.data;
    console.log(ANALYTICS);

    const {
        total_funnel_sales,
        order_sales_count,
        total_funnel_aov,
        order_earnings
    } = ANALYTICS;


    return (
        <div className={`${styles.col}`}>
            <AnalyticsHeader title="Funnel Analytics" createTxt="" createPage=""/> 
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.col} ${styles.card} `}>
                    <div 
                        className={`${styles.row} ${styles.mobileContainer}`}>
                        <div 
                            style={{
                                alignItems: window.innerWidth < 720 ? "center" : "",
                                justifyContent: window.innerWidth < 720 ? "center" : "",
                            }}
                            className={`${styles.col}`}>
                            <h5>Earning Per Click</h5>
                            <h2>{numberFormat(order_earnings/100)}</h2>
                        </div>
                        <div 
                            style={{
                                margin: "1rem auto",
                                alignItems: window.innerWidth < 720 ? "center" : "",
                                justifyContent: window.innerWidth < 720 ? "center" : "",
                            }}
                            className={`${styles.col}`}>
                            <h5>Gross Sales</h5>
                            <h2>{total_funnel_sales ? numberFormat(total_funnel_sales/100) : numberFormat(0)}</h2>
                        </div>
                        <div 
                            style={{
                                alignItems: window.innerWidth < 720 ? "center" : "",
                                justifyContent: window.innerWidth < 720 ? "center" : "",
                            }}
                            className={`${styles.col}`}>
                            <h5>Average Cart Values</h5>
                            <h2>{numberFormat(total_funnel_aov/100)}</h2>
                        </div>
                    </div>
                </div>
                <FunnelStats ANALYTICS={ANALYTICS} />
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const url = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/analytics/funnels";
    const result = await impoweredRequest(url, "GET", null);

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