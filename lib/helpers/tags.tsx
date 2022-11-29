import { Dispatch, SetStateAction } from "react";

    // Delete tags
    export const deleteTag = (
        e: any,
        value: string,
        setTags: Dispatch<SetStateAction<string[]>>,
        setTagState: Dispatch<SetStateAction<string>>,
        tags: string[]
    ) => {

        let l = [];
        let new_list = [];

        switch (e.target?.id) {

            case "tags":
                console.log("tags");
                console.log(value);
                new_list = tags.filter((v) => { return v != value});

                setTags(new_list);
                setTagState("");
                break;
        
            default:

                console.log("default")
                console.log(e.target)
                break;
        }
    }