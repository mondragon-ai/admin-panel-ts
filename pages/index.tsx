import Head from 'next/head'
import AllItemHeader from '../components/ui/headers/AllItemHeader'
import styles from '../styles/Main.module.css'

// Fonts
import { 
  Saira_Extra_Condensed,
} from '@next/font/google';
import * as crypto from 'crypto';
import Link from 'next/link';
import { Card } from '../components/ui/Card';
import { numberFormat } from '../lib/helpers/formatters';
import { GetServerSideProps } from 'next';
import { impoweredRequest } from '../lib/helpers/requests';
import { Analytics } from '../lib/types/analytics';
import { useState } from 'react';

// const saira = Saira_Extra_Condensed({
//   weight: "400",
// })

// const TOTAL_SALES = "$420,069.89";
// const TOTAL_ORDERS = "159";

// const TOTAL_SESSIONS = "750";
// const TOTAL_CARTS = "234";
// const TOTAL_CHECKOUTS = TOTAL_ORDERS;

const RETURNS = "-173.31"

// const TOTAL_ORDERS_ONLINE = "98";
// const TOTAL_SALES_ONLINE = "$23,150.93";

// const TOTAL_ORDERS_FUNNELS = "47";
// const TOTAL_SALES_FUNNELS = "$13,804.56";

// const TOTAL_ORDERS_TAPCART = "15";
// const TOTAL_CHECKOUTS_TAPCART = "$2,123.04";

// const TOP_SELLERS = [
//   {
//     title: "Hoodie",
//     id: crypto.randomBytes(10).toString('hex'),
//     url: "",
//     order_count: 1233,
//     view_count: 21235
//   },
//   {
//     title: "Strawberry Gummies",
//     id: crypto.randomBytes(10).toString('hex'),
//     url: "",
//     order_count: 1233,
//     view_count: 21235
//   },
//   {
//     title: "1776 Shirt",
//     id: crypto.randomBytes(10).toString('hex'),
//     url: "",
//     order_count: 1233,
//     view_count: 21235
//   }
// ]



export type DailyAnalyticsProp = {
  daily: Analytics
}


const PREV_TOTAL_CHECKOUTS = "706";
const PREV_TOTAL_SESSIONS = "12000";

export default function Home({daily}: DailyAnalyticsProp) {
  
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
      <Head>
        <title>Impowered App</title>
        <meta name="description" content="Empowering entrepreneurs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AllItemHeader 
          title={"Home Dashboard"}
          createTxt={"View Report"}
          createPage={"/analytics/daily"}
          />

      <main className={`${styles.col} ${styles.container}`}>
        <div className={`${styles.row} ${styles.mobileContainer} ${styles.analyticCard}`}>
          <section className={`${styles.col} ${styles.oneThird}`}>

            <Card 
            
              card_type={"DEFAULT"}
              title='Total Sales'
              header={numberFormat(Number(total_daily_sales))}
              subHeader={PREV_SALE_RATE > 0 ? Number(PREV_SALE_RATE)  :  Number(PREV_SALE_RATE) }>
              <div className={`${styles.row}`}>
                <p>Total Orders: <b>{numberFormat(Number(total_daily_orders))}</b></p>
                <Link className={styles.linkText} href={"/analytics/daily"}><p>View Details</p></Link>
              </div>
            </Card>
          </section>
          <section className={`${styles.col} ${styles.oneThird}`}>
            <Card 
              title='Current Conversions'
              header={"" + SALE_RATE + "%"}
              subHeader={"Sales Conversions"}>
              <div className={styles.col}>
                <div className={`${styles.row}`}>
                    <p style={{width: "50%", fontWeight: "100"}}>
                    Figure
                    </p>
                    <p style={{width: "20%", fontWeight: "100"}}>
                    Rate
                    </p>
                    <p style={{width: "20%", fontWeight: "100"}}>
                    Sales
                    </p>
                </div>
                <div className={`${styles.row}`}>
                  <p style={{width: "50%"}}>Total Sessions: </p>
                  <p style={{width: "20%"}}>-</p>
                  <p style={{width: "20%"}}><b>{numberFormat(Number(total_daily_sessions))}</b></p>
                </div>
                <div className={`${styles.row}`}>
                  <p style={{width: "50%"}}>Total Carts: </p>
                  <p style={{width: "20%"}}>{cartRate}%</p>
                  <p style={{width: "20%"}}><b>{numberFormat(Number(total_daily_carts))}</b></p>
                </div>
                <div className={`${styles.row}`}>
                  <p style={{width: "50%"}}>Total Checkouts: </p>
                  <p style={{width: "20%"}}>{SALE_RATE}%</p>
                  <p style={{width: "20%"}}><b>{numberFormat(Number(total_daily_checkouts))}</b></p>
                </div>
              </div>
            </Card>
          </section>
          <section className={`${styles.col} ${styles.oneThird}`}>
            <Card
              title='Sales Breakdown'
              header={numberFormat(Number(0))}
              subHeader={"Returns"}>
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
                  <p style={{width: "20%"}}>{total_online_orders} orders</p>
                  <p style={{width: "20%"}}><b>{total_online_sales}</b></p>
                </div>
                <div className={`${styles.row}`}>
                  <p style={{width: "50%"}}>Funnels </p>
                  <p style={{width: "20%"}}>{total_funnel_orders} orders</p>
                  <p style={{width: "20%"}}><b>{total_funnel_sales}</b></p>
                </div>
                <div className={`${styles.row}`}>
                  <p style={{width: "50%"}}>Tap Cart </p>
                  <p style={{width: "20%"}}>{total_daily_orders} orders</p>
                  <p style={{width: "20%"}}><b>{total_funnel_sales}</b></p>
                </div>
              </div>
            </Card>
          </section>
        </div>
        <div className={`${styles.row} ${styles.mobileContainer} ${styles.analyticCard}`}>
          <section className={`${styles.col} ${styles.oneThird}`}></section>
          <section style={{width: "66%"}} className={`${styles.col} ${styles.twoThird}`}>
            <Card title='Viewed The Most' header={"-"}>
              <div className={styles.col}>
                <div className={`${styles.row}`}>
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
                    <div key={product.id} className={`${styles.row}  ${styles.topSellers}`}>
                      <Link href={`/products/${product.id}`} className={`${styles.row}`}>
                        <p style={{width: "50%"}}>{product.title}</p>
                        <p style={{width: "20%"}}>{product.view_count}</p>
                        <p style={{width: "20%"}}><b>{product.total_orders}</b></p>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </Card>
          </section>

        </div>
      </main>

      <footer className={`${styles.col}`}>
        
      </footer>
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

