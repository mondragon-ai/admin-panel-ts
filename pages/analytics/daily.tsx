import Link from "next/link";
import { Card } from "../../components/ui/Card";
import { numberFormat } from "../../lib/helpers/formatters";
import styles from "../../styles/Main.module.css";



// import * as crypto from "crypto";
import { AnalyticsHeader } from "../../components/ui/headers/AnalyticsHeader";
// import Underline from "../../components/ui/Underline";
import { GetServerSideProps } from "next";
import { impoweredRequest } from "../../lib/helpers/requests";
import { Analytics } from "../../lib/types/analytics";
import { FunctionComponent, useState } from "react";

export type DailyAnalyticsProp = {
    daily: Analytics
}

export const Daily: FunctionComponent<DailyAnalyticsProp> = ({daily}) => {

    console.log(" ===> Cllietn Side")
    console.log(daily)

    const [analytics, setAnalytics] = useState(daily)

    const {
        total_daily_carts,
        total_daily_orders,
        total_daily_checkouts,
        total_daily_sessions,
        prev_daily_sales,
        prev_daily_new_sessions,
        prev_daily_checkouts,
        total_daily_sales,
        daily_sales_rate,
        total_funnel_sales,
        total_funnel_orders,
        total_online_sales,
        total_online_orders,
        daily_aov,
        top_sellers,
        prev_daily_aov,
    } = analytics


    const cartRate = Math.round((Number(total_daily_carts ? total_daily_carts : 0) / Number(total_daily_sessions ? total_daily_sessions : 1))*1000) / 100;
    const SALE_RATE = Math.round((Number(total_daily_orders ? total_daily_orders : 0) / Number(total_daily_sessions ? total_daily_sessions : 1))*1000) / 10;

    const PREV_SALE_RATE = Number(prev_daily_checkouts ? prev_daily_checkouts : 0) / Number(prev_daily_new_sessions ? prev_daily_new_sessions : 1);

    let T_AOV_DIFF = (Number(prev_daily_aov ? prev_daily_aov : 0) / Number(daily_aov ? daily_aov : 1));
    T_AOV_DIFF = Number((T_AOV_DIFF));


    return (
        <div className={`${styles.col}`}>
        <AnalyticsHeader title="Analytics" createTxt="" createPage=""/> 
            <main className={`${styles.col}`}>
                <div className={`${styles.col} ${styles.container}`}>
                    <div className={`${styles.row} ${styles.mobileContainer} ${styles.analyticCard}`}>
                        <div className={`${styles.col} ${styles.oneThird}`}>
                            <Card
                                card_type={"DEFAULT"}
                                title='Sales Breakdown'
                                header={numberFormat(Number(total_daily_sales ? (total_daily_sales/100) : 0))}
                                subHeader={  Number(daily_sales_rate ? daily_sales_rate : 0)}>
                                <div className={styles.col}>
                                    <div className={`${styles.row}`}>
                                        <p style={{width: "50%", fontWeight: "100"}}>
                                            Channel
                                        </p>
                                        <p style={{width: "20%", fontWeight: "100"}}>
                                            Total
                                        </p>
                                        <p style={{width: "20%", fontWeight: "100"}}>
                                            Sales
                                        </p>
                                    </div>
                                    <div className={`${styles.row}`}>
                                    <p style={{width: "50%"}}>Online Store </p>
                                    <p style={{width: "20%"}}>{total_online_orders ? total_online_orders : 0} orders</p>
                                    <p style={{width: "20%"}}><b>{ numberFormat(Number(total_online_sales ? total_online_sales : 0)) }</b></p>
                                    </div>
                                    <div className={`${styles.row}`}>
                                    <p style={{width: "50%"}}>Funnels </p>
                                    <p style={{width: "20%"}}>{total_funnel_orders ? total_funnel_orders /10000 : 0} orders</p>
                                    <p style={{width: "20%"}}><b>{numberFormat(Number(total_funnel_sales ? total_funnel_sales / 100 : 0))}</b></p>
                                    </div>
                                    <div className={`${styles.row}`}>
                                    <p style={{width: "50%"}}>Tap Cart </p>
                                    <p style={{width: "20%"}}>{0} orders</p>
                                    <p style={{width: "20%"}}><b>{numberFormat(Number(0))}</b></p>
                                    </div>
                                </div>
                            </Card>     
                        </div>
                        <div  className={`${styles.col} ${styles.oneThird}`}>
                            <Card 
                                card_type={"DEFAULT"}
                                title='Average Order Value'
                                header={numberFormat(Number(daily_aov ? (daily_aov /100) : 0))}
                                subHeader={ T_AOV_DIFF > 0 ?  Number(T_AOV_DIFF) :  Number(T_AOV_DIFF) }>
                                <div className={`${styles.col}`}>
                                    <div className={`${styles.row}`}>
                                        <p>Total Orders: <b>{total_daily_orders ? total_daily_orders : 0}</b></p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className={`${styles.col} ${styles.oneThird}`}>
                            <Card 
                                card_type={"DEFAULT"}
                                title='Current Conversions'
                                header={"" + SALE_RATE + "%"} 
                                subHeader={PREV_SALE_RATE > 0 ? Number(PREV_SALE_RATE)  :  Number(PREV_SALE_RATE) }>
                            <div className={styles.col}>
                                <div className={`${styles.row}`}>
                                    <p style={{width: "50%", fontWeight: "100"}}>
                                        Name
                                    </p>
                                    <p style={{width: "20%", fontWeight: "100"}}>
                                        Rate
                                    </p>
                                    <p style={{width: "20%", fontWeight: "100"}}>
                                        Figure
                                    </p>
                                </div>
                                <div className={`${styles.row}`}>
                                <p style={{width: "50%"}}>Total Sessions: </p>
                                <p style={{width: "20%"}}>-</p>
                                <p style={{width: "20%"}}><b>{total_daily_sessions ? total_daily_sessions : 0}</b></p>
                                </div>
                                <div className={`${styles.row}`}>
                                <p style={{width: "50%"}}>Total Carts: </p>
                                <p style={{width: "20%"}}>{cartRate}%</p>
                                <p style={{width: "20%"}}><b>{total_daily_carts ? total_daily_carts : 0}</b></p>
                                </div>
                                <div className={`${styles.row}`}>
                                <p style={{width: "50%"}}>Total Checkouts: </p>
                                <p style={{width: "20%"}}>{daily_sales_rate ? daily_sales_rate : 0}%</p>
                                <p style={{width: "20%"}}><b>{total_daily_checkouts ? total_daily_checkouts : 0}</b></p>
                                </div>
                            </div>
                            </Card>
                        </div>
                    </div>

                    <div style={{paddingTop: "1rem"}} className={`${styles.row} ${styles.mobileContainer} ${styles.analyticCard}`}>
                        <div className={`${styles.col} ${styles.oneThird}`}>
                        <Card title='Viewed The Most' header={top_sellers?.length > 0 &&  top_sellers[0] ?  top_sellers[0].title : "-"}>
                            <div className={styles.col}>
                            <div style={{paddingTop: "1rem", alignItems: "flex-end"}} className={`${styles.row}`}>
                                <p style={{width: "50%", fontWeight: "100"}}>
                                    Title
                                </p>
                                <p style={{width: "20%", fontWeight: "100"}}>
                                    Total View
                                </p>
                                <p style={{width: "20%", fontWeight: "100"}}>
                                    Total Orders
                                </p>
                            </div>
                            {top_sellers && top_sellers.map(product => {
                                return (
                                <div key={product.title} className={`${styles.row} ${styles.topSellers}`}>
                                    <Link href={`/products/${product.id}`} className={`${styles.row}`}>
                                        <p style={{width: "50%"}}>{product.title}</p>
                                        <p style={{width: "20%"}}>{product.view_count ? product.view_count : 0}</p>
                                        <p style={{width: "20%"}}><b>{product.total_orders ? product.total_orders : 0}</b></p>
                                    </Link>
                                </div>
                                )
                            })}
                            </div>
                        </Card>
                        </div>
                        <div  className={`${styles.col} ${styles.oneThird}`}>
                            {/* <Card title='-' header={"-"}>
                                <div className={`${styles.row}`}>
                                    <p>-</p>
                                    <Link className={styles.linkText} href={"/analytics/daily"}><p>View Details</p></Link>
                                </div>
                            </Card> */}
                        </div>
                        <div  className={`${styles.col} ${styles.oneThird}`}>
                            {/* <Card title='-' header={"-"}>
                                <div className={`${styles.row}`}>
                                    <p>-</p>
                                    <Link className={styles.linkText} href={"/analytics/daily"}><p>View Details</p></Link>
                                </div>
                            </Card> */}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async () => {
    const url = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/analytics/daily";
    const result = await impoweredRequest(url, "GET", {});

    if (!result || result == undefined) {
        throw new Error("Product list error");
    }

    console.log(" ==> SERVER SIDE");
    console.log(result);

    let analytics = {} as Analytics;

    if (result?.data) {
        analytics = {...result?.data};
    }

    console.log(analytics);

    return {
        props: {
            daily: analytics
        }
    }
}


export default Daily;