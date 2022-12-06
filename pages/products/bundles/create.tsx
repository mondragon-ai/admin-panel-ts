// import Image from "next/image";
import { Dispatch, FunctionComponent, SetStateAction,  useState } from "react";
// import { Card } from "../../components/ui/Card";
import FormProgress from "../../../components/ui/FormProgress";
// import Underline from "../../components/ui/Underline";
// import { numberFormat } from "../../lib/helpers/formatters";
// import { addTags, deleteTag } from "../../lib/helpers/tags";
import styles from "../../../styles/Main.module.css";
// import { ProductVariantRow } from "./p/[handle]";

// import * as crypto from "crypto";
// import { Product } from "../../lib/types/products";
// import ImageUploading from "react-images-uploading";

// // Storage Bucket
// import {
//     ref,
//     uploadBytesResumable,
//     getDownloadURL, 
//     uploadBytes
// } from "firebase/storage";
// import { storage } from "../../lib/firebase";

// const t = [
//     "VIP"
// ]

interface Prop {
    string: any
}

// type Props = {
//     setProduct:  Dispatch<SetStateAction<Product>>,
//     product: Product,
//     navForm?: Dispatch<SetStateAction<string>>,
//     setTags?: Dispatch<SetStateAction<string[]>>,
//     setTagState?: Dispatch<SetStateAction<string>>,
//     tags?: string[],
//     setIndex?: Dispatch<SetStateAction<{
//         required: boolean;
//         complete: boolean;
//         active: boolean;
//         title: string;
//         step: string;
//     }[]>>,
//     steps?: {
//         required: boolean;
//         complete: boolean;
//         active: boolean;
//         title: string;
//         step: string;
//     }[],
//     state?: any;
//     checkboxes?: any;
//     setCheckboxes?: any;
// }
 
const s = [
    {
        required: true,
        complete: false,
        active: false,
        title: "Product",
        step: "STEP_ONE"
    },
    
]
// const p = {
//     title: "1776 Hoodie",
//     status: false,
//     id: crypto.randomBytes(10).toString("hex"),
//     price: 6840,
//     collections: ["SALE", "Shirts"],
//     tags: ["VIP_ONLY"],
//     options: {
//         options1: ["Blue", "Red", "Black"],
//         options2: ["Large", "Medium", "Small"],
//         options3: [],

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
// }

const b = {}

export const createBundle: FunctionComponent<Prop> = () => {

    const [steps, setIndex] = useState(s);
    const [formStep, navForm] = useState("STEP_TWO")

    const [product, setProduct] = useState(b);

    const [checkboxes, setCheckboxes] = useState({
        is_digital: false,
        sell_overstock: true,
        requires_shipping: false
    })


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
                                <></>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    ) 
}


export default createBundle;