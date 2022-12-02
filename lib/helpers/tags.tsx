import { Dispatch, SetStateAction } from "react";
import { Product } from "../types/products";

// Delete tags
export const deleteTag = (
    e: any,
    value: string,
    setProduct: Dispatch<SetStateAction<any>>,
    setTagState: Dispatch<SetStateAction<any>>,
    product: Product,
    tagText?: {
        tags?: string,
        collections?: string,
        options1?: string,
        options2?: string,
        options3?: string,
    }
) => {

    let new_list = [];

    switch (e.target?.id) {

        case "tags":
            console.log("tags");
            new_list =  product?.tags?.filter((v) => { return v != value}) as string[];
    
            setProduct({
                ...product,
                tags: [...(new_list) as string[]]
            });
            setTagState({
                ...tagText,
                tags: ""
            });
            break;

        case "collections":
            console.log("collections");
            new_list = product?.collections?.filter((v) => { return v != value}) as string[];

            setProduct({
                ...product,
                collections: [...(new_list) as string[]]
            });
            setTagState({
                ...tagText,
                collections: ""
            });
            break;


        case "options1":
            console.log("collections");
            new_list = product?.options?.options1?.filter((v) => { return v != value}) as string[];

            setProduct({
                ...product,
                options: {
                    ...product.options,
                    options1: [...(new_list) as string[]]
                }
            });
            setTagState({
                ...tagText,
                options1: ""
            });
            break;


        case "options2":
            console.log("collections");
            new_list = product?.options?.options2?.filter((v) => { return v != value}) as string[];

            setProduct({
                ...product,
                options: {
                    ...product.options,
                    options2: [...(new_list) as string[]]
                }
            });
            setTagState({
                ...tagText,
                options2: ""
            });
            break;
        


        case "options3":
            console.log("collections");
            new_list = product?.options?.options3?.filter((v) => { return v != value}) as string[];

            setProduct({
                ...product,
                options: {
                    ...product.options,
                    options3: [...(new_list) as string[]]
                }
            });
            setTagState({
                ...tagText,
                options3: ""
            });
            break;
    
    
        default:

            console.log("default")
            break;
    }
}

export const addTags = (
    e: any,
    value: string,
    setProduct: Dispatch<SetStateAction<any>>,
    setTagState: Dispatch<SetStateAction<any>>,
    product: Product,
    tagText?: {
        tags?: string,
        collections?: string,
        options1?: string,
        options2?: string,
        options3?: string,
    }
) => {

    console.log(" ===> ADD TAGS")
    const key = e.key;

    if (key === "Enter") {
        switch (e.target?.id) {

            case "tags":
                console.log("tags");
                console.log(value);
                console.log(product.tags)
    
                setProduct({
                    ...product,
                    tags: [...(product?.tags) as string[], e.target?.value]
                });
                setTagState({
                    ...tagText,
                    tags: ""
                });
                break;
    
            case "collections":
                console.log("collections");
                console.log(value);
                console.log(product.collections)
    
                setProduct({
                    ...product,
                    collections: [...(product?.collections) as string[], e.target?.value]
                });
                setTagState({
                    ...tagText,
                    collections: ""
                });
                break;


            case "options1":
                console.log("collections");

                setProduct({
                    ...product,
                    options: {
                        ...product.options,
                        options1: [...(product.options.options1) as string[], e.target?.value]
                    }
                });
                setTagState({
                    ...tagText,
                    options1: ""
                });
                break;


            case "options2":
                console.log("collections");

                setProduct({
                    ...product,
                    options: {
                        ...product.options,
                        options2: [...(product.options.options2) as string[], e.target?.value]
                    }
                });
                setTagState({
                    ...tagText,
                    options2: ""
                });
                break;

            case "options3":
                console.log("collections");

                setProduct({
                    ...product,
                    options: {
                        ...product.options,
                        options3: [...(product.options.options3) as string[], e.target?.value]
                    }
                });
                setTagState({
                    ...tagText,
                    options3: ""
                });
                break;
        
        
            default:
    
                console.log("default")
                console.log(e.target)
                break;
        }
    }

}