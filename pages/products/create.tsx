import Image from "next/image";
import { ChangeEvent, Dispatch, FunctionComponent, MouseEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { Card } from "../../components/ui/Card";
import FormProgress from "../../components/ui/FormProgress";
import Underline from "../../components/ui/Underline";
import { numberFormat } from "../../lib/helpers/formatters";
import { addTags, deleteTag } from "../../lib/helpers/tags";
import styles from "../../styles/Main.module.css";
import { ProductVariantRow } from "./p/[handle]";

import * as crypto from "crypto";
import { Product } from "../../lib/types/products";
// import ImageUploading from "react-images-uploading";

// Storage Bucket
import {
    ref,
    uploadBytesResumable,
    getDownloadURL, 
    uploadBytes
} from "firebase/storage";
import { storage } from "../../lib/firebase";

const t = [
    "VIP"
]

interface Prop {
    string: any
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
 
const s = [
    {
        required: true,
        complete: false,
        active: false,
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
        active: true,
        title: "Media",
        step: "STEP_FOUR"
    }
]
const p = {
    title: "1776 Hoodie",
    status: false,
    id: crypto.randomBytes(10).toString("hex"),
    price: 6840,
    collections: ["SALE", "Shirts"],
    tags: ["VIP_ONLY"],
    options: {
        options1: ["Blue", "Red", "Black"],
        options2: ["Large", "Medium", "Small"],
        options3: [],

    },
    quantity: 20,
    description: "description here",
    compare_at_price: 0,
    weight: 0.5,
    is_digital: false,
    sell_overstock: true,
    requires_shipping: false,
    videos: [
        {
            id: "vid_" + crypto.randomBytes(10).toString("hex"),
            url: "",
            type: "YOUTUBE"
        }
    ],
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

    console.log(product)

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
                                    product={product as any}
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
                                    product={product as any}
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
                                    product={product as any}
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
                                    product={product as any}
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

export type ImgProps = {
    images: any[]
}

export const ImageContainer: FunctionComponent<ImgProps> = ({images}) => {

    // console.log(images)

    if (images.length == 0) {
        return <div className={`${styles.col} `}>
        <Image
            src={"https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png"}
            height={100}
            width={100}
            style={{backgroundColor: "none"}}
            alt={""}
            />
    </div>;
    }

    const singleImg = <div className={`${styles.col} `}>
                <Image
                    src={images[0] ? images[images.length-1] : "https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png"}
                    height={100}
                    width={100}
                    style={{backgroundColor: "none"}}
                    alt={""}
                    />
            </div>

    const othereImg = images?.map((v,i) => {

        return(
            <div 
                key={v} 
                className={``}>
                    {i < images.length-1 ? <Image
                    src={i < images.length-1 ? v : ""}
                    height={100}
                    width={100}
                    style={{backgroundColor: "none"}}
                    alt={""}
                    /> : null}
            </div>
        )
    })

    return (
        <div className={`${styles.col}`}>
            {singleImg}
            <div className={`${styles.row} ${styles.othereImgContainer}`}>
                {images.length > 1 ? othereImg : null}
            </div>
        </div>
    )
}

// export function AddImage({
//     maxNumber,
//     product_id
// }) {
    

//     const [images, setImages] = useState([]);
//     const [addImage, toggleImg] = useState(false)

//     const [percent, setPercent] = useState(0);
//     const [alt_text, setAlt] = useState("");
//     const uploadImg = () => {
//         if (!images[0]) {
//             alert("Please choose a file first!")
//         };
     
//         // console.log(images[0]);

//         // call FB storage bucket
//         const storageRef = ref(storage, `/images/test/${images[0]?.file?.name}`)
//         const uploadTask = uploadBytesResumable(storageRef, images[0]?.file);
     
//         // 
//         uploadTask.on(
//             "state_changed",
//             (snapshot) => {
//                 const percent = Math.round(
//                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//                 );
     
//                 // update progress
//                 setPercent(percent);
//             },
//             (err) => console.log(err),
//             () => {
//                 // download url
//                 getDownloadURL(uploadTask.snapshot.ref).then( async (url) => {
//                     // console.log(url);

//                     // Send to DB via api/ Fetch data from external API
//                     const res = await fetch(`https://us-central1-shopify-recharge-352914.cloudfunctions.net/platform/products/add/images`,{
//                         method: 'POST',
//                         headers: { 'Content-Type': 'application/json' },
//                         body: JSON.stringify({ 
//                             FB_MERCHANT_UUID: 'QilaBD5FGdnF9iX5K9k7',
//                             product_uuid: `pro_${handle}`,
//                             image_data: {
//                                 src: url, 
//                                 alt_text: alt_text
//                             }
//                         })
//                     });

//                     // 
//                     if (res.ok) {
//                         setPercent(0);
//                         toggleImg(!addImage);
//                         const data = await res.json();

//                         console.log(data);
//                         alert("SUCCESS")
//                     };
//                 });
//             }
//         ); 
//     }

//     return (
//         <div  className={`${styles.col} ${styles.moduleBkg}`}>
//             <div className={`${styles.col}  ${styles.card} ${styles.module}`}>
//                 <header className={`${styles.row} ${styles.justifyBtwn}`}>
//                     <h4>Add Image Details Here</h4>
//                     <h4 onClick={() => toggleImg(!addImage)} className={`${styles.closeBtn}`}>Close</h4>
//                 </header>
//                 <ImageUploading
//                     onChange={onChange}
//                     multiple
//                     value={images}
//                     maxNumber={maxNumber}
//                     dataURLKey="data_url"
//                 >

//                     {({
//                         imageList,
//                         onImageUpload,
//                         onImageRemoveAll,
//                         onImageUpdate,
//                         onImageRemove,
//                         isDragging,
//                         dragProps,
//                         }) => (
//                     // write your building UI
//                     <div className={styles.upload__image_wrapper}>
//                         <div className={styles.row}>
//                             {imageList.length > 0 ? 
//                                 <div className={styles.featureContainer}>
//                                     <div className={styles.imageItem}>
//                                         <Image
//                                             src={imageList[0]['data_url']}
//                                             height={100}
//                                             width={100}
//                                             style={{backgroundColor: "black"}}
//                                         />
//                                         <div className={styles.imgBtnWrappers}>
//                                             <button onClick={() => onImageUpdate(0)}>♲</button>
//                                             <button onClick={() => onImageRemove(0)}>🚮</button>
//                                         </div>
//                                     </div>
//                                 </div> : 
//                                 <div className={styles.featureContainer}>
//                                     <div className={styles.imageItem}>
//                                         <Image
//                                             src={'https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png'}
//                                             height={100}
//                                             width={100}
//                                             style={{backgroundColor: "none"}}
//                                         />
//                                     </div>
//                                 </div>
//                             }

//                             <div className={`${styles.col} ${styles.addImage}`}>
//                                 <label htmlFor="title">
//                                     <p>Alt Text</p>
//                                     <input
//                                         type="text"
//                                         id="title"
//                                         name="title"
//                                         placeholder={"Alt Title Text Here...."}
//                                         onChange={(e) => setAlt(e.target.value)} />
//                                 </label>

//                                 <div>
//                                     <button
//                                     style={isDragging ? { color: 'red' } : undefined}
//                                     onClick={onImageUpload}
//                                     {...dragProps}
//                                     >
//                                         Select or Drag Image
//                                     📸
//                                     </button>
//                                     {/* &nbsp; */}
//                                     { imageList.length > 0 ? <button onClick={() => uploadImg()}>Upload Image </button> : null}
//                                 </div>
//                                 <div className={styles.progressbarContainer}>
//                                     <div
//                                         className={styles.progressbar}
//                                         style={{
//                                             width: `${percent}%`
//                                         }}></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     )}

//                 </ImageUploading>
//             </div>
//         </div> 
//     )
// }



export const StepFour: FunctionComponent<Props> = ({
    setProduct,
    product,
    navForm,
    setIndex,
    steps
}) => {

    const [image, setImage] = useState<File | string>("");
    const [createObjURL, setCreateObjectURL] = useState<any>(null)
    const [percent, setPercent] = useState<number>(0)

    const [images, setImages] = useState<{url: string, alt?: ""}[]>(
    [
        {
            url: "",
            alt: "", 

        }, 
        {
            url: "",
            alt: "", 

        },
        {
            url: "",
            alt: "", 

        }
    ]);
        

    const uploadToClient = (event: ChangeEvent<HTMLInputElement | any>) => {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];

        console.log(" => Percent (start)");
        console.log(percent)
    
        setImage(i);

        let reset_imgs: {url: string, alt?: ""}[] = [];
        let uploaded = false

        images.forEach(img => {
            if (img.url === "" && !uploaded) {
                setCreateObjectURL(URL.createObjectURL(i));
                uploaded = true;
                reset_imgs = [
                    ...reset_imgs,
                    {
                        url: URL.createObjectURL(i),
                        alt: ""
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
                        const images = product?.images ? product?.images : []
                        setProduct({
                            ...product,
                            images: [
                                ...images,
                                {
                                    id: "img_" + crypto.randomBytes(10).toString("hex"),
                                    url: url,
                                    alt: "test"
                                }
                            ]
                        })
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
    const handleClick = (event: MouseEvent) => {
        hiddenFileInput = hiddenFileInput?.current?.click();
    };
    return (
        <Card 
            card_type="CREATE"
            title="Manage Images & Videos"
            header={""}
            next={"SAVE"}
            prev={"STEP_THREE"}
            setIndex={setIndex}
            steps={steps}
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
                                            onClick={handleClick}
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

export const StepThree: FunctionComponent<Props> = ({
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
            steps={steps}
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
            <div className={`${styles.col}`}>
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


    const [tagText, setTagState] = useState<{
        tags: string,
        collections: string
    }>({
        tags: "",
        collections: ""
    });

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
                    
                    <div className={`${styles.col}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <div className={`${styles.formItem} ${styles.row}`}>
                            <input
                                style={{
                                    color: "white"
                                }}
                                id={"tags"}
                                onKeyDown={(e) => addTags(e, tagText.tags, setProduct, setTagState,  product, tagText)}
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
                                justifyContent: "flex-start",
                                // width: window.innerWidth > 720 ? "33%" : "100%",
                                padding: "0 5px"
                            }}>
                            { 
                                product.tags && product.tags.length > 0 ?  product.tags.map(v => {
                                return <p 
                                    key={v}
                                    id={"tags"}
                                    style={{marginRight: "0.5rem" }} 
                                    onClick={(e) => deleteTag(e, v, setProduct, setTagState, product, tagText)}
                                    className={`${styles.tagItem}`}>{v} <b>x</b> </p> 
                                }) : null
                            }
                        </div>
                    </div>
                    <div className={`${styles.col}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <div className={`${styles.formItem} ${styles.row}`}>
                            <input
                                style={{
                                    color: "white"
                                }}
                                id={"collections"}
                                onKeyDown={(e) => addTags(e, tagText.tags, setProduct, setTagState,  product, tagText)}
                                onChange={(e) => setTagState({
                                    ...tagText,
                                    collections: e.target.value
                                })}
                                value={tagText.collections}
                                type="text"
                                name="collections" />
                            <label style={{ 
                                top:  tagText.collections !== ""  ? "-5px" : "", 
                                fontSize:  tagText.collections !== ""  ? "10px" : ""}}>Collections</label>
                        </div>

                        <div className={`${styles.formItem} ${styles.row}`}
                            style={{
                                justifyContent: "flex-start",
                                // width: window.innerWidth > 720 ? "33%" : "100%",
                                padding: "0 5px"
                            }}>
                            { 
                                product?.collections && product.collections.length > 0 ?  product.collections.map(v => {
                                return <p 
                                    key={v}
                                    id={"collections"}
                                    style={{marginRight: "0.5rem" }} 
                                    onClick={(e) => deleteTag(e, v, setProduct, setTagState, product, tagText)}
                                    className={`${styles.tagItem}`}>{v} <b>x</b> </p> 
                                }) : null
                            }
                        </div>
                    </div>

                    <div className={`${styles.col}`}
                        style={{
                            width: window.innerWidth > 720 ? "33%" : "100%",
                            padding: "0 5px"
                        }}>
                        <div className={`${styles.formItem} ${styles.row}`}>
                            <input
                                style={{
                                    color: "white"
                                }}
                                id={"collections"}
                                onChange={(e) => setProduct({
                                    ...product,
                                    sku: e.target.value
                                })}
                                value={product.sku}
                                type="text"
                                name="collections" />
                            <label style={{ 
                                top:  product.sku !== ""  ? "-5px" : "", 
                                fontSize:  product.sku !== ""  ? "10px" : ""}}>SKU | BARCODE</label>
                        </div>

                        <div className={`${styles.formItem} ${styles.row}`}
                            style={{
                                // width: window.innerWidth > 720 ? "33%" : "100%",
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
                </div>

                <div className={`${styles.row}`}
                    style={{
                        marginTop: "1.5rem"
                    }}>
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
                                top: product.compare_at_price && product.compare_at_price > 0 ? "-5px" : "", 
                                fontSize: product.compare_at_price && product.compare_at_price > 0 ? "10px" : ""}}>Compare at Price </label>
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
                            top: product.weight && product.weight  > 0 ? "-5px" : "", 
                            fontSize: product.weight && product.weight  > 0 ? "10px" : ""}}>Weight</label>
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