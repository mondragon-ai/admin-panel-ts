import styles from "../../styles/Main.module.css";
import data_styles from "../../styles/Analytics.module.css";
// import { GetServerSideProps } from "next";
import {  DailyFunnel, FunnelAnalytics } from "../../lib/types/analytics";
import { FunctionComponent } from "react";
import { numberFormat, percentageFormatter } from "../../lib/helpers/formatters";

const AllPageViews = "10,829";
const UniquePageViews = "9,124";

const upsellPageViews = "590";
const upsellUniquePageViews = "280";

const AllOrderOpt = "6,727";
const orderOptRate = "73.83%";

const upsellOpt = "0";
const upsellOptRate = "0.00%";

const oderSalesCount = "781";
const orderSalesRate = "8.56%";
const orderSalesValue = "$21,344.32";

const upsellSalesCount = "173";
const upsellSalesRate = "61.79";
const upsellSalesValue = "$1,557.00";

const oderEarning = "$1.97";
const oderEarningUnique = "$2.34";

const upsellEarning = "$4.17";
const upsellEarningUnique = "$5.56";

type Props = {
    ANALYTICS: FunnelAnalytics
}

export const FunnelStats: FunctionComponent<Props> = ({ANALYTICS}) => {

    const {
        total_aov,
        total_earnings,
        total_orders,
        total_sales,
        steps
    } = ANALYTICS;

    // const urr = total_aov != undefined ? (upsell_recurring_value/100) : 0;
    // const orr = total_aov != undefined ? (order_recurring_value/100) : 0;

    // const osv = total_aov != undefined ? (order_sales_value/100) : 0;
    // const usv = total_aov != undefined ? (upsell_sales_value/100) : 0;

    // const usr = total_aov != undefined ? (upsell_sales_rate/100) : 0;
    // const uor = total_aov != undefined ? (upsell_opt_in_rate/100) : 0;


    steps.forEach(step => {
        
    })

    return (
        <div style={{ marginTop: "1rem"}} className={`${styles.col} ${styles.card}`}>
            <div style={{ marginTop: "1rem", overflowX: "scroll" }}  className={`${styles.col} ${styles.funnelDetailStats}`}>
                <header className={`${styles.row}`} style={{ alignItems: "flex-end"}}>

                    <section style={{ width: "20%", alignItems: "flex-end", height: "100%"}} className={`${styles.col}`}>
                        {
                            
                            steps && steps.length > 0 ? steps.map(step => {
                                return (
                                    <div style={{padding: "1rem"}} className={`${styles.row}`}>
                                        <div className={`${styles.row}`} style={{justifyContent: "space-between"}} >
                                            <h4>{String(step.name).replaceAll("_", " ").toLocaleLowerCase()}</h4>
                                            <h4>{String(step.order)}</h4>
                                        </div>
                                    </div>
                                )
                            }) : null
                        }
                    </section>

                    <section style={{ width: "80%" }} className={`${styles.row} `}>
                        <div className={`${styles.col} ${data_styles.funnelQuickStatsHeader}`} style={{background: "#714955",  width: "15%",borderTopLeftRadius: "6px", borderBottomLeftRadius: "6px", color: "white"}}>
                            <h5 style={{paddingLeft: "1rem"}}>Page Views</h5>
                            <div className={`${styles.row}`} style={{paddingLeft: "1rem"}}>
                                <div className={`${styles.col}`}>
                                    <h5>All</h5>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h5>Unique</h5>
                                </div>
                            </div>
                            {
                                steps && steps.length > 0 ? steps.map(step => {
                                   return (
                                    <div className={`${styles.row}`} style={{background: "rgb(141 92 107)"}}>
                                        <div className={`${styles.col}`}>
                                            <h4>{step.page_views ? step.page_views : 0}</h4>
                                        </div>
                                        <div className={`${styles.col}`}>
                                            <h4>{step.unique_page_views ? step.unique_page_views : 0}</h4>
                                        </div>
                                    </div> )
                                }) : null
                            }
                        </div>

                        {
                            <div className={`${styles.col} ${data_styles.funnelQuickStatsHeader}`}  style={{background: "#7B886B", color: "white", width: "15%"}}>
                                <h5>Opt-Ins</h5>
                                <div className={`${styles.row}`}>
                                    <div className={`${styles.col}`}>
                                        <h5>All</h5>
                                    </div>
                                    <div className={`${styles.col}`}>
                                        <h5>Rate</h5>
                                    </div>
                                </div>
                                {
                                    steps && steps.length > 0 ? steps.map(step => {
                                    return (
                                        
                                        <div className={`${styles.row}`} style={{background: "rgb(142 157 123)"}}>
                                            <div className={`${styles.col}`}>
                                                <h4>{step.opt_ins ? step.opt_ins : 0}</h4>
                                            </div>
                                            <div className={`${styles.col}`}>
                                                <h4>{percentageFormatter(step.opt_in_rate)}</h4>
                                            </div>
                                        </div>)
                                    }) : null
                                }

                            </div>
                        }

                        <div className={`${styles.col} ${data_styles.funnelQuickStatsHeader}`}  style={{background: "#88BB92", color: "#373737", width: "40%"}}>
                            <h5>Sales</h5>
                            <div className={`${styles.row}`}>
                                <div className={`${styles.col} `}>
                                    <h5>Count</h5>
                                </div>
                                <div className={`${styles.col} `}>
                                    <h5>Rate</h5>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h5>Value</h5>
                                </div>
                            </div>

                            {
                                    steps && steps.length > 0 ? steps.map(step => {
                                    return (
                                        
                                        <div className={`${styles.row}`} style={{background: "rgb(157 215 169)"}}>
                                            <div className={`${styles.col}`}>
                                                <h4>{step.sales_count ? step.sales_count : 0}</h4>
                                            </div>
                                            <div className={`${styles.col}`}>
                                                <h4>{step.sales_rate ? percentageFormatter(step.sales_rate) : percentageFormatter(0)}</h4>
                                            </div>
                                            <div className={`${styles.col}`}>
                                                <h4>{step.sales_value ? numberFormat(step.sales_value) : numberFormat(0)}</h4>
                                            </div>
                                        </div>)
                                    }) : null
                            }
                        </div>

                        <div className={`${styles.col} ${data_styles.funnelQuickStatsHeader}`}  style={{background: "#94DDBC",  color: "#373737", width: "15%"}}>
                            <h5>Recurring</h5>
                            <div className={`${styles.row}`}>
                                <div className={`${styles.col} `}>
                                    <h5>Count</h5>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h5>Value</h5>
                                </div>
                            </div>
                            {
                                    steps && steps.length > 0 ? steps.map(step => {
                                    return (
                                        
                                        <div className={`${styles.row}`} style={{background: "rgb(168 255 216)"}}>
                                            <div className={`${styles.col}`}>
                                                <h4>{step.recurring_count ? step.recurring_count : 0}</h4>
                                            </div>
                                            <div className={`${styles.col}`}>
                                                <h4>{step.recurring_value ? numberFormat(step.recurring_value) : numberFormat(0)}</h4>
                                            </div>
                                        </div>)
                                    }) : null
                            }
                        </div>

                        <div className={`${styles.col} ${data_styles.funnelQuickStatsHeader}`}  style={{background: "#A0ECD0", width: "15%",  color: "#373737", borderBottomRightRadius: "6px",  borderTopRightRadius: "6px"}}>
                            <h5>Earnings / PV</h5>
                            <div className={`${styles.row} `}>
                                <div className={`${styles.col} `}>
                                    <h5>All</h5>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h5>Unique</h5>
                                </div>
                            </div>
                            {
                                steps && steps.length > 0 ? steps.map(step => {
                                if (step.name === "CONFIRMED") {
                                    return (
                                        <div className={`${styles.row}`} style={{background: "rgb(174 255 225)"}}>
                                            <div className={`${styles.col}`}>
                                                <h4> - </h4>
                                            </div>
                                            <div className={`${styles.col}`}>
                                                <h4> - </h4>
                                            </div>
                                        </div>)
                                } else {
                                    return (
                                        <div className={`${styles.row}`} style={{background: "rgb(174 255 225)"}}>
                                            <div className={`${styles.col}`}>
                                                <h4>{step.recurring_count ? numberFormat(step.recurring_count/100) : numberFormat(0/100)}</h4>
                                            </div>
                                            <div className={`${styles.col}`}>
                                                <h4>{step.recurring_value ? numberFormat(step.recurring_value/100) : numberFormat(0/100)}</h4>
                                            </div>
                                        </div>
                                    )
                                }
                                }) : null
                            }
                        </div>
                    </section>
                </header>
            </div>
        </div>
    )
}