import { Dispatch, FunctionComponent,  SetStateAction,  useState } from "react";
import FormProgress from "../../../components/ui/FormProgress";
import styles from "../../../styles/Main.module.css";
import * as crypto from "crypto";
import { Card } from "../../../components/ui/Card";
import Underline from "../../../components/ui/Underline";
import { VariantRow } from "../../../components/ui/rows/VariantRow";


// Instantiate the client
import { algoliasearch } from "algoliasearch";
import { DetailPageHeader } from "../../../components/ui/headers/DetailPageHeader";
import { GetServerSideProps } from "next";
import { impoweredRequest } from "../../../lib/helpers/requests";
import { GiftCard, ProdCollection } from "../../../lib/types/products";
import { ApiTimeline } from "../../../components/ui/ApiTimeline";
import { numberFormat } from "../../../lib/helpers/formatters";
import { ParsedUrlQuery } from "querystring";
const client = algoliasearch('9HC6EQSC7S', 'de139a052d86174f4b708e160db11c4b');

type Bundle = {
    title: string,
    type_to_compare: "TAGS" | "DATE" | "BEST_SELLERS" | "SOLD" | "QUANITY",
    condition: "===" | ">=" | "<=" | "!==",
    compare_against: string,
    notes: string,
    products: 
    {
        id: string,
        title: string,

    }[],
    image: {
        url: string,
        alt: string, 
        id: string
    }
}

type Props = {
    setProduct:  Dispatch<SetStateAction<Bundle>>,
    product: Bundle,
    navForm?: Dispatch<SetStateAction<string>>,
    setTags?: Dispatch<SetStateAction<string[]>>,
    setTagState?: Dispatch<SetStateAction<string>>,
    tags?: string[],
    setIndex?: Dispatch<SetStateAction<{
        required: boolean;
        complete: boolean;
        active: boolean;
        title: string;
        step: string;
    }[]>>,
    steps?: {
        required: boolean;
        complete: boolean;
        active: boolean;
        title: string;
        step: string;
    }[],
    state?: any;
    checkboxes?: any;
    setCheckboxes?: any;
}
 
const s = [
    {
        required: true,
        complete: false,
        active: false,
        title: "Product",
        step: "STEP_ONE"
    },
    
]
const g = {
    customer:{
        cus_uuid: "Nothing to see here, just new shit",
        first_name: "Angel",
        last_name: "Mondragon",
        email: "angel@gobigly.com",
    },
    id: "",
    notes: "Nothing to see here, just new shit",
    starting_balance: 4000,
    current_balance: 698,
    code: "iUV27t2"
}

interface Prop {
    gift_cards: GiftCard[]
}

const GiftCardDetail: FunctionComponent<Prop> = ({
    gift_cards
}) => {
    if (!gift_cards) {
        // throw new Error("Data not fetched");        
    }

    const [steps, setIndex] = useState(s);
    const [formStep, setFormStep] = useState("STEP_ONE");

    const [giftCard, setGiftCard] = useState(gift_cards && gift_cards.length > 0 ? gift_cards[0] : {} as GiftCard);


    const [query, setQuery] = useState<string>("")
    const [hits, setResults] = useState<{
        id: string,
        title: string,
        url: string,
        option1: string,
        option2: string,
        option3: string,
        compare_at_price: number,
        price: number,
    }[]>([])

    const updateSearch = async (v: string) => {

        // setCollection({
        //     ...collection,
        //     compare_against: v
        // })

        setQuery(v);
        
        // // Fetch search results
        // const { results } = await client.search({
        //     requests: [
        //     {
        //         indexName: 'prod_product_search_engine',
        //         // You can make typos, we handle it
        //         query: query,
        //         hitsPerPage: 50,
        //     },
        //     ],
        // });
    
        // if (results[0].hits) {
        //     setResults(results[0].hits as any);
        //     console.log('[Results]', results[0].hits);
        // }

        // let product_list: {
        //     id: string,
        //     title: string,
        //     url: string,
        //     option1: string,
        //     option2: string,
        //     option3: string,
        //     compare_at_price: number,
        //     price: number,
        // }[] = []
        

        // hits.forEach(hit => {
        //     product_list = [
        //         ...product_list,
        //         {
        //             id: hit.id,
        //             title: hit.title,
        //             url: "",
        //             option1: hit.option1,
        //             option2: hit.option2,
        //             option3: hit.option3,
        //             compare_at_price: hit.compare_at_price,
        //             price: hit.price,
        //         }
        //     ]
        // })

        // setCollection({
        //     ...collection,
        //     products: product_list
        // })
    };

    console.log(giftCard)

    const comments = [
        {
            date: new Date().toDateString(),
            content: "Gift Card created"
        }
    ]

    const start = Number(giftCard?.starting_balance);
    const current = Number(giftCard?.current_balance)
    const remaining_balance = (1 - (Math.round((current / start)*100) / 100))*100;

    console.log(remaining_balance)

    return (
        <div className={`${styles.col}`}>
            {/* Sub Header - page specific */}
            <DetailPageHeader
                back_route={"/products/gift_cards"}
                title={giftCard?.customer?.email}
                special_btn={"Delete"}
                special_btn_route={"/products/gift_cards"} />
            
            {/* Main container */}
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.row} ${styles.mobileContainer}`}>

                    <div className={`${styles.col} ${styles.oneThird}`}>

                        <Card  
                            width={50}
                            title="Customer Details"
                            header={""}
                            subHeader={""}
                            card_type="INFO"
                            >
                                <div className={`${styles.col}`}>
                                    <div style={{ justifyContent: "flex-start",  paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p>{giftCard?.customer?.first_name} {giftCard?.customer?.last_name}</p>
                                    </div>
                                    <h5>Contact</h5>
                                    <div style={{ paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p style={{paddingTop: "0rem"}}>{giftCard?.customer?.email}</p>
                                        <p style={{paddingTop: "0rem"}}>📋</p>
                                    </div>
                                    <h5>Code</h5>
                                    <div style={{ paddingBottom: "1rem"}} className={`${styles.row}`}>
                                        <p style={{paddingTop: "0rem"}}>{giftCard?.code}</p>
                                    </div>
                                </div>
                        </Card>
                    
                    </div>
                    <div className={`${styles.col} ${styles.twoThird}`} style={{paddingTop: "0"}} >

                        <Card title={"Collection Detail"}
                            header={""}
                            card_type={"DEFAULT"}
                            >
                            <div className={`${styles.col}`}>
                                
                                <div className={`${styles.col}`}>
                                    
                                    <div className={`${styles.formItem} ${styles.row}`}
                                        style={{
                                            width:"100%",
                                            padding: "0 5px"
                                        }}>
                                    </div>
                                </div>
                                <div className={`${styles.col}`} style={{ padding: "2rem 0"}}>
                                    
                                    <div className={`${styles.row}`} style={{ padding: "0"}}>
                                        <p> Starting Balance </p>
                                        <p> Current Balance </p>
                                    </div>
                                    <div className={`${styles.row}`} style={{ 
                                        padding: window?.innerWidth < 720 ? "1rem 0 0 0" : "1rem 0 1rem 0"}}>
                                        <div style={{ width: "100%", height: "20px", background: "black", borderRadius: "3px", boxShadow: "dimgrey 0px 0px 6px 0px inset"}}>
                                            <div style={{ width: `${remaining_balance}%`, height: "20px", background: "var(--accent)", borderRadius: "3px"}}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.row}`} style={{ padding: "0"}}>
                                        <p> {numberFormat(Number(giftCard?.starting_balance)/100)} </p>
                                        <p> {numberFormat(Number(giftCard?.current_balance)/100)} </p>
                                    </div>
                                </div>
                            </div>
                        </Card>  
                        <ApiTimeline comments={comments} />
                    </div>
                </div>
            </main>
        </div>
    ) 
}



export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { handle } = params as ParsedUrlQuery;
    const LIVE_SERVER = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/gift_cards";
    // const DEV_SERVER = "http://localhost:5001/impowered-funnel/us-central1/funnel/gift_cards";
    const result = await impoweredRequest(LIVE_SERVER, "POST", {gif_uuid: handle});

    console.log(" ==> SERVER SIDE");
    console.log(result);

    if (!result) {
        throw new Error("Product list error");
    }

    console.log(" ==> SERVER SIDE");
    console.log(result);

    let gift_cards = [{}] as GiftCard[];
    let size = 0;

    if (result?.result) {
        gift_cards = result?.result?.gift_cards,
        size = result?.result?.size
    }

    return {
        props: {
            size: size,
            gift_cards: gift_cards
        }
    }
}



export default GiftCardDetail;


