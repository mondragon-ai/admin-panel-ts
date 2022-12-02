import Image from "next/image";
import { Card } from "../../components/ui/Card";
import { DetailPageHeader } from "../../components/ui/headers/DetailPageHeader";
import styles from "../../styles/Main.module.css";

const name = "Obi Kanobi";

export const CustomerDetail = () => {
    return (
        <div className={`${styles.col}`}>
        {/* Sub Header - page specific */}
            <DetailPageHeader 
            back_route={"/customers/all"}
            title={name}
            special_btn={"Delete Product"}
            special_btn_route={"/products/all"} />
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.row} ${styles.mobileContainer}`}>
                    <div className={`${styles.col} ${styles.oneThird}`}>
                        <Card
                            card_type="INFO"
                            title="Manage Images & Videos"
                            header={""}>
                            <div className={`${styles.col}`}>
                                <div className={`${styles.col}`}>

                                    {/* TOP */}
                                    <div className={`${styles.col}`}
                                        style={{width: "100%",}}>
                                        <div className={`${styles.row}`}>
                                            <h3>Images</h3>
                                        </div>
                                        <div className={`${styles.col}`}
                                                style={{padding: "1rem 0rem 0 0", height: "auto",}}>
                                            <div className={`${styles.col}`}
                                                style={{background: "", height: "100%", width: "100%", padding: "1rem 0rem 1rem 0"}}>
                                                <div className={`${styles.col}`}>
                                                    FILE UPLOADER
                                                </div>
                                            </div>
                                            <div className={`${styles.row}`}
                                                style={{justifyContent: "space-between", width: "100%", padding: "1rem 0rem 1rem 0", borderRadius: "6px"}}>
                                                <div className={`${styles.col}`}
                                                    style={{background: "", alignItems: "flex-start", borderRadius: "6px", padding: "0"}}>
                                                    <Image 
                                                        style={{border: "0.4px solid var(--accent)", borderRadius: "6px"}}
                                                        src={"https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png"} 
                                                        alt=""
                                                        width={100}
                                                        height={100} />
                                                </div>

                                                <div className={`${styles.col}`}
                                                    style={{background: "", alignItems: "center", padding: "0", borderRadius: "6px"}}>
                                                    <Image 
                                                        style={{border: "0.4px solid var(--accent)", borderRadius: "6px"}}
                                                        src={"https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png"} 
                                                        alt=""
                                                        width={100}
                                                        height={100} />
                                                </div>

                                                <div className={`${styles.col}`}
                                                    style={{background: "", alignItems: "flex-end", borderRadius: "6px", padding: "0", }}>
                                                    <Image 
                                                        style={{border: "0.4px solid var(--accent)", borderRadius: "6px"}}
                                                        src={"https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png"} 
                                                        alt=""
                                                        width={100}
                                                        height={100} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </Card>
                    </div>
                    <div className={`${styles.col} ${styles.twoThird}`}>
                        <h4>test</h4>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CustomerDetail;