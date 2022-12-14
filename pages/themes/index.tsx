import styles from "../../styles/Main.module.css";
import AllItemHeader from "../../components/ui/headers/AllItemHeader";
import { useState } from "react";

import { Card } from "../../components/ui/Card";
import Image from "next/image";


export default function AllThemes() {


    const [list, setImages] = useState<any[]>();

    const [prompt, setPrompt] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const updateSearch = async (e: any) => {

        let result;
        let url = "https://api.openai.com/v1/images/generations";

        const key = e.key;

        if (key == "Enter") {
            setLoading(true);

            console.log(" => " + prompt);
    
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPEN_API_KEY}`,
                },
                body: JSON.stringify({
                    "prompt": prompt, //"design a logo for new e-Commerce store that represents the personality of Bryce Mitchell, a UFC fighter from Arkansas, USA.",
                    "n": 10,
                    "size": "256x256"
                })
            });

            console.log(" => response");
            console.log(response);

            if (response.ok) {
                result = await response.json();
                setLoading(false)
            } else {
                throw new Error(" - Fetch Error");
            }

            setImages(result?.data ? result?.data : []);

        }


        
    };

    return (
        <div className={`${styles.col}`}>
            <AllItemHeader 
                title={"Products"}
                createTxt={"Logo Generater"}
                createPage={"/products/create"}
                />
             <main className={`${styles.col} ${styles.container}`}>
                {/* <div className={`${styles.row} ${styles.mobileContainer}`}> */}

                    
            <div className={`${styles.col} ${styles.container}`}
                style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                
                <div className={`${styles.col} ${styles.twoThird}`}>
                    <Card title={"Logo Prompt"}
                        header={""}
                        card_type={!loading ? "CREATE" : "DEFAULT"}
                        next={"UPDATE"}
                        prev={""}
                        resource={"/bundles/update"}
                        redirect={"/products/bundles"}
                        // state={{bundle: bundle}}
                    >
                        <div className={`${styles.col}`}>
                            
                            <div className={`${styles.col}`}>
                                <div className={`${styles.col}`}>
                                    
                                    <div className={`${styles.formItem} ${styles.row}`}
                                        style={{
                                            width:"100%",
                                            padding: "0 5px"
                                        }}>
                                        <input
                                            style={{
                                                color: "white",
                                                width: "100%"
                                            }}
                                            onKeyDown={updateSearch}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            value={prompt}
                                            type="text"
                                            name="logo_prompt" />
                                        <label htmlFor="logo_prompt" style={{ 
                                            top: prompt !== "" ? "-5px" : "", 
                                            fontSize: prompt !== "" ? "10px" : ""}}>Logo Prompt</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card title={"Logo Suggestions"}
                        header={""}
                        card_type={"DEFAULT"}
                    >
                        <div className={`${styles.row}`} style={{position: "relative", flexWrap: "wrap", justifyContent: "space-evenly"}}>
                            {
                                list && list.map((img) => {
                                    return (
                                        <div className={`${styles.col}`} style={{ padding: "1rem 0", width: window.innerWidth > 720 ? "20%" : "40%",  justifyContent: "space-evenly", alignItems: "center" }}>
                                            <Image 
                                                style={{borderRadius: "6px", border: "2px solid black", justifyContent: "center", alignItems: "center", display: "flex", objectFit: "contain"}}
                                                src={img?.url? img?.url : ""}
                                                alt={"imPowered Logo"}
                                                width={120}
                                                height={120}
                                            />
                                        </div>
                                    )
                                }) 
                            }
                        </div>
                    </Card>
                </div>
                </div>
            </main>
        </div>
    )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//     const url = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/products";
//     const result = await impoweredRequest(url, "POST", {product_uuid: ""});

//     console.log(" ==> SERVER SIDE");
//     console.log(result);

//     if (!result) {
//         throw new Error("Product list error");
//     }

//     console.log(" ==> SERVER SIDE");
//     console.log(result);

//     let products = [{}] as Product[];
//     let size = 0;

//     if (result?.data) {
//         products = result?.data?.result,
//         size = result?.data?.size
//     }

//     return {
//         props: {
//             size: size,
//             products: products
//         }
//     }
// }

// export default AllProducts;