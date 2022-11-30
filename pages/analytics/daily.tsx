import Link from "next/link";
import { Card } from "../../components/ui/Card";
import { numberFormat } from "../../lib/helpers/formatters";
import styles from "../../styles/Main.module.css";

const TOTAL_SALES = "420069.89";
const PREV_TOTAL_SALES = "410000.89";
let T_SALES_DIFF = 1 - (Number(PREV_TOTAL_SALES) / Number(TOTAL_SALES));
T_SALES_DIFF = Number((T_SALES_DIFF));


const TOTAL_ORDERS = "159";

const TOTAL_SESSIONS = "750";
const PREV_TOTAL_SESSIONS = "89";
const TOTAL_CARTS = "234";
const TOTAL_CHECKOUTS = TOTAL_ORDERS;
const PREV_TOTAL_CHECKOUTS = "206";

const RETURNS = "-173.31"

const TOTAL_AOV = "28.78"
const PREV_TOTAL_AOV = "36.56"
let T_AOV_DIFF = 1 - (Number(PREV_TOTAL_AOV) / Number(TOTAL_AOV));
T_AOV_DIFF = Number((T_AOV_DIFF));

const TOTAL_ORDERS_ONLINE = "98";
const TOTAL_SALES_ONLINE = "23150.93";

const TOTAL_ORDERS_FUNNELS = "47";
const TOTAL_SALES_FUNNELS = "13804.56";

const TOTAL_ORDERS_TAPCART = "15";
const TOTAL_CHECKOUTS_TAPCART = "2123.04";


import * as crypto from "crypto";
import { AnalyticsHeader } from "../../components/ui/headers/AnalyticsHeader";
import Underline from "../../components/ui/Underline";

const TOP_SELLERS = [
  {
    title: "Hoodie",
    id: crypto.randomBytes(10).toString('hex'),
    url: "",
    order_count: 1233,
    view_count: 21235
  },
  {
    title: "Strawberry Gummies",
    id: crypto.randomBytes(10).toString('hex'),
    url: "",
    order_count: 1233,
    view_count: 21235
  },
  {
    title: "1776 Shirt",
    id: crypto.randomBytes(10).toString('hex'),
    url: "",
    order_count: 1233,
    view_count: 21235
  }
]

export default function Daily() {

  const cartRate = Math.round((Number(TOTAL_CARTS) / Number(TOTAL_SESSIONS))*1000) / 100;
  const SALE_RATE = Math.round((Number(TOTAL_CHECKOUTS) / Number(TOTAL_SESSIONS))*1000) / 100;

  const PREV_SALE_RATE = Number(PREV_TOTAL_CHECKOUTS) / Number(PREV_TOTAL_SESSIONS);

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
                                header={numberFormat(Number(TOTAL_SALES))}
                                subHeader={ T_SALES_DIFF > 0 ?  Number(T_SALES_DIFF) :  Number(T_SALES_DIFF) }>
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
                                    <p style={{width: "20%"}}>{TOTAL_ORDERS_ONLINE} orders</p>
                                    <p style={{width: "20%"}}><b>{ numberFormat(Number(TOTAL_SALES_ONLINE)) }</b></p>
                                    </div>
                                    <div className={`${styles.row}`}>
                                    <p style={{width: "50%"}}>Funnels </p>
                                    <p style={{width: "20%"}}>{TOTAL_ORDERS_FUNNELS} orders</p>
                                    <p style={{width: "20%"}}><b>{numberFormat(Number(TOTAL_SALES_FUNNELS))}</b></p>
                                    </div>
                                    <div className={`${styles.row}`}>
                                    <p style={{width: "50%"}}>Tap Cart </p>
                                    <p style={{width: "20%"}}>{TOTAL_ORDERS_TAPCART} orders</p>
                                    <p style={{width: "20%"}}><b>{numberFormat(Number(TOTAL_CHECKOUTS_TAPCART))}</b></p>
                                    </div>
                                </div>
                            </Card>     
                        </div>
                        <div  className={`${styles.col} ${styles.oneThird}`}>
                            <Card 
                                card_type={"DEFAULT"}
                                title='Average Order Value'
                                header={numberFormat(Number(TOTAL_AOV))}
                                subHeader={ T_AOV_DIFF > 0 ?  Number(T_AOV_DIFF) :  Number(T_AOV_DIFF) }>
                                <div className={`${styles.col}`}>
                                    <div className={`${styles.row}`}>
                                        <p>Total Orders: <b>{TOTAL_ORDERS}</b></p>
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
                                <p style={{width: "20%"}}><b>{TOTAL_SESSIONS}</b></p>
                                </div>
                                <div className={`${styles.row}`}>
                                <p style={{width: "50%"}}>Total Carts: </p>
                                <p style={{width: "20%"}}>{cartRate}%</p>
                                <p style={{width: "20%"}}><b>{TOTAL_CARTS}</b></p>
                                </div>
                                <div className={`${styles.row}`}>
                                <p style={{width: "50%"}}>Total Checkouts: </p>
                                <p style={{width: "20%"}}>{SALE_RATE}%</p>
                                <p style={{width: "20%"}}><b>{TOTAL_CHECKOUTS}</b></p>
                                </div>
                            </div>
                            </Card>
                        </div>
                    </div>

                    <div style={{paddingTop: "1rem"}} className={`${styles.row} ${styles.mobileContainer} ${styles.analyticCard}`}>
                        <div className={`${styles.col} ${styles.oneThird}`}>
                        <Card title='Viewed The Most' header={TOP_SELLERS[0].title}>
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
                            {TOP_SELLERS && TOP_SELLERS.map(product => {
                                return (
                                <div key={product.id} className={`${styles.row} ${styles.topSellers}`}>
                                    <Link href={`/products/${product.id}`} className={`${styles.row}`}>
                                        <p style={{width: "50%"}}>{product.title}</p>
                                        <p style={{width: "20%"}}>{product.view_count}</p>
                                        <p style={{width: "20%"}}><b>{product.order_count}</b></p>
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