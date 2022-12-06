import Image from "next/image";
import { ChangeEvent, Dispatch, FunctionComponent, MouseEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { Card } from "../../../components/ui/Card";
import * as crypto from "crypto";
import { DetailPageHeader } from "../../../components/ui/headers/DetailPageHeader";
import Underline from "../../../components/ui/Underline";
import { numberFormat } from "../../../lib/helpers/formatters";
import { addTags, deleteTag } from "../../../lib/helpers/tags";
import { Product, ProductList, Variant } from "../../../lib/types/products";
import styles from "../../../styles/Main.module.css";
import { GetServerSideProps } from "next";
import { impoweredRequest } from "../../../lib/helpers/requests";
import { ParsedUrlQuery } from "querystring";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../lib/firebase";

// const product: Product = {
//     title: "Desantis Land Hoodie",
//     status: true,
//     id: crypto.randomBytes(10).toString("hex"),
//     price: 6840,
//     collections: ["SALE", "Shirts"],
//     tags: ["VIP_ONLY"],
//     options: {
//         options1: ["Color", "Size"],
//         options2: ["Color", "Size"],
//         options3: ["Color", "Size"],

//     },
//     quantity: 20,
//     description: "description here",
//     compare_at_price: 0,
//     weight: 0.5,
//     is_digital: false,
//     sell_overstock: true,
//     requires_shipping: false,
//     videos: [
//         {
//             id: "vid_" + crypto.randomBytes(10).toString("hex"),
//             url: "",
//             type: "YOUTUBE"
//         }
//     ],
// } as Product;

const t = [
    "VIP"
]

export interface ProductDetailProp {
    p: Product
} 


type Props = {
    setProduct:  Dispatch<SetStateAction<Product>>,
    product: Product,
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

export const MediaCard: FunctionComponent<Props> = ({
    setProduct,
    product,
}) => {

    const [image, setImage] = useState<File | string>("");
    const [createObjURL, setCreateObjectURL] = useState<any>(null)
    const [percent, setPercent] = useState<number>(0)

    const [images, setImages] = useState<{url: string, alt?: string, id: string}[]>(product?.images);
        

    const uploadToClient = (event: ChangeEvent<HTMLInputElement | any>) => {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];

        console.log(" => Percent (start)");
        console.log(percent)
    
        setImage(i);

        let reset_imgs: {url: string, alt?: string, id: string}[] = [];
        let uploaded = false

        images.forEach(img => {
            if (img.url === "" && !uploaded) {
                setCreateObjectURL(URL.createObjectURL(i));
                uploaded = true;
                reset_imgs = [
                    ...reset_imgs,
                    {
                        url: URL.createObjectURL(i),
                        alt: "",
                        id: "img_" + crypto.randomBytes(10).toString("hex")
                    }
                ]
            } else {
                reset_imgs = [
                    ...reset_imgs,
                    img
                ]
            }
        });

        setImages(reset_imgs);
      }
    };

    useEffect(() => {

        if (image !== "") {

            console.log(" => Image (start)");
            console.log(image)
            setTimeout(() => uploadToServer(), 1000);
        }

    }, [image]);


    const uploadToServer = async () => {
        const body = new FormData();
         body.append("file", image as File);


         console.log(" => Image (inside)");
         console.log(image)

        if (image === undefined) {
            alert("Please choose a file first!")
            throw new Error("File not present");
        } else {
            const name = (image as File)?.name ? (image as File)?.name.replaceAll(" ", "_") : "" + crypto.randomBytes(10).toString("hex");



            // call FB storage bucket
            const storageRef = ref(storage, "/images/test/" + name);
            console.log(" => S REf)");
            console.log(storageRef)
    
            const uploadTask = uploadBytesResumable(storageRef, image as File);
     
            // 
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const p = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
         
                    // update progress
                    setPercent(p);
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then( async (url) => {
                        console.log(url);
                        const images = product?.images ? product?.images : [];
                        const img_id = "img_" + crypto.randomBytes(10).toString("hex")
                        setProduct({
                            ...product,
                            images: [
                                ...images,
                                {
                                    id: img_id,
                                    url: url,
                                    alt: "test"
                                }
                            ]
                        })
                        setImages([
                            ...images,
                            {
                                url: url,
                                alt: "Test",
                                id: img_id
                            }
                        ])
                        setPercent(0);
                    });
                }
            ); 
        }
    };



    console.log(" => Percent (end)");
    console.log(percent)

    // log checks
    console.log(" => Img to Upload");
    console.log(storage);
    
    // // Order Tag State
    // let [tags, setTags] = useState(t);
    // const [tagText, setTagState] = useState("");
  // Create a reference to the hidden file input element
    let hiddenFileInput = useRef<any>(null);
    
    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = () => {
        hiddenFileInput = hiddenFileInput?.current?.click();
    };
    return (
        <Card 
            card_type="INFO"
            title="Media"
            header={""}
            product={product}
            setProduct={setProduct}>
            <div className={`${styles.col}`}>
                <div className={`${styles.col}`}>

                    {/* TOP */}
                    <div className={`${styles.col}`}
                        style={{ width:  "100%"}}>
                        <div className={`${styles.row}`}>
                            <h3>Images</h3>
                        </div>
                        <div className={`${styles.col}`}>
                            <div className={`${styles.row}`} style={{
                                margin: "1rem 0 0 0",
                                height: "5px",
                                borderRadius: "2px",
                                width: `${percent}%`,
                                background: "var(--accent)"}}></div>
                            <div className={`${styles.row} ${styles.mobileContainer}`}
                                    style={{padding: "1rem 0rem 0 0", height: "auto", width: "100%"}}>
                                <div className={`${styles.col}`}
                                    style={{
                                        background: "",
                                        height: "100%",
                                        width: window.innerWidth > 720 ? "40%" : "100%",
                                        padding: "1rem"}}>
                                    <div className={`${styles.col}`}>
                                        <input 
                                            accept="image/*"
                                            type="file"
                                            ref={hiddenFileInput}
                                            id="select-image"
                                            style={{ display: "none" }}
                                            name="myImage"
                                            onChange={(e) => uploadToClient(e)} 
                                        />
                                        <div className={`${styles.col}`}
                                            onClick={(e) => handleClick()}
                                            style={{
                                                width: "100%",
                                                height: "200px",
                                                border: "1px dotted var(--accent)",
                                                borderRadius: "6px",
                                                backgroundPosition: "center",
                                                backgroundSize: "cover",
                                                boxSizing: "border-box",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                textAlign: "center",
                                                cursor: "pointer"}}
                                            >
                                            <p>Click Here to Uplaod Your Image</p>
                                        </div>
                                        {/* <ImageContainer images={images} /> */}
                                        {/* {addImage ? <AddImage handle={handle} onChange={onChange} images={images} addImage={addImage} maxNumber toggleImg={toggleImg} />: null} */}
                                    </div>
                                </div>
                                <div className={`${styles.row}`} style={{overflowX: "scroll"}}>
                                    <div className={`${styles.row}`} style={{width: window.innerWidth > 720 ? "100%" : "150%"}}>
                                        <div className={`${styles.row}`}
                                            style={{
                                                justifyContent: "space-between",
                                                width: window.innerWidth > 720 ? "100%" : "150%",
                                                padding: "1rem 0rem 1rem 0",
                                                borderRadius: "6px"}}>
                                            {
                                                images && images.map((img, i) => {
                                                    return (

                                                            <div key={i} className={`${styles.col}`}
                                                                style={{background: "", alignItems: "flex-start", borderRadius: "6px", padding: "0"}}>
                                                                <Image 
                                                                    style={{border: "0.4px solid var(--accent)", borderRadius: "6px"}}
                                                                    src={img.url ? img.url : "https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png" } 
                                                                    alt={img.alt as string}
                                                                    width={window.innerWidth < 720 ? 100 : 200}
                                                                    height={window.innerWidth < 720 ? 100 : 200} />
                                                            </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
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
                        <div className={`${styles.formItem} ${styles.row} ${styles.mobileContainer}`}>
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
                                            ...product.videos,
                                            {
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
                            <div className={`${styles.col}`} style={{marginTop: "1.8rem"}}>
                                <p className={`${styles.links}`} style={{marginBottom: "1rem", fontSize: "0.9rem", color: "gray"}}>
                                    https://www.youtube.com owjnwhebgkjwe rgkjw ekrjgb wke gk
                                </p>
                                <Underline width={100} />
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </Card>
    )
}

export const ProductDetail: FunctionComponent<ProductDetailProp> = ({
    p
}) => {

    const [product, setProduct] = useState(p)
    
    let [tags, setTags] = useState(t);
    const [tagText, setTagState] = useState("");


    const [checkboxes, setCheckboxes] = useState({
        is_digital: false,
        sell_overstock: true,
        requires_shipping: false
    })


    const {
        title
    } = product;

    return (
        <div className={`${styles.col}`}>
            {/* Sub Header - page specific */}
            <DetailPageHeader 
                back_route={"/products/all"}
                title={title}
                special_btn={"Delete Product"}
                special_btn_route={"/products/all"} />
            
            {/* Main container */}
            <main className={`${styles.col} ${styles.container}`}>
                <div className={`${styles.row} ${styles.mobileContainer}`}>
                    <div className={`${styles.col} ${styles.oneThird}`}>
                        <TagAdvanced  product={product} setProduct={setProduct} setTags={setTags} setTagState={setTagState} tags={tags} />
                        <MediaCard product={product} setProduct={setProduct} />
                    </div>
                    <div className={`${styles.col} ${styles.twoThird}`}
                        style={{padding: 0}}>
                        <TitleDescription 
                            setProduct={setProduct}
                            product={product}
                            setTags={setTags}
                            setTagState={setTagState}
                            tags={tags}
                            checkboxes={checkboxes}
                            setCheckboxes={setCheckboxes}  />
                        <OptionsVariants
                            product={product}
                            setProduct={setProduct} />
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



export const OptionsVariants: FunctionComponent<Props> = ({
    setProduct,
    product,
    navForm,
    setIndex,
    steps,
    state
}) => {
    
    
    const [tagText, setTagState] = useState<{
        options1: string,
        options2: string,
        options3: string
    }>({
        options1: "",
        options2: "",
        options3: ""
    });

    return (
        <>
        <Card 
            card_type="INFO"
            title="Options & Variants"
            header={""}
            state={state}
            product={product}
            setProduct={setProduct}>
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
                            id={"options1"}
                            onKeyDown={(e) => addTags(e, product?.option1 as string, setProduct, setTagState, product, tagText)}
                            onChange={(e) => setTagState({
                                ...tagText,
                                options1: e.target.value
                            })}
                            value={tagText.options1}
                            type="text"/>
                        <label style={{ 
                            top: tagText.options1 && tagText.options1 !== "" ? "-5px" : "", 
                            fontSize: tagText.options1 && tagText.options1 !== "" ? "10px" : ""}}>Options</label>
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
                                option1: e.target.value
                            })}
                            value={product?.option1}
                            type="text"
                            name="options1" />
                        <label style={{ 
                            top: product?.option1 && product?.option1 !== "" ? "-5px" : "", 
                            fontSize: product?.option1 && product?.option1 !== "" ? "10px" : ""}}>Option Name</label>
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
                    style={{ marginTop: window.innerWidth > 720 ? "1.5rem" : "" }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            justifyContent: "flex-start",
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        { 
                            product.options.options1 && product.options.options1.length > 0 ?  product.options.options1.map(v => {
                            return <p 
                                key={v}
                                id={"options1"}
                                style={{marginRight: "0.5rem" }} 
                                onClick={(e) => deleteTag(e, v, setProduct, setTagState, product, tagText)}
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
                    style={{ marginTop: window.innerWidth > 720 ? "1.5rem" : "" }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <input style={{ color: "white"}}
                            id={"options2"}
                            onKeyDown={(e) => addTags(e, product?.option2 as string, setProduct, setTagState, product, tagText)}
                            onChange={(e) => setTagState({
                                ...tagText,
                                options2: e.target.value
                            })}
                            value={tagText.options2}
                            type="text"
                            name="options2" />
                        <label style={{ 
                            top: product?.option2 && product?.option2 !== "" ? "-5px" : "", 
                            fontSize: product?.option2 && product?.option2 !== "" ? "10px" : ""}}>Options</label>
                    </div>

                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <input
                            style={{ color: "white" }}
                            onChange={(e) => setProduct({
                                ...product,
                                option2: e.target.value
                            })}
                            value={product?.option2}
                            type="text"
                            name="option2" />
                        <label style={{ 
                            top: product?.option2 && product?.option2 !== "" ? "-5px" : "", 
                            fontSize: product?.option2 && product?.option2 !== "" ? "10px" : ""}}>Option Name</label>
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
                    style={{ marginTop:window.innerWidth > 720 ? "1.5rem" : "" }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            justifyContent: "flex-start",
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        { 
                            product.options.options2 && product.options.options2.length > 0 ?  product.options.options2.map(v => {
                            return <p 
                                key={v}
                                id={"options2"}
                                style={{marginRight: "0.5rem" }} 
                                onClick={(e) => deleteTag(e, v, setProduct, setTagState, product, tagText)}
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
                    style={{ marginTop: window.innerWidth > 720 ? "1.5rem" : "" }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: window.innerWidth > 720 ? "0 5px" : ""
                        }}>
                        <input
                            style={{
                                color: "white"
                            }}
                            id="options3" 
                            onKeyDown={(e) => addTags(e, product?.option3 as string, setProduct, setTagState, product, tagText)}
                            onChange={(e) => setTagState({
                                ...tagText,
                                options3: e.target.value
                            })}
                            value={product?.option3}
                            type="text"
                            name="option3" />
                        <label style={{ 
                            top: product?.option3 && product?.option3 !== "" ? "-5px" : "", 
                            fontSize: product?.option3 && product?.option3 !== "" ? "10px" : ""}}>Options</label>
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
                            value={product?.option3 }
                            type="text" />
                        <label style={{ 
                            top: product?.option3 && product?.option3 !== "" ? "-5px" : "", 
                            fontSize: product?.option3 && product?.option3 !== "" ? "10px" : ""}}>Option Name</label>
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
                            justifyContent: "flex-start",
                            width: "33%",
                            padding: "0 5px"
                        }}>
                        { 
                            product.options.options3 && product.options.options3.length > 0 ?  product.options.options3.map(v => {
                            return <p 
                                key={v}
                                id={"options3"}
                                style={{marginRight: "0.5rem" }} 
                                onClick={(e) => deleteTag(e, v, setProduct, setTagState, product, tagText)}
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
            <div className={`${styles.col}`} style={{overflowY: "hidden",overflowX: "scroll"}}>
                <div className={`${styles.col}`} style={{width: window.innerWidth > 720 ? "100%" : "110%"}}>
                    {
                        product.variants && product.variants.map(v => {
                            return (
                                <div key={v.variant_id} className={`${styles.col}`}
                                    style={{
                                        width: "auto",
                                        minWidth: "100%"
                                    }}>
                                    <ProductVariantRow variant={v} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Card>
       </>
        
    )
}

type VarRow = {
    variant: Variant
}


export const ProductVariantRow: FunctionComponent<VarRow> = ({variant}) => {
    const width = window?.innerWidth > 720 ? 100 : 300;

    return (
        <div className={`${styles.col}`}
                style={{
                    width:  window?.innerWidth > 720 ? "100%" : "300%",
                }}>
            <Underline width={width} />
            <div className={`${styles.row}`}
                style={{
                    marginTop: "1.5rem",
                    alignItems: "center",
                    width: "100%"
                }}>
                <div className={`${styles.formItem} ${styles.row}`}
                    style={{
                        width: "10%",
                        padding: "0 5px"
                    }}>
                    <Image 
                        style={{border: "0.4px solid var(--accent)", borderRadius: "6px"}}
                        src={"https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png"} 
                        alt=""
                        width={50}
                        height={50} />
                </div>
                <div className={`${styles.formItem} ${styles.row}`}
                    style={{
                        width: "35%",
                        padding: "0 5px"
                    }}>
                    <h5>{variant?.option1 && variant?.option1}</h5>
                    <h5>{variant?.option2 && variant?.option2}</h5>
                    <h5>{variant?.option3 && variant?.option3}</h5>
                </div>
                <div className={`${styles.formItem} ${styles.row}`}
                    style={{
                        width: "15%",
                        padding: "0 5px"
                    }}>
                    <input
                        style={{
                            color: "white",
                            width: "100%",
                        }}
                        value={numberFormat(Number(variant.price)/100)}
                        type="text"
                        name="var_price" />
                    <label style={{ 
                        top: variant?.price && variant?.price > 0 ? "-5px" : "", 
                        fontSize: variant?.price  && variant?.price > 0? "10px" : ""}}>Price</label>
                </div>
                <div className={`${styles.formItem} ${styles.row}`}
                    style={{
                        width: "10%",
                        padding: "0 5px"
                    }}>
                    <input
                        style={{
                            color: "white",
                            width: "100%",
                        }}
                        value={variant?.quantity}
                        type="number"
                        name="var_quantity" />
                    <label style={{ 
                        top: variant?.quantity && variant?.quantity > 0 ? "-5px" : "", 
                        fontSize: variant?.quantity  && variant?.quantity > 0? "10px" : ""}}>Quantity</label>
                </div>
                <div className={`${styles.formItem} ${styles.row}`}
                    style={{
                        width: "35%",
                        padding: "0 5px"
                    }}>
                    <input
                        style={{
                            color: "white",
                            width: "100%",
                        }}
                        value={variant?.sku}
                        type="text"
                        name="sku" />
                    <label style={{ 
                        top: variant?.quantity && variant?.quantity > 0 ? "-5px" : "", 
                        fontSize: variant?.quantity  && variant?.quantity > 0? "10px" : ""}}>SKU</label>
                </div>
                <div className={`${styles.formItem} ${styles.row}`}
                    style={{
                        width: "5%",
                        padding: "0 5px"
                    }}>
                        <h4>🗑</h4>
                </div>
            </div>
        </div>
    )
}

export const TitleDescription: FunctionComponent<Props> = ({
    setProduct,
    product,
    checkboxes,
    setCheckboxes
}) => {
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
                                title: e.target.value
                            })}
                            value={product?.title}
                            type="text"
                            name="title" />
                        <label style={{ 
                            top: product?.title != "" ? "-5px" : "", 
                            fontSize: product?.title != "" ? "10px" : ""}}>Title</label>
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
                                value={numberFormat(Number(product?.price)/100)}
                                type="text"
                                name="price" />
                            <label style={{ 
                                top: product?.price && product?.price > 0 ? "-5px" : "", 
                                fontSize: product?.price && product?.price > 0 ? "10px" : ""}}>Price </label>
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
                                value={numberFormat(Number(product?.compare_at_price)/100)}
                                type="text"
                                name="price" />
                            <label style={{ 
                                top: product?.compare_at_price && product?.compare_at_price > 0 ? "-5px" : "", 
                                fontSize: product?.compare_at_price && product?.compare_at_price > 0 ? "10px" : ""}}>Compare at Price </label>
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
                            value={product?.description}
                            name="description" />
                        <label style={{ 
                            top: product?.description != "" ? "-5px" : "", 
                            fontSize: product?.description != "" ? "10px" : ""}}>Description</label>
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
                            value={product?.quantity}
                            type="number"
                            name="quantity" />
                        <label style={{ 
                            top: product?.quantity && product?.quantity  > 0 ? "-5px" : "", 
                            fontSize: product?.quantity && product?.quantity  > 0? "10px" : ""}}>Inventory</label>
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
                            value={product?.weight}
                            type="number"
                            name="weight" />
                        <label style={{ 
                            top: product?.weight && product.weight  > 0 ? "-5px" : "", 
                            fontSize: product?.weight && product.weight  > 0 ? "10px" : ""}}>Weight</label>
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

export const TagAdvanced: FunctionComponent<TagProps> = ({
    setProduct,
    product
}) => {
    
    const [tagText, setTagState] = useState<{
        tags: string,
        collections: string
    }>({
        tags: "",
        collections: ""
    });

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
                            value={product?.quantity}
                            type="number"
                            name="quantity" />
                        <label style={{ 
                            top: product?.quantity && product?.quantity  > 0 ? "-5px" : "", 
                            fontSize: product?.quantity && product?.quantity  > 0? "10px" : ""}}>Tags</label>
                    </div>
                </div>

                <div className={`${styles.row}`}
                    style={{
                        marginTop: "0.5rem"
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window?.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        { 
                            product && product.tags.length > 0 ?  product.tags.map(v => {
                            return <p 
                                key={v}
                                id={"tags"}
                                onClick={(e) => deleteTag(e, v, setProduct, setTagState,  product, tagText)}
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
                            value={product?.weight}
                            type="number"
                            name="weight" />
                        <label style={{ 
                            top: product?.weight && product.weight  > 0 ? "-5px" : "", 
                            fontSize: product?.weight &&product.weight  > 0 ? "10px" : ""}}>Categories</label>
                    </div>
                </div>


                <div className={`${styles.row}`}
                    style={{
                        marginTop: "0.5rem"
                    }}>
                    <div className={`${styles.formItem} ${styles.row}`}
                        style={{
                            width: window?.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        { 
                            product && product.collections.length > 0 ?  product.collections.map(v => {
                            return <p 
                                key={v}
                                id={"tags"}
                                onClick={(e) => deleteTag(e, v, setProduct, setTagState, product, tagText)}
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



export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { handle } = params as ParsedUrlQuery;
    const url = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/products";
    const result = await impoweredRequest(url, "POST", {product_uuid: handle});

    console.log(" ==> SERVER SIDE");
    console.log(handle);
    console.log(result);

    if (!result) {
        throw new Error("Product list error");
    }

    console.log(" ==> SERVER SIDE");
    console.log(result);

    let products = [{}] as Product[];

    if (result?.data) {
        products = result?.data?.result[0]
    }

    return {
        props: {
            p: products
        }
    }
}

export default ProductDetail;