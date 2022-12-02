import { Dispatch, SetStateAction } from "react";

// Delete tags
export const deleteTag = (
    e: any,
    value: string,
    setTags: Dispatch<SetStateAction<any>>,
    setTagState: Dispatch<SetStateAction<any>>,
    tags: {tags: string[],collections: string[]},
    tagText?: {tags: string,collections: string,}
) => {

    let new_list = [];

    switch (e.target?.id) {

        case "tags":
            console.log("tags");
            new_list = tags.tags.filter((v) => { return v != value});

            setTags({
                ...tags,
                tags: new_list
            });
            setTagState({
                ...tagText,
                tags: ""
            });
            break;

        case "collections":
            console.log("collections");
            new_list = tags.collections.filter((v) => { return v != value});

            
            setTags({
                ...tags,
                collections: new_list
            });
            setTagState({
                ...tagText,
                collections: ""
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
    setTags: Dispatch<SetStateAction<any>>,
    setTagState: Dispatch<SetStateAction<any>>,
    tags: {tags: string[],collections: string[]},
    tagText?: {tags: string,collections: string,}
) => {

    console.log(" ===> ADD TAGS")
    const key = e.key;

    if (key === "Enter") {
        switch (e.target?.id) {

            case "tags":
                console.log("tags");
                console.log(value);
                console.log(tags)
    
                setTags({
                    ...tags,
                    tags: [...tags.tags, value]
                });
                setTagState({
                    ...tagText,
                    tags: ""
                });
                break;
    
            case "collections":
                console.log("collections");
                console.log(value);
                
                setTags({
                    ...tags,
                    collections: [...tags.collections, value]
                });
                setTagState({
                    ...tagText,
                    collections: ""
                });
                break;
        
            default:
    
                console.log("default")
                console.log(e.target)
                break;
        }
    }

}