import Image from "next/image";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { Card } from "../../components/ui/Card";
import FormProgress from "../../components/ui/FormProgress";
import Underline from "../../components/ui/Underline";
import { numberFormat } from "../../lib/helpers/formatters";
import { deleteTag } from "../../lib/helpers/tags";
import styles from "../../styles/Main.module.css";

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
    }>>,
    product: {
        title: string;
        price: number;
        description: string;
        compare_at_price: number;
        quantity: number;
        weight: number;
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
    state?: any
}
 

export const createProduct: FunctionComponent<Prop> = (props) => {

    const [steps, setIndex] = useState([
        {
            required: true,
            complete: false,
            active: false,
            title: "Product",
            step: "STEP_ONE"
        },
        {
            required: false,
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
            required: true,
            complete: false,
            active: true,
            title: "Media",
            step: "STEP_FOUR"
        }
    ]);

    const [product, setProduct] = useState({
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
        ]
    });

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
                                <StepOne setProduct={setProduct as Dispatch<SetStateAction<any>>} product={product} navForm={navForm} setIndex={setIndex} steps={steps} /> 
                            )
                        }
                        if (s.step == "STEP_TWO" && s.active){
                            return (
                                <StepTwo setProduct={setProduct as Dispatch<SetStateAction<any>>} product={product} navForm={navForm} setIndex={setIndex} steps={steps} /> 
                            )
                        }
                        if (s.step == "STEP_THREE" && s.active ){
                            return (
                                <StepThree setProduct={setProduct as Dispatch<SetStateAction<any>>} product={product} navForm={navForm} setIndex={setIndex} steps={steps} state={product} />
                            )
                        }
                        if (s.step == "STEP_FOUR" && s.active ){
                            return (
                                <StepFour setProduct={setProduct as Dispatch<SetStateAction<any>>} product={product} navForm={navForm} setIndex={setIndex} steps={steps} state={product} />
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
            prev={"STEP_THREE"}
            setIndex={setIndex}
            steps={steps}>
            <div className={`${styles.col}`}>
                <div className={`${styles.row} ${styles.mobileContainer}`}>

                    {/* Left */}
                    <div className={`${styles.col}`}
                        style={{width: window.innerWidth > 720 ? "70%" : "100%",}}>
                        <div className={`${styles.row}`}>
                            <h3>Images</h3>
                        </div>
                        <div className={`${styles.row}  ${styles.mobileContainer}`}
                                style={{padding: "1rem 1rem 0 0", height: "auto",}}>
                            <div className={`${styles.col}`}
                                style={{background: "", height: "100%", width:  window.innerWidth > 720 ? "25%" : "100%", padding: "1rem 1rem 1rem 0"}}>
                                <div className={`${styles.col}`}>
                                    FILE UPLOADER
                                </div>
                            </div>
                            <div className={`${styles.row}`}
                                style={{background: "", width:  window.innerWidth > 720 ? "75%" : "100%", padding: "1rem 1rem 1rem 0"}}>
                                <div className={`${styles.col}`}
                                    style={{background: "", alignItems: "center", padding: "0"}}>
                                   <Image 
                                        style={{border: "0.4px solid var(--accent)"}}
                                        src={"https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png"} 
                                        alt=""
                                        width={60}
                                        height={60} />
                                </div>

                                <div className={`${styles.col}`}
                                    style={{background: "", alignItems: "center", padding: "0"}}>
                                   <Image 
                                        style={{border: "0.4px solid var(--accent)"}}
                                        src={"https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png"} 
                                        alt=""
                                        width={60}
                                        height={60} />
                                </div>

                                <div className={`${styles.col}`}
                                    style={{background: "", alignItems: "center", padding: "0"}}>
                                   <Image 
                                        style={{border: "0.4px solid var(--accent)"}}
                                        src={"https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png"} 
                                        alt=""
                                        width={60}
                                        height={60} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className={`${styles.col}`}
                        style={{width:window.innerWidth > 720 ? "30%" : "100%",}}>
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
                                    weight: Number(e.target.value)
                                })}
                                value={product.weight}
                                type="number"
                                name="weight" />
                            <label style={{ 
                                top: product.weight  > 0 ? "-5px" : "", 
                                fontSize: product.weight  > 0 ? "10px" : ""}}>Video Link</label>
                        </div>
                        <div className={`${styles.col}`}>
                            <p style={{marginBottom: "1rem", fontSize: "0.9rem"}}>
                                Video Links
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
    let [tags, setTags] = useState(t);
    const [tagText, setTagState] = useState("");

    return (
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
                            value={product.quantity}
                            type="text"
                            name="options1" />
                        <label style={{ 
                            top: product.quantity  > 0 ? "-5px" : "", 
                            fontSize: product.quantity  > 0? "10px" : ""}}>Options</label>
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
                            value={product.weight}
                            type="text"
                            name="options1" />
                        <label style={{ 
                            top: product.weight  > 0 ? "-5px" : "", 
                            fontSize: product.weight  > 0 ? "10px" : ""}}>Option Name</label>
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
                        marginTop: "1.5rem"
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        { 
                            tags && tags.length > 0 ?  tags.map(v => {
                            return <p 
                                key={v}
                                id={"tags"}
                                onClick={(e) => deleteTag(e, v, setTags, setTagState,  tags)}
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
                            // onChange={(e) => }
                            value={product.quantity}
                            type="text"
                            name="options2" />
                        <label style={{ 
                            top: product.quantity  > 0 ? "-5px" : "", 
                            fontSize: product.quantity  > 0? "10px" : ""}}>Options</label>
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
                            value={product.weight}
                            type="text"
                            name="option2" />
                        <label style={{ 
                            top: product.weight  > 0 ? "-5px" : "", 
                            fontSize: product.weight  > 0 ? "10px" : ""}}>Option Name</label>
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
                        marginTop: "1.5rem"
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        { 
                            tags && tags.length > 0 ?  tags.map(v => {
                            return <p 
                                key={v}
                                id={"tags"}
                                onClick={(e) => deleteTag(e, v, setTags, setTagState,  tags)}
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
                            value={product.quantity}
                            type="text"
                            name="options3" />
                        <label style={{ 
                            top: product.quantity  > 0 ? "-5px" : "", 
                            fontSize: product.quantity  > 0? "10px" : ""}}>Options</label>
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
                            value={product.weight}
                            type="text"
                            name="option3" />
                        <label style={{ 
                            top: product.weight  > 0 ? "-5px" : "", 
                            fontSize: product.weight  > 0 ? "10px" : ""}}>Option Name</label>
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: "33%",
                            padding: "0 5px"
                        }}>
                        <p style={{padding: 0, width: "90%"}}>Option Three</p>
                        <div  style={{padding: 0, width: "10%"}} id=""> </div>
                    </div>
                </div>

                <div className={`${styles.row}  ${styles.mobileContainer}`}
                    style={{
                        marginTop: "1.5rem"
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: "33%",
                            padding: "0 5px"
                        }}>
                        { 
                            tags && tags.length > 0 ?  tags.map(v => {
                            return <p 
                                key={v}
                                id={"tags"}
                                onClick={(e) => deleteTag(e, v, setTags, setTagState,  tags)}
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
    )
}


export const StepTwo: FunctionComponent<Props> = ({
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
                            onChange={(e) => setProduct({
                                ...product,
                                quantity: Number(e.target.value)
                            })}
                            value={product.quantity}
                            type="number"
                            name="quantity" />
                        <label style={{ 
                            top: product.quantity  > 0 ? "-5px" : "", 
                            fontSize: product.quantity  > 0? "10px" : ""}}>Tags</label>
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
                            fontSize: product.weight  > 0 ? "10px" : ""}}>Categories</label>
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <p style={{padding: 0, width: "90%"}}>Digital Product</p>
                        <div  style={{padding: 0, width: "10%"}} id=""> </div>
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
                            tags && tags.length > 0 ?  tags.map(v => {
                            return <p 
                                key={v}
                                id={"tags"}
                                onClick={(e) => deleteTag(e, v, setTags, setTagState,  tags)}
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
    )
}


export const StepOne: FunctionComponent<Props> = ({
    setProduct,
    product,
    navForm,
    setIndex,
    steps
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
                            name="title" />
                        <label style={{ 
                            top: product.description != "" ? "-5px" : "", 
                            fontSize: product.description != "" ? "10px" : ""}}>Title</label>
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
                            width: "33%",
                            padding: "0 5px"
                        }}>
                        <p style={{padding: 0, width: "90%"}}>Digital Product</p>
                        <div  style={{padding: 0, width: "10%"}} id=""> </div>
                    </div>
                </div>

                <div className={`${styles.row} ${styles.mobileContainer}`}
                    style={{
                        marginTop: "1.5rem"
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <p style={{padding: 0, width: "90%"}}>Oversell Stock</p>
                        <div  style={{padding: 0, width: "10%"}} id=""></div>
                    </div>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: "33%",
                            padding: "0 5px"
                        }}>
                        <p style={{padding: 0, width: "90%"}}>Requires Shipping</p>
                        <div  style={{padding: 0, width: "10%"}} id=""> </div>
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

export default createProduct;