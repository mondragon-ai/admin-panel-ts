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

const saira = Saira_Extra_Condensed({
  weight: "400",
})

const TOTAL_SALES = "$420,069.89";
const TOTAL_ORDERS = "159";

const TOTAL_SESSIONS = "750";
const TOTAL_CARTS = "234";
const TOTAL_CHECKOUTS = TOTAL_ORDERS;

const RETURNS = "-173.31"

const TOTAL_ORDERS_ONLINE = "98";
const TOTAL_SALES_ONLINE = "$23,150.93";

const TOTAL_ORDERS_FUNNELS = "47";
const TOTAL_SALES_FUNNELS = "$13,804.56";

const TOTAL_ORDERS_TAPCART = "15";
const TOTAL_CHECKOUTS_TAPCART = "$2,123.04";

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


const PREV_TOTAL_CHECKOUTS = "706";
const PREV_TOTAL_SESSIONS = "12000";

export default function Home() {

  const cartRate = Math.round((Number(TOTAL_CARTS) / Number(TOTAL_SESSIONS))*1000) / 100;
  const SALE_RATE = Math.round((Number(TOTAL_CHECKOUTS) / Number(TOTAL_SESSIONS))*1000) / 100;

  const PREV_SALE_RATE = Number(PREV_TOTAL_CHECKOUTS) / Number(PREV_TOTAL_SESSIONS);

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
              header={TOTAL_SALES}
              subHeader={PREV_SALE_RATE > 0 ? Number(PREV_SALE_RATE)  :  Number(PREV_SALE_RATE) }>
              <div className={`${styles.row}`}>
                <p>Total Orders: <b>{TOTAL_ORDERS}</b></p>
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
                    Name
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
          </section>
          <section className={`${styles.col} ${styles.oneThird}`}>
            <Card
              title='Sales Breakdown'
              header={numberFormat(Number(RETURNS))}
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
                  <p style={{width: "20%"}}>{TOTAL_ORDERS_ONLINE} orders</p>
                  <p style={{width: "20%"}}><b>{TOTAL_SALES_ONLINE}</b></p>
                </div>
                <div className={`${styles.row}`}>
                  <p style={{width: "50%"}}>Funnels </p>
                  <p style={{width: "20%"}}>{TOTAL_ORDERS_FUNNELS} orders</p>
                  <p style={{width: "20%"}}><b>{TOTAL_SALES_FUNNELS}</b></p>
                </div>
                <div className={`${styles.row}`}>
                  <p style={{width: "50%"}}>Tap Cart </p>
                  <p style={{width: "20%"}}>{TOTAL_ORDERS_TAPCART} orders</p>
                  <p style={{width: "20%"}}><b>{TOTAL_CHECKOUTS_TAPCART}</b></p>
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
                {TOP_SELLERS && TOP_SELLERS.map(product => {
                  return (
                    <div key={product.id} className={`${styles.row}  ${styles.topSellers}`}>
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
          </section>

        </div>
      </main>

      <footer className={`${styles.col}`}>
        
      </footer>
    </div>
  )
}
