import Image from "next/image";
import React, { FunctionComponent, useState } from "react";
import { Card } from "../../../components/ui/Card";
import { DetailPageHeader } from "../../../components/ui/headers/DetailPageHeader";
import RichTextEditor from "../../../components/ui/RichTextEditor";
import Underline from "../../../components/ui/Underline";
import { numberFormat } from "../../../lib/helpers/formatters";
import { deleteTag } from "../../../lib/helpers/tags";
import { Product, ProductList } from "../../../lib/types/products";
import styles from "../../../styles/Main.module.css";

const product = {
    title: "Hoodie 1776",
    price: 12300,
    compare_at_price: 0,
    description: `<p>1123123<p>`,
    quantity: 1,
    weight: 0.5
}

const t = [
    "VIP"
]

export const ProductDetail = () => {

    const [p, setProduct] = useState({})
    
    let [tags, setTags] = useState(t);
    const [tagText, setTagState] = useState("");

    const {
        title
    } = product;

    return (
        <div className={`${styles.col}`}>
            {/* Sub Header - page specific */}
            <DetailPageHeader 
                back_route={"/carts/all"}
                title={title}
                special_btn={"Delete Product"}
                special_btn_route={"/products/all"} />
            
            {/* Main container */}
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.row} ${styles.mobileContainer}`}>
                    <div className={`${styles.col} ${styles.oneThird}`}>
                    <TagAdvanced setProduct={setProduct} setTags={setTags} setTagState={setTagState} tags={tags} />
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
                                            weight: Number(e.target.value)
                                        })}
                                        value={product.weight}
                                        type="text"
                                        name="links" />
                                    <label style={{ 
                                        top: product.weight  > 0 ? "-5px" : "", 
                                        fontSize: product.weight  > 0 ? "10px" : ""}}>Video Link</label>
                                </div>
                                <div className={`${styles.col}`}>
                                    <p className={`${styles.links}`} style={{marginBottom: "1rem", fontSize: "0.9rem", color: "gray"}}>
                                        Video Links
                                    </p>
                                    <Underline width={100} />
                                </div>
                            </div>
                        </div>  
                    </div>
                </Card>
                    </div>
                    <div className={`${styles.col} ${styles.twoThird}`}
                        style={{padding: 0}}>
                        <TitleDescription setProduct={setProduct} setTags={setTags} setTagState={setTagState} tags={tags} />
                        <OptionsVariants product={product} setProduct={setProduct} />
                    </div>
                </div>
            </main>
        
        </div>
    );
}

type TagProps = {
    setProduct: any,
    tags?: string[],
    setTags?: any,
    setTagState?: any,
    product?: Product
}


export const OptionsVariants: FunctionComponent<TagProps> = ({
    product,
    setProduct
}) => {
    
    // Order Tag State
    let [tags, setTags] = useState(t);
    const [tagText, setTagState] = useState("");

    return (
        <>
        <Card 
            card_type="INFO"
            title="Options & Variants"
            header={""}
            next={"OPTIONS"}>
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
                            value={product?.quantity}
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
                            padding: "0 5px"
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

        <Card 
            card_type="INFO"
            title="Options & Variants"
            header={""}
            next={"OPTIONS"}>
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
                            value={product?.quantity}
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
                            padding: "0 5px"
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
        </>
    )
}

export const TitleDescription: FunctionComponent<TagProps> = ({
    setProduct,
}) => {
    const [content, setContent] = React.useState("");
    return (
        <Card 
            card_type="INFO"
            title="Title & Descriptions"
            header={""}>
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
                                title: e.target.value,
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
                                    price: e.target.value.replace("$", "").replace(".", "").replace(",", "")
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
                        <RichTextEditor content={content} setContent={setContent} />
                        {/* <textarea
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
                            name="title" /> */}
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
export const TagAdvanced: FunctionComponent<TagProps> = ({
    setProduct,
    tags,
    setTags,
    setTagState
}) => {
    return (
        <Card 
            card_type="INFO"
            title="Tags & Advanced Options"
            header={""}>
            <div className={`${styles.col}`}>
                <div className={`${styles.col} `}
                    style={{
                        marginTop: "1.5rem"
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: "100%",
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
                </div>

                <div className={`${styles.row}`}
                    style={{
                        marginTop: "0.5rem"
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
                </div>

                <div className={`${styles.col} `}
                    style={{
                        marginTop: "1.5rem"
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width:"100%",
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
                </div>


                <div className={`${styles.row}`}
                    style={{
                        marginTop: "0.5rem"
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
                </div>
                <div className={`${styles.formItem} ${styles.row}`}
                    style={{
                        width: "100%",
                        padding: "0 5px"
                    }}>
                    <p style={{padding: 0, width: "90%"}}>Digital Product</p>
                    <div  style={{padding: 0, width: "10%"}} id=""> </div>
                </div>
            </div>
        </Card>
    )
}

export default ProductDetail;