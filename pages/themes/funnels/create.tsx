import { FunctionComponent, useState } from "react";
import { Card } from "../../../components/ui/Card";
import { DetailPageHeader } from "../../../components/ui/headers/DetailPageHeader";
// import { LineItem, Order } from "../../../lib/types/orders";
import styles from "../../../styles/Main.module.css";

// import * as crypto from "crypto";
// import { VariantRow } from "../../../components/ui/rows/VariantRow";
import Underline from "../../../components/ui/Underline";
// import Link from "next/link";
// import { numberFormat } from "../../../lib/helpers/formatters";
// import { ApiTimeline } from "../../../components/ui/ApiTimeline";
// import { GetServerSideProps } from "next";
// import { ParsedUrlQuery } from "querystring";
// import { impoweredRequest } from "../../../lib/helpers/requests";
// import { user } from "firebase-functions/v1/auth";
import { Funnel } from "../../../lib/types/funnels";
import FormProgress from "../../../components/ui/FormProgress";

const date = new Date().toString(); //.substring(0,15);

type FunnelProps = {
    funnels: Funnel[]
}

type TimeProp = {
    _seconds: 0
}


const s = [
    {
        required: true,
        complete: false,
        active: true,
        title: "Funnel Details",
        step: "STEP_ONE"
    },
    {
        required: true,
        complete: false,
        active: false,
        title: "Steps",
        step: "STEP_TWO"
    },
]

export const FunnelCreate: FunctionComponent<FunnelProps> = () => {

    const [steps, setIndex] = useState(s);
    const [formStep, navForm] = useState("STEP_TWO")

    const [funnel, setFunnel] = useState<Funnel>({
        id: "",
        title: "",
        steps: [
            {
                name: "",
                order: 0
            }
        ],
        total_sales: 0,
        status: false,
        total_aov: 0, 
        total_orders: 0, 
        total_earnings: 0, 
        tags: []
    });


    return (
        <div className={`${styles.col}`}>

            {/* Sub Header - page specific */}
            <div className={`${styles.col} ${styles.container}`} 
                style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <FormProgress steps={steps} formStep={formStep} />
            </div>

            {/* Main container */}
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.row} ${styles.mobileContainer}`}>

                    {/* Left 1/3 Column Container */}
                    <div className={`${styles.oneThird}`}>

                        <Card width={50}
                            title="Funnel Steps"
                            header={""}
                            subHeader={""}
                            card_type="INFO"
                        >
                            <div className={`${styles.col}`}>
                                <div className={`${styles.row}`}>

                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem", width: "80%"}} className={`${styles.row} ${styles.formItem}`}>
                                        <input style={{ width: "auto"}} id="steps" type="text" />
                                        <label htmlFor="steps">Steps</label>
                                    </div>
                                    
                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem", width: "20%"}} className={`${styles.row} ${styles.formItem}`}>
                                        <input style={{ width: "auto"}} id="steps" type="text" />
                                        <label htmlFor="steps">Steps</label>
                                    </div>
                                </div>


                                <div style={{ paddingTop: "1rem"}} className={`${styles.col}`}>
                                    <div style={{ paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <h5>Step Name</h5>
                                        <h5>Order</h5>
                                    </div>
                                </div>

                                {
                                    funnel?.steps && funnel?.steps?.map(step => {
                                        return (
                                            <div style={{ paddingTop: "1rem"}} className={`${styles.col}`}>
                                                <div style={{ paddingBottom: "1rem"}} className={`${styles.row}`}>
                                                    <p style={{paddingTop: "0rem"}}>{step.name}</p>
                                                    <p style={{paddingTop: "0rem"}}>{step.order}</p>
                                                </div>
                                                <Underline width={100} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Card>
                        <Card  width={50}
                            title={""}
                            header={""}
                            subHeader={""}
                            status={false}
                            card_type="INFO"
                        >
                            <div className={`${styles.col}`}>

                            </div>
                        </Card>
                    </div>

                    {/* Right 2/3 Column Container */}
                    <div style={{paddingTop: "0"}} className={`${styles.twoThird} ${styles.col}`}>
                        <Card  
                            width={50}
                            title="Funnel Details"
                            header={""}
                            subHeader={""}
                            card_type="INFO"
                        >
                            <div  className={`${styles.col}`}>
                                
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default FunnelCreate;