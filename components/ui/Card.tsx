import styles from "../../styles/Main.module.css";
import Underline from '../../components/ui/Underline';
import Link from 'next/link';
// import * as functions from "firebase-functions";
import React, { Dispatch, SetStateAction } from "react";

// Fonts
import { 
    Saira_Extra_Condensed,
} from '@next/font/google';
import { numberFormat, percentageFormatter } from "../../lib/helpers/formatters";
import { impoweredRequest } from "../../lib/helpers/requests";


const saira = Saira_Extra_Condensed({
weight: "400",
})

export interface CardHeaderProps {
    children?: JSX.Element,
    title: string
    header: string
    subHeader?: string | number
    width?: number,
    status?: boolean,
    id?: string,
    card_type?: "ORDER" | "DEFAULT" | "INFO" | "PAYMENT" | "CREATE",
    next?: string,
    prev?: string,
    setIndex?:  Dispatch<SetStateAction<{
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
  

/**
 * 
 * @param Props 
 * @returns 
 */
export const Card: React.FC<CardHeaderProps> = ({
    children,
    title,
    header,
    subHeader,
    width,
    card_type,
    status,
    next,
    prev,
    setIndex,
    steps,
    state
}) => {
    return (
        <div className={`${styles.card}`}
            >
            {
                card_type == "ORDER" || card_type == "PAYMENT" ?  
                    <OrderHeader status={status} header={header} subHeader={subHeader as string} title={title} width={width} card_type={card_type}/> : 
                    card_type == "INFO" ?  
                    <InfoHeader status={status} header={header} subHeader={subHeader as string} title={title} width={width} /> : 
                    card_type == "CREATE" ?  
                    <CreateHeader 
                        header={header} 
                        subHeader={subHeader as string}
                        title={title}
                        width={width}
                        next={next}
                        prev={prev}
                        setIndex={setIndex as Dispatch<SetStateAction<{
                            required: boolean;
                            complete: boolean;
                            active: boolean;
                            title: string;
                            step: string;
                        }[]>> }
                        steps={steps}
                        state={state} /> :
                    <DefaultHeader 
                        header={header}
                        subHeader={subHeader as string}
                        title={title}
                        width={width} />
            }
            <main className={`${styles.col} ${styles.cardMain}`}
                style={{
                    overflowX: "scroll",
                    paddingTop: "5px"
                }}>
                {children}
            </main>
        </div>
    )
}

export const CreateHeader: React.FC<CardHeaderProps> = ({
    title,
    header,
    subHeader,
    width,
    next,
    prev,
    setIndex,
    steps,
    state,
}) => {
    console.log(steps);

    const handleNav = (s: string) => {
        let list: any[] = [];
        console.log(s)
        console.log(steps)

        steps?.forEach((step, i) => {
            if (step.step === s) {
                list = [
                    ...list,
                    {
                        required: step.required,
                        complete: false,
                        active: true,
                        title: step.title,
                        step: step.step,
                    }
                ]
            } else {
                list = [
                    ...list,
                    {
                        required: step.required,
                        complete: false,
                        active: false,
                        title: step.title,
                        step: step.step,
                    }
                ]
            }
        })
        console.log(list)

        if  (setIndex) setIndex(list);
       
    }

    const url = "https://us-central1-impowered-funnel.cloudfunctions.net/funnel";

    const handleSave = async (
        resource: string,
        body: any,
    ) => {
        console.log(resource + "\n" + body)
        const response = await impoweredRequest(url + resource,"POST",body);
        console.log("198: HANDLE CREATE -->\n", response)
    }

    const createVariants = async (
        resource: string,
        body: any,
    ) => {
        // console.log(resource + "\n" + body)
        // const response = await impoweredRequest(url + resource,"POST",body);
        console.log("198: VARIANTS -->\n")
    }

    const resource = "/products/create";
    const data: any = state;

    return (
        <header className={`${styles.col}`}>
            <div className={`${styles.col}`}>
                <div className={`${styles.row}`}
                    style={{}}>
                    <div className={`${styles.row}`}>
                        <h5 
                        style={{
                            fontSize: window.innerWidth > 720 ? 15 : "1.3vh",
                            lineHeight: window.innerWidth > 720 ? "" : "",
                        }}>{title + ""} </h5>
                    </div>
                    <div className={`${styles.row}`}
                        style={{justifyContent: "flex-end"}}>
                            {prev !== "" && prev != "SAVE" ? <p 
                                onClick={(e) => handleNav(prev as string)}
                                style={{
                                    marginLeft: "0.5rem",
                                    backgroundColor: subHeader as number > 0 ? "rgb(138, 242, 138)" : "",
                                    color: subHeader  as number > 0 ? "rgb(56, 56, 56)" : "",
                                    lineHeight: window.innerWidth > 720 ? "" : "",
                                    cursor: "pointer"
                                }}  
                                className={`${styles.tag}`}>Previous</p> : null}
                            {next !== ""  && next != "SAVE" && next !== "OPTIONS" ? <p 
                                onClick={() =>  handleNav(next as string)}
                                style={{
                                    marginLeft: "0.5rem",
                                    backgroundColor: subHeader as number > 0 ? "rgb(138, 242, 138)" : "",
                                    color: subHeader as number > 0 ? "rgb(56, 56, 56)" : "",
                                    lineHeight: window.innerWidth > 720 ? "" : "",
                                    cursor: "pointer"
                                }}  
                                className={`${styles.tag}`}>Next</p> : null}
                            {next === "SAVE" ? <p 
                                onClick={() =>  handleSave(resource, data)}
                                style={{
                                    marginLeft: "0.5rem",
                                    backgroundColor:  "rgb(138, 242, 138)",
                                    color:  "rgb(56, 56, 56)",
                                    lineHeight: window.innerWidth > 720 ? "" : "",
                                    cursor: "pointer"
                                }}  
                                className={`${styles.tag}`}>Create</p> : null}
                            {next === "OPTIONS" ? <><p 
                                onClick={() =>  handleNav("STEP_FOUR")}
                                style={{
                                    marginLeft: "0.5rem",
                                    backgroundColor: subHeader as number > 0 ? "rgb(138, 242, 138)" : "",
                                    color: subHeader as number > 0 ? "rgb(56, 56, 56)" : "",
                                    lineHeight: window.innerWidth > 720 ? "" : "",
                                    cursor: "pointer"
                                }}  
                                className={`${styles.tag}`}>Next</p> 
                                <p 
                                onClick={() =>  createVariants(resource, data)}
                                style={{
                                    marginLeft: "0.5rem",
                                    backgroundColor:  "rgb(138, 242, 138)",
                                    color:  "rgb(56, 56, 56)",
                                    lineHeight: window.innerWidth > 720 ? "" : "",
                                    cursor: "pointer"
                                }}  
                                className={`${styles.tag}`}>Create</p></>: null}
                    </div>
                </div>
                <div 
                    style={{
                        justifyContent: "flex-start",
                        alignItems: "flex-end",
                        marginTop: "1.5rem",
                        marginBottom: "2.4rem",
                    }}
                    className={`${styles.row}`}>
                    <h1 
                        style={{
                            lineHeight: window.innerWidth > 720 ? "25px" : "30px",
                        }}>
                    {header}
                    </h1>
                    {
                        typeof(subHeader) == "number" ?  
                            <p 
                                style={{
                                    marginLeft: "0.5rem",
                                    backgroundColor: subHeader > 0 ? "rgb(138, 242, 138)" : "",
                                    color: subHeader > 0 ? "rgb(56, 56, 56)" : "",
                                    lineHeight: window.innerWidth > 720 ? "" : "",
                                }}  
                                className={`${styles.tag}`}>{percentageFormatter(subHeader)}</p> : 
                                typeof(subHeader) == "string" && subHeader !== "" ? 
                                <p 
                                style={{
                                    margin: "0 0 0 0.5rem",
                                    // backgroundColor: subHeader > 0 ? "rgb(138, 242, 138)" : "",
                                    // color: subHeader > 0 ? "rgb(56, 56, 56)" : "",
                                    lineHeight: window.innerWidth > 720 ? "" : "",
                                }}  
                                className={``}>{subHeader}</p> : ""
                    }
                </div>
            </div>
            <Underline  width={width  as number}/>
      </header>
    )
}

export const DefaultHeader: React.FC<CardHeaderProps> = ({
    title,
    header,
    subHeader,
    width
}) => {
    console.log(typeof(subHeader))
    return (
        <header className={`${styles.col}`}>
            <div className={`${styles.col}`}>
                <h5 
                style={{
                    fontSize: window.innerWidth > 720 ? 15 : "1.3vh",
                    lineHeight: window.innerWidth > 720 ? "" : "",
                }}>{title + ""} </h5>
                <div 
                    style={{
                        justifyContent: "flex-start",
                        alignItems: "flex-end",
                        marginTop: "1.5rem",
                        marginBottom: "2.4rem",
                    }}
                    className={`${styles.row}`}>
                    <h1 
                        style={{
                            lineHeight: window.innerWidth > 720 ? "25px" : "30px",
                        }}>
                    {header}
                    </h1>
                    {
                        typeof(subHeader) == "number" ?  
                            <p 
                                style={{
                                    marginLeft: "0.5rem",
                                    backgroundColor: subHeader > 0 ? "rgb(138, 242, 138)" : "",
                                    color: subHeader > 0 ? "rgb(56, 56, 56)" : "",
                                    lineHeight: window.innerWidth > 720 ? "" : "",
                                }}  
                                className={`${styles.tag}`}>{percentageFormatter(subHeader)}</p> : 
                                typeof(subHeader) == "string" && subHeader !== "" ? 
                                <p 
                                style={{
                                    margin: "0 0 0 0.5rem",
                                    // backgroundColor: subHeader > 0 ? "rgb(138, 242, 138)" : "",
                                    // color: subHeader > 0 ? "rgb(56, 56, 56)" : "",
                                    lineHeight: window.innerWidth > 720 ? "" : "",
                                }}  
                                className={``}>{subHeader}</p> : ""
                    }
                </div>
            </div>
            <Underline  width={width  as number}/>
      </header>
    )
}


export const OrderHeader: React.FC<CardHeaderProps> = ({
    title,
    status,
    subHeader,
    width,
    header,
    card_type
}) => {

    console.log(header);
    return (
        <header 
            style={{
                paddingBottom: "3rem",
            }}
            className={`${styles.col}`}>
            <div className={`${styles.col}`}>
                <div className={`${styles.row}`}>
                    <div 
                        style={{
                            width: "85%",
                            justifyContent: "flex-start"
                        }}
                        className={`${styles.row}`} >
                        <h5 
                        style={{
                            fontSize: window.innerWidth > 720 ? 25 : "3vh",
                            lineHeight: window.innerWidth > 720 ? "" : "",
                        }}>{title}</h5>
                        { card_type !== "ORDER" ? <p 
                            style={{
                                marginLeft: "0.5rem",
                                backgroundColor: status ? "rgb(138, 242, 138)" : "",
                                color: status ? "rgb(56, 56, 56)" : ""
                            }}  
                            className={`${styles.tag}`}>{status ? "Paid 💰" : "Unpaid 🚨"}</p> :
                            <p 
                            style={{
                                marginLeft: "0.5rem",
                                backgroundColor: !status ? "rgb(138, 242, 138)" : "",
                                color: !status ? "rgb(56, 56, 56)" : ""
                            }}  
                            className={`${styles.tag}`}>{!status ? "Fullfilled 📦" : "Unfullfilled ⚠️"}</p>
                        }
                    </div>
                    <div 
                        style={{
                            width: "15%",
                            justifyContent: "flex-end"
                        }}
                        className={`${styles.row}`} >
                        <p style={{
                            fontSize: 20
                        }}>. . .</p>
                    </div>
                </div>
                {
                    subHeader == "" ? "" : <span style={{
                        marginTop: "0.5rem",
                        fontSize: window.innerWidth > 720 ? "0.5vw" : "0.7vh",
                        fontWeight: 100}}> {subHeader}</span>
                }
            </div>
            <div className={`${styles.col}`} style={{
                marginTop: "1rem"
            }}>
            <Underline width={width as number} />

                <h1 className={`${styles.col}`}>
                    {header == "" ? "" : <span style={{
                        fontWeight: 100,
                        marginTop: "4px",
                        fontSize: window.innerWidth > 720 ? "18px" : "14px"
                    }}> <b style={{
                        fontWeight: "bold",
                        fontSize: window.innerWidth > 720 ? "18px" : "14px"
                    }}>Tracking: </b>{header}</span>}
                </h1>
            </div>
      </header>
    )
};


export const InfoHeader: React.FC<CardHeaderProps> = ({
    title,
    status,
    subHeader,
    width,
    header
}) => {
    console.log(header);
    return (
        <header 
            style={{
                paddingBottom: "1rem",
            }}
            className={`${styles.col}`}>
            <div className={`${styles.col}`}>
                <div className={`${styles.row}`}>
                    <div 
                        style={{
                            width: "85%",
                            justifyContent: "flex-start"
                        }}
                        className={`${styles.row}`} >
                        <h5 
                        style={{
                            fontSize: window.innerWidth > 720 ? 25 : "3vh",
                            lineHeight: window.innerWidth > 720 ? "" : "",
                        }}>{title + ""} </h5>
                    </div>
                    <div 
                        style={{
                            width: "15%",
                            justifyContent: "flex-end"
                        }}
                        className={`${styles.row}`} >
                        <p style={{
                            fontSize: 20
                        }}>. . .</p>
                    </div>
                </div>
                <h1 className={`${styles.col} ${saira.className}`}>
                    {header == "" ? "" : <span style={{
                        fontWeight: 100,
                        fontSize: "1vw"
                    }}> <b style={{
                        fontWeight: "bold",
                        fontSize: "1.2vw"
                    }}>Tracking: </b>{header}</span>}
                    {subHeader == "" ? "" : <span style={{fontSize: "0.7vw"}}> {subHeader}</span> }
                </h1>
            </div>
            <div className={`${styles.col}`} style={{
                marginTop: "1rem"
            }}>
            <Underline width={width as number} />
            </div>
      </header>
    )
};