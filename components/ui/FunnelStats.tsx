import styles from "../../styles/Main.module.css";
import data_styles from "../../styles/Analytics.module.css";
// import { GetServerSideProps } from "next";
import {  DailyFunnel } from "../../lib/types/analytics";
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
    ANALYTICS: DailyFunnel
}

export const FunnelStats: FunctionComponent<Props> = ({ANALYTICS}) => {

    const {
        order_page_views,
        order_unique_page_views,
        order_opt_ins,
        order_opt_in_rate,
        order_sales_count,
        order_sales_rate,
        order_sales_value,
        order_recurring_count,
        order_recurring_value,
        order_earnings,
        order_earnings_unique,
        upsell_earnings,
        upsell_earnings_unique,
        upsell_recurring_count,
        upsell_recurring_value,
        upsell_sales_value,
        upsell_sales_rate,
        upsell_sales_count,
        upsell_opt_in_rate,
        upsell_opt_ins,
        upsell_unique_page_views,
        upsell_page_views,
        confirm_page_view,
        confirm_unique_page_view
    } = ANALYTICS;

    const urr = upsell_recurring_value != undefined ? (upsell_recurring_value/100) : 0;
    const orr = order_recurring_value != undefined ? (order_recurring_value/100) : 0;

    const osv = order_sales_value != undefined ? (order_sales_value/100) : 0;
    const usv = upsell_sales_value != undefined ? (upsell_sales_value/100) : 0;

    const usr = upsell_sales_rate != undefined ? (upsell_sales_rate/100) : 0;
    const uor = upsell_opt_in_rate != undefined ? (upsell_opt_in_rate/100) : 0;

    return (
        <div style={{ marginTop: "1rem"}} className={`${styles.col} ${styles.card}`}>
            <div style={{ marginTop: "1rem", overflowX: "scroll" }}  className={`${styles.col} ${styles.funnelDetailStats}`}>
                <header className={`${styles.row}`}>
                    <section style={{ width: "20%", justifyContent: "flex-end", height: "100%"}} className={`${styles.col}`}>
                        <div style={{padding: "1rem"}}  className={`${styles.row}`}>
                            <div className={`${styles.col}`}>
                                <h4>Order Forms</h4>
                            </div>
                        </div>
                        <div style={{padding: "1rem"}} className={`${styles.row}`}>
                            <div className={`${styles.col}`}>
                                <h4>Upsell</h4>
                            </div>
                        </div>
                        <div style={{padding: "1rem"}} className={`${styles.row}`}>
                            <div className={`${styles.col}`}>
                                <h4>Confirmation</h4>
                            </div>
                        </div>
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
                            <div className={`${styles.row}`} style={{background: "rgb(141 92 107)"}}>
                                <div className={`${styles.col}`}>
                                    <h4>{order_page_views ? order_page_views : "0"}</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>{order_unique_page_views ? order_unique_page_views : "0"}</h4>
                                </div>
                            </div>
                            <div className={`${styles.row}`} style={{background: "rgb(141 92 107)"}}>
                                <div className={`${styles.col}`}>
                                    <h4>{upsell_page_views ? upsell_page_views : "0"}</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>{upsell_unique_page_views ? upsell_unique_page_views : "0"}</h4>
                                </div>
                            </div>
                            <div className={`${styles.row}`} style={{background: "rgb(141 92 107)"}}>
                                <div className={`${styles.col}`}>
                                    <h4>{confirm_page_view ? confirm_page_view : '0'}</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>{confirm_unique_page_view ? confirm_unique_page_view : "0"}</h4>
                                </div>
                            </div>
                        </div>
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
                            <div className={`${styles.row}`} style={{background: "rgb(142 157 123)"}}>
                                <div className={`${styles.col}`}>
                                    <h4>{order_opt_ins ? order_opt_ins : "0"}</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>{percentageFormatter(order_opt_in_rate)}</h4>
                                </div>
                            </div>
                            <div className={`${styles.row}`} style={{background: "rgb(142 157 123)"}}>
                                <div className={`${styles.col}`}>
                                    <h4>{upsell_opt_ins ? upsell_opt_ins : "0"}</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>{percentageFormatter(uor)}</h4>
                                </div>
                            </div>
                            <div className={`${styles.row}`} style={{background: "rgb(142 157 123)"}}>
                                <div className={`${styles.col}`}>
                                    <h4>-</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>-</h4>
                                </div>
                            </div>
                        </div>
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
                            <div className={`${styles.row}`} style={{background: "rgb(157 215 169)"}}>
                                <div className={`${styles.col}`}>
                                    <h4>{order_sales_count ? order_sales_count : "0"}</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>{percentageFormatter(order_sales_rate)}</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>{numberFormat(osv)}</h4>
                                </div>
                            </div>
                            <div className={`${styles.row}`} style={{background: "rgb(157 215 169)"}}>
                                <div className={`${styles.col}`}>
                                    <h4>{upsell_sales_count ? upsell_sales_count : "0"}</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>{percentageFormatter(usr)}</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>{numberFormat(usv)}</h4>
                                </div>
                            </div>
                            <div className={`${styles.row}`} style={{background: "rgb(157 215 169)"}}>
                                <div className={`${styles.col}`}>
                                    <h4>-</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>-</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>-</h4>
                                </div>
                            </div>
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
                            <div className={`${styles.row}`} style={{background: "rgb(168 255 216)"}}>
                                <div className={`${styles.col}`}>
                                    <h4>{order_recurring_count ? order_recurring_count : "0"}</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>{numberFormat(orr)}</h4>
                                </div>
                            </div>
                            <div className={`${styles.row}`} style={{background: "rgb(168 255 216)"}}>
                                <div className={`${styles.col}`}>
                                    <h4>{upsell_recurring_count ? upsell_recurring_count : "0"}</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>{numberFormat(urr)}</h4>
                                </div>
                            </div>
                            <div className={`${styles.row}`} style={{background: "rgb(168 255 216)"}}>
                                <div className={`${styles.col}`}>
                                    <h4>-</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>-</h4>
                                </div>
                            </div>
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
                            <div className={`${styles.row}`} style={{background: "rgb(174 255 225)"}}>
                                <div className={`${styles.col}`}>
                                    <h4>{numberFormat(order_earnings/100)}</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>{numberFormat(order_earnings_unique/100)}</h4>
                                </div>
                            </div>
                            <div className={`${styles.row}`} style={{background: "rgb(174 255 225)"}}>
                                <div className={`${styles.col}`}>
                                    <h4>{numberFormat(upsell_earnings/100)}</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>{numberFormat(upsell_earnings_unique/100)}</h4>
                                </div>
                            </div>
                            <div className={`${styles.row}`} style={{background: "rgb(174 255 225)",  borderBottomRightRadius: "6px"}}>
                                <div className={`${styles.col}`}>
                                    <h4>-</h4>
                                </div>
                                <div className={`${styles.col}`}>
                                    <h4>-</h4>
                                </div>
                            </div>
                        </div>
                    </section>

                </header>
            </div>
        </div>
    )
}