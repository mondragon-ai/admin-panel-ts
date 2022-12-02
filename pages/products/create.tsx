import Image from "next/image";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { Card } from "../../components/ui/Card";
import FormProgress from "../../components/ui/FormProgress";
import Underline from "../../components/ui/Underline";
import { numberFormat } from "../../lib/helpers/formatters";
import { addTags, deleteTag } from "../../lib/helpers/tags";
import styles from "../../styles/Main.module.css";
import { ProductVariantRow } from "./p/[handle]";

import * as crypto from "crypto";

const t = [
    "VIP"
]

interface Prop {
    string: any
}

type Props = {
    setProduct:  Dispatch<SetStateAction<{
        title: string;
        price: number;
        description: string;
        compare_at_price: number;
        quantity: number;
        weight: number;
        options?: [{}];
        videos: any[]
    }>>,
    product: {
        title: string;
        price: number;
        description: string;
        compare_at_price: number;
        quantity: number;
        weight: number;
        videos: any[]
    },
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
        active: true,
        title: "Product",
        step: "STEP_ONE"
    },
    {
        required: true,
        complete: false,
        active: false,
        title: "Advanced",
        step: "STEP_TWO"
    },
    {
        required: true,
        complete: false,
        active: false,
        title: "Variants",
        step: "STEP_THREE"
    },
    {
        required: false,
        complete: false,
        active: false,
        title: "Media",
        step: "STEP_FOUR"
    }
]
const p = {
    title: "Hoodie 1776",
    price: 300,
    description: "description here",
    compare_at_price: 0,
    quantity: 10,
    weight: 0.5,
    options: [
        {options1: [""]},
        {options2: [""]},
        {options3: [""]},
    ],
    videos: [
        {
            id: "vid_" + crypto.randomBytes(10).toString("hex"),
            url: "",
            type: "YOUTUBE"
        }
    ],
    is_digital: false,
    sell_overstock: true,
    requires_shipping: false,
    tags: [],
    categories: []
}

export const createProduct: FunctionComponent<Prop> = (props) => {

    const [steps, setIndex] = useState(s);

    const [product, setProduct] = useState(p);

    const [checkboxes, setCheckboxes] = useState({
        is_digital: false,
        sell_overstock: true,
        requires_shipping: false
    })

    const [formStep, navForm] = useState("STEP_TWO")

    console.log(product.price)

    return (
        <div className={`${styles.col}`}>
            <div className={`${styles.col} ${styles.container}`} 
                style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <FormProgress steps={steps} formStep={formStep} />
            </div>
            <div className={`${styles.col} ${styles.container}`}
                style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <div className={`${styles.col} ${styles.twoThird}`}>
                    {steps && steps.map(s => { 
                        if (s.step == "STEP_ONE" && s.active ){
                            return (
                                <ProductText
                                    setProduct={setProduct as Dispatch<SetStateAction<any>>} 
                                    product={product}
                                    navForm={navForm}
                                    setIndex={setIndex}
                                    steps={steps}
                                    checkboxes={checkboxes}
                                    setCheckboxes={setCheckboxes} /> 
                            )
                        }
                        if (s.step == "STEP_TWO" && s.active){
                            return (
                                <StepTwo
                                    setProduct={setProduct as Dispatch<SetStateAction<any>>}
                                    product={product}
                                    navForm={navForm}
                                    setIndex={setIndex}
                                    steps={steps}
                                    checkboxes={checkboxes}
                                    setCheckboxes={setCheckboxes} /> 
                            )
                        }
                        if (s.step == "STEP_THREE" && s.active ){
                            return (
                                <StepThree
                                    setProduct={setProduct as Dispatch<SetStateAction<any>>}
                                    product={product}
                                    navForm={navForm}
                                    setIndex={setIndex}
                                    steps={steps}
                                    state={product} />
                            )
                        }
                        if (s.step == "STEP_FOUR" && s.active ){
                            return (
                                <StepFour
                                    setProduct={setProduct as Dispatch<SetStateAction<any>>}
                                    product={product}
                                    navForm={navForm}
                                    setIndex={setIndex}
                                    steps={steps}
                                    state={product} />
                            )
                        }
                    })}
                   {/* {formStep == "STEP_ONE" ? <StepOne setProduct={setProduct} product={product} navForm={navForm} setIndex={setIndex} steps={steps} /> : null}
                   {formStep == "STEP_TWO" ? <StepTwo setProduct={setProduct} product={product} navForm={navForm} setIndex={setIndex} steps={steps} /> : null} */}
                </div>
            </div>
        </div>
    ) 
}

export const StepFour: FunctionComponent<Props> = ({
    setProduct,
    product,
    navForm,
    setIndex,
    steps
}) => {
    
    // Order Tag State
    let [tags, setTags] = useState(t);
    const [tagText, setTagState] = useState("");

    return (
        <Card 
            card_type="CREATE"
            title="Manage Images & Videos"
            header={""}
            next={"SAVE"}
            // body={}
            // method={}
            // resource={}
            prev={"STEP_THREE"}
            setIndex={setIndex}
            steps={steps}>
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

                    {/* BOTTOM */}
                    <div className={`${styles.col}`}
                        style={{width: "100%",}}>
                        <div className={`${styles.row}`}>
                            <h3>Video Links</h3>
                        </div>
                        <div className={`${styles.formItem} ${styles.row}`}
                            style={{
                                width: "100%",
                                padding: "0px",
                                marginTop: "2rem"
                            }}>
                            <input
                                style={{
                                    color: "white"
                                }}
                                onChange={(e) => setProduct({
                                    ...product,
                                    videos: [
                                        {
                                            ...product.videos,
                                            id: "vid_" + crypto.randomBytes(10).toString("hex"),
                                            url: "",
                                            type: "YOUTUBE"
                                        }
                                    ]
                                })}
                                value={product.videos[0].id}
                                type="text"
                                name="links" />
                            <label style={{ 
                                top: product.videos[0].id  !== "" ? "-5px" : "", 
                                fontSize: product.videos[0].id  !== "" ? "10px" : ""}}>Video Link</label>
                        </div>
                        <div className={`${styles.col}`}>
                            <p className={`${styles.links}`} style={{marginBottom: "1rem", fontSize: "0.9rem", color: "gray"}}>
                                https://www.youtube.com owjnwhebgkjwe rgkjw ekrjgb wke gk
                            </p>
                            <Underline width={100} />
                        </div>
                    </div>
                </div>  
            </div>
        </Card>
    )
}

export const StepThree: FunctionComponent<Props> = ({
    setProduct,
    product,
    navForm,
    setIndex,
    steps,
    state
}) => {
    
    
    // Order Tag State
    let [tags, setTags] = useState<{
        tags: string[],
        collections: string[]
    }>({
        tags: [],
        collections: []
    });
    const [tagText, setTagState] = useState<{
        tags: string,
        collections: string
    }>({
        tags: "",
        collections: ""
    });

    const updateProductState = () => {
        setProduct({
            ...product,

        })
    }

    const [variants, setVariants] = useState([
        {
            id: "var_" + crypto.randomBytes(10).toString('hex'),
            option1: "Blue",
            option2: "hoodie",
        },
        {
            id: "var_" + crypto.randomBytes(10).toString('hex'),
            option1: "Black",
            option2: "hoodie",
        }
    ]);

    return (
        <>
        <Card 
            card_type="CREATE"
            title="Options & Variants"
            header={""}
            next={"OPTIONS"}
            state={state}
            // body={}
            // method={}
            // resource={}
            prev={"STEP_TWO"}
            setIndex={setIndex}
            steps={steps}>
            <div className={`${styles.col}`}>
                <div className={`${styles.row}  ${styles.mobileContainer} ${styles.optionsCol}`}
                    style={{
                        marginTop: "1.5rem"
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <input
                            style={{
                                color: "white"
                            }}
                            value={""}
                            type="text"
                            name="options1" />
                        <label style={{ 
                            top: product?.quantity && product?.quantity > 0 ? "-5px" : "", 
                            fontSize: product?.quantity  && product?.quantity > 0? "10px" : ""}}>Options</label>
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <input
                            style={{
                                color: "white"
                            }}
                            value={product?.weight}
                            type="text"
                            name="options1" />
                        <label style={{ 
                            top: product?.weight && product?.weight > 0 ? "-5px" : "", 
                            fontSize: product?.weight && product?.weight > 0 ? "10px" : ""}}>Option Name</label>
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: "33%",
                            padding: "0 5px"
                        }}>
                        <p style={{padding: 0, width: "90%"}}>Option One</p>
                        <div  style={{padding: 0, width: "10%"}} id=""> </div>
                    </div>
                </div>

                <div className={`${styles.row}  ${styles.mobileContainer}`}
                    style={{
                        marginTop: window.innerWidth > 720 ? "1.5rem" : "",
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        { 
                            tags && tags.tags.length > 0 ?  tags.tags.map(v => {
                            return <p 
                                key={v}
                                id={"tags"}
                                onClick={(e) => deleteTag(e, v, setTags, setTagState, tags, tagText)}
                                className={`${styles.tagItem}`}>{v} <b>x</b> </p> 
                            }) : null
                        }
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: "33%",
                            padding: "0 5px"
                        }}>
                        {<p style={{padding: 0, width: "90%"}}></p>}
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: "33%",
                            padding: "0 5px"
                        }}>
                    </div>
                </div>

                <div className={`${styles.row}  ${styles.mobileContainer} ${styles.optionsCol}`}
                    style={{
                        marginTop: window.innerWidth > 720 ? "1.5rem" : "",
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <input
                            style={{
                                color: "white"
                            }}
                            // onChange={(e) => }
                            value={product?.quantity}
                            type="text"
                            name="options2" />
                        <label style={{ 
                            top: product?.quantity && product?.quantity  > 0 ? "-5px" : "", 
                            fontSize: product?.quantity && product?.quantity > 0? "10px" : ""}}>Options</label>
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <input
                            style={{
                                color: "white"
                            }}
                            value={product?.weight}
                            type="text"
                            name="option2" />
                        <label style={{ 
                            top: product?.weight && product?.weight  > 0 ? "-5px" : "", 
                            fontSize: product?.weight && product?.weight  > 0 ? "10px" : ""}}>Option Name</label>
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: "33%",
                            padding: "0 5px"
                        }}>
                        <p style={{padding: 0, width: "90%"}}>Option Two</p>
                        <div  style={{padding: 0, width: "10%"}} id=""> </div>
                    </div>
                </div>

                <div className={`${styles.row}  ${styles.mobileContainer}`}
                    style={{
                        marginTop:window.innerWidth > 720 ? "1.5rem" : "",
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        { 
                            tags && tags.collections.length > 0 ?  tags.collections.map(v => {
                            return <p 
                                key={v}
                                id={"tags"}
                                onClick={(e) => deleteTag(e, v, setTags, setTagState,  tags, tagText)}
                                className={`${styles.tagItem}`}>{v} <b>x</b> </p> 
                            }) : null
                        }
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: "33%",
                            padding: "0 5px"
                        }}>
                        {<p style={{padding: 0, width: "90%"}}></p>}
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: "33%",
                            padding: "0 5px"
                        }}>
                    </div>
                </div>

                <div className={`${styles.row}  ${styles.mobileContainer} ${styles.optionsCol}`}
                    style={{
                        marginTop: window.innerWidth > 720 ? "1.5rem" : "",
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: window.innerWidth > 720 ? "0 5px" : ""
                        }}>
                        <input
                            style={{
                                color: "white"
                            }}
                            value={product?.quantity}
                            type="text"
                            name="options3" />
                        <label style={{ 
                            top: product?.quantity && product?.quantity > 0 ? "-5px" : "", 
                            fontSize: product?.quantity && product?.quantity > 0? "10px" : ""}}>Options</label>
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: window.innerWidth > 720 ? "0 5px" : ""
                        }}>
                        <input
                            style={{
                                color: "white"
                            }}
                            value={product?.weight }
                            type="text"
                            name="option3" />
                        <label style={{ 
                            top: product?.weight  && product?.weight  > 0 ? "-5px" : "", 
                            fontSize: product?.weight && product?.weight  > 0 ? "10px" : ""}}>Option Name</label>
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: "33%",
                            padding: window.innerWidth > 720 ? "0 5px" : ""
                        }}>
                        <p style={{padding: 0, width: "90%"}}>Option Three</p>
                        <div  style={{padding: 0, width: "10%"}} id=""> </div>
                    </div>
                </div>

                <div className={`${styles.row}  ${styles.mobileContainer}`}
                    style={{
                        marginTop: window.innerWidth > 720 ? "1.5rem" : "",
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: "33%",
                            padding: "0 5px"
                        }}>
                        { 
                            tags && tags.collections.length > 0 ?  tags.collections.map(v => {
                            return <p 
                                key={v}
                                id={"tags"}
                                onClick={(e) => deleteTag(e, v, setTags, setTagState,  tags, tagText)}
                                className={`${styles.tagItem}`}>{v} <b>x</b> </p> 
                            }) : null
                        }
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: "33%",
                            padding: "0 5px"
                        }}>
                        {<p style={{padding: 0, width: "90%"}}></p>}
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: "33%",
                            padding: "0 5px"
                        }}>
                    </div>
                </div>
            </div>
        </Card>
        
        <Card 
            card_type="INFO"
            title="Variants"
            header={""}
            next={"OPTIONS"}>
            <div className={`${styles.col}`}>
                {
                    variants && variants.map(v => {
                        return (
                            <div key={v.id} className={`${styles.col}`}
                                style={{
                                    width: "auto",
                                    minWidth: "100%"
                                }}>
                                <ProductVariantRow />
                                <Underline width={100} />
                            </div>
                        )
                    })
                }
            </div>
        </Card>
       </>
        
    )
}

export const StepTwo: FunctionComponent<Props> = ({
    setProduct,
    product,
    navForm,
    setIndex,
    steps,
    checkboxes,
    setCheckboxes,
}) => {
    
    // Order Tag State
    let [tags, setTags] = useState<{
        tags: string[],
        collections: string[]
    }>({
        tags: [],
        collections: []
    });
    const [tagText, setTagState] = useState<{
        tags: string,
        collections: string
    }>({
        tags: "",
        collections: ""
    });

    const updateProductState = () => {
        setProduct({
            ...product,

        })
    }

    return (
        <Card 
            card_type="CREATE"
            title="Tags & Advanced Options"
            header={""}
            next={"STEP_THREE"}
            prev={"STEP_ONE"}
            setIndex={setIndex}
            steps={steps}>
            <div className={`${styles.col}`}>
                <div className={`${styles.row} ${styles.mobileContainer}`}
                    style={{
                        marginTop: "1.5rem"
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <input
                            style={{
                                color: "white"
                            }}
                            id={"tags"}
                            onKeyDown={(e) => addTags(e, tagText.tags, setTags, setTagState,  tags, tagText)}
                            onChange={(e) => setTagState({
                                ...tagText,
                                tags: e.target.value
                            })}
                            value={tagText.tags}
                            type="text"
                            name="tags" />
                        <label style={{ 
                            top: tagText.tags !== "" ? "-5px" : "", 
                            fontSize: tagText.tags !== "" ? "10px" : ""}}>Tags</label>
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <input
                            style={{
                                color: "white"
                            }}
                            id={"collections"}
                            onKeyDown={(e) => addTags(e, tagText.collections, setTags, setTagState,  tags, tagText)}
                            onChange={(e) => setTagState({
                                ...tagText,
                                collections: e.target.value
                            })}
                            value={tagText.collections}
                            type="text"
                            name="collecitons" />
                        <label style={{ 
                            top:  tagText.collections !== ""  ? "-5px" : "", 
                            fontSize:  tagText.collections !== ""  ? "10px" : ""}}>Collections</label>
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <p style={{padding: 0, width: "90%"}}>High Risk</p>
                        <div  style={{padding: 0, width: "10%"}} id=""> 
                            <div onClick={() => setCheckboxes({...checkboxes, high_risk: !checkboxes.high_risk}) as Dispatch<any>}
                                style={{
                                background: checkboxes.high_risk ? "white" : "red",
                                height: "15px",
                                width: "15px",
                                borderRadius: "2px",
                                border: checkboxes.high_risk ? "0.5px solid red" : "0.5px solid white"
                            }} id="">
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.row}`}
                    style={{
                        marginTop: "1.5rem"
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        { 
                            tags.tags && tags.tags.length > 0 ?  tags.tags.map(v => {
                            return <p 
                                key={v}
                                id={"tags"}
                                onClick={(e) => deleteTag(e, v, setTags, setTagState,  tags, tagText)}
                                className={`${styles.tagItem}`}>{v} <b>x</b> </p> 
                            }) : null
                        }
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        { 
                            tags.collections && tags.collections.length > 0 ?  tags.collections.map(v => {
                            return <p 
                                key={v}
                                id={"collections"}
                                onClick={(e) => deleteTag(e, v, setTags, setTagState,  tags, tagText)}
                                className={`${styles.tagItem}`}>{v} <b>x</b> </p> 
                            }) : null
                        }
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: "33%",
                            padding: "0 5px"
                        }}>
                    </div>
                </div>
            </div>
        </Card>
    )
}


export const ProductText: FunctionComponent<Props> = ({
    setProduct,
    product,
    navForm,
    setIndex,
    steps,
    checkboxes,
    setCheckboxes
}) => {
    return (
        <Card 
            card_type="CREATE"
            title="Title & Descriptions"
            header={""}
            next={"STEP_TWO"}
            prev={""}
            setIndex={setIndex}
            steps={steps}>
            <div className={`${styles.col}`}>
                <div className={`${styles.row}  ${styles.mobileContainer}`}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "50%" : "100%",
                            padding: "0 5px"
                        }}>
                        <input
                            style={{
                                color: "white"
                            }}
                            onChange={(e) => setProduct({
                                ...product,
                                title: e.target.value
                            })}
                            value={product.title}
                            type="text"
                            name="title" />
                        <label style={{ 
                            top: product.title != "" ? "-5px" : "", 
                            fontSize: product.title != "" ? "10px" : ""}}>Title</label>
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}>
                        <div className={`${styles.formItem} ${styles.row}`}
                            style={{
                                width: "50%",
                                padding: "0 5px"
                            }}>
                            <input
                                style={{
                                    color: "white",
                                    width: "100%"
                                }}
                                onChange={(e) => setProduct({
                                    ...product,
                                    price: Number(e.target.value.replace("$", "").replace(".", "").replace(",", ""))
                                })}
                                value={numberFormat(Number(product.price)/100)}
                                type="text"
                                name="price" />
                            <label style={{ 
                                top: product.price > 0 ? "-5px" : "", 
                                fontSize: product.price > 0 ? "10px" : ""}}>Price </label>
                        </div>
                        <div className={`${styles.formItem} ${styles.row}`}
                            style={{
                                width: "50%",
                                padding: "0 5px"
                            }}>
                            <input
                                style={{
                                    color: "white",
                                    width: "100%"
                                }}
                                onChange={(e) => setProduct({
                                    ...product,
                                    compare_at_price: Number(e.target.value.replace("$", "").replace(".", "").replace(",", ""))
                                })}
                                value={numberFormat(Number(product.compare_at_price)/100)}
                                type="text"
                                name="price" />
                            <label style={{ 
                                top: product.compare_at_price > 0 ? "-5px" : "", 
                                fontSize: product.compare_at_price > 0 ? "10px" : ""}}>Compare at Price </label>
                        </div>
                    </div>
                </div>

                {/* INSERT RICH TEXT EDITOR */}
                <div className={`${styles.row}`}
                    style={{
                        marginTop: "1.5rem"
                    }}>
                    <div className={`${styles.formItem}`}
                        style={{
                            width: "100%"
                        }}>
                        <textarea
                            style={{
                                color: "white",
                                width: "100%",
                                height: 300,
                                borderRadius: "6px",
                                background: "transparent",
                                padding: "0.8rem 0.8rem"
                            }}
                            onChange={(e) => setProduct({
                                ...product,
                                description: e.target.value
                            })}
                            value={product.description}
                            name="description" />
                        <label style={{ 
                            top: product.description != "" ? "-5px" : "", 
                            fontSize: product.description != "" ? "10px" : ""}}>Description</label>
                    </div>
                </div>
                <div className={`${styles.row}  ${styles.mobileContainer}`}
                    style={{
                        marginTop: "1.5rem"
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <input
                            style={{
                                color: "white"
                            }}
                            onChange={(e) => setProduct({
                                ...product,
                                quantity: Number(e.target.value)
                            })}
                            value={product.quantity}
                            type="number"
                            name="quantity" />
                        <label style={{ 
                            top: product.quantity  > 0 ? "-5px" : "", 
                            fontSize: product.quantity  > 0? "10px" : ""}}>Inventory</label>
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <input
                            style={{
                                color: "white"
                            }}
                            onChange={(e) => setProduct({
                                ...product,
                                weight: Number(e.target.value)
                            })}
                            value={product.weight}
                            type="number"
                            name="weight" />
                        <label style={{ 
                            top: product.weight  > 0 ? "-5px" : "", 
                            fontSize: product.weight  > 0 ? "10px" : ""}}>Weight</label>
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <p style={{padding: 0, width: "90%"}}>Digital Product</p>
                        <div className={`${styles.formItem} ${styles.row}`}
                            style={{padding: 0, width: "10%"}} id="">
                            <div onClick={() => setCheckboxes({...checkboxes, is_digital: !checkboxes.is_digital}) as Dispatch<any>}
                                style={{
                                background: checkboxes.is_digital ? "white" : "red",
                                height: "15px",
                                width: "15px",
                                borderRadius: "2px",
                                border: checkboxes.is_digital ? "0.5px solid red" : "0.5px solid white"
                            }} id="">
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.row} ${styles.mobileContainer}`}
                    style={{
                        marginTop: window.innerWidth > 720 ? "1.5rem" : "",
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <p style={{padding: 0, width: "90%"}}>Oversell Stock</p>
                        <div  style={{padding: 0, width: "10%"}} id="">
                            <div onClick={() => setCheckboxes({...checkboxes, sell_overstock: !checkboxes.sell_overstock}) as Dispatch<any>}
                                style={{
                                background: checkboxes.sell_overstock ? "white" : "red",
                                height: "15px",
                                width: "15px",
                                borderRadius: "2px",
                                border: checkboxes.sell_overstock ? "0.5px solid red" : "0.5px solid white"
                            }} id="">
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <p style={{padding: 0, width: "90%"}}>Requires Shipping</p>
                        <div  style={{padding: 0, width: "10%"}} id="">
                            <div onClick={() => setCheckboxes({...checkboxes, requires_shipping: !checkboxes.requires_shipping}) as Dispatch<any>}
                                style={{
                                background: checkboxes.requires_shipping ? "white" : "red",
                                height: "15px",
                                width: "15px",
                                borderRadius: "2px",
                                border: checkboxes.requires_shipping ? "0.5px solid red" : "0.5px solid white"
                            }} id="">
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default createProduct;