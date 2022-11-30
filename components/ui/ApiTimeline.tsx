import Image from "next/image";
import React, {FunctionComponent, useState} from "react";
import styles from "../../styles/Main.module.css";
import RichTextEditor from "./RichTextEditor";
import Underline from "./Underline";

const comments = [
    {
        content: "Order Created",
        date: new Date().toString()
    }
]

export const ApiTimeline: FunctionComponent<any> = ({

}) => {
    const [content, setContent] = React.useState("");

    return (
        <div className={`${styles.col} ${styles.timeline}`}>
            
            {/* Toggle Comments */}
            <div 
                className={`${styles.row}`}
                style={{
                    justifyContent: "flex-end",
                }}>
                <h5 style={{
                        margin: "0 0.2rem 0 0",
                    }}>Toggle Comments</h5>
                <div 
                    className={`${styles.row}`}
                    style={{
                        width: "5%",
                        justifyContent: "flex-end",
                    }}>
                    <input type="checkbox" name="" id="" />
                </div>
            </div>

            {/*  Foto && Text area */}
            <div
                className={`${styles.row}`}
                style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <div 
                    className={`${styles.row}`}
                    style={{
                        width: "25%",
                        justifyContent: "center",
                    }}>
                    <Image  
                        src={"https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png"} 
                        alt=""
                        width={60}
                        height={60}
                        style={{
                            border: "0.5px solid var(--accent)",
                            borderRadius: "30px"
                        }}/>
                </div>
                
                <div 
                    className={`${styles.row}`}
                    style={{
                        width: "75%",
                        justifyContent: "flex-end",
                    }}>
                    <div 
                        className={`${styles.row}`}>
                        <RichTextEditor content={content} setContent={setContent} />
                        {/* <input
                            className={`${styles.timeline}`}
                            onChange={(e) => makeComment(e.target.value)}
                            type="text"
                            name="start"
                            placeholder="" /> */}
                    </div>
                </div>
            </div>

            {/* Disclaimer TExt */}
            <div 
                className={`${styles.row}`}
                style={{
                    justifyContent: "flex-end",
                }}>
                <p 
                    style={{
                        textAlign: "right",
                        fontSize: window.innerWidth > 720 ? "10px" : "8px",
                        color: "grey"
                    }}>Only you and other team members can see this.</p>
            </div>

            {/* Comment container */}
            <div className={`${styles.col}`}>
                {
                    comments && comments.map(comment => {
                        return (
                            <div className={`${styles.col}`}>
                                <CommentRow date={comment.date} content={comment.content} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}


interface CommentProps {
    date: string,
    content: string
}

export const CommentRow: FunctionComponent<CommentProps>  = ({
    date,
    content
}) => {

    const TODAY = new Date().toString().substring(0, 15);

    return (

        <div
            className={`${styles.row}`}
            style={{
                justifyContent: "space-between",
            }}>
            <div 
                className={`${styles.row}`}
                style={{
                    width: "25%",
                    justifyContent: "center",
                }}>
                <Image  
                    src={"https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png"} 
                    alt=""
                    width={60}
                    height={60}
                    style={{
                        border: "0.5px solid var(--accent)",
                        borderRadius: "30px"
                    }}/>
            </div>
            
            <div 
                className={`${styles.col}`}
                style={{
                    width: "75%",
                    justifyContent: "flex-end",
                }}>
                <div 
                    className={`${styles.col}`}>
                    <h5 style={{
                            fontSize: "1.1rem",
                            marginTop: "0",
                        }}>{
                            date.substring(0, 15) == TODAY ? "Today" : date.substring(0, 15)
                        }
                    </h5>
                    {/* <Underline width={33} /> */}
                    <p style={{
                            margin: "0%",
                            fontSize: "0.8rem"
                        }}>{content}</p>
                </div>
            </div>
        </div>
    )
}