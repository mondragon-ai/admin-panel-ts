import styles from "../../styles/Main.module.css";
import Underline from '../../components/ui/Underline';
import Link from 'next/link';
import React from "react";

// Fonts
import { 
    Saira_Extra_Condensed,
} from '@next/font/google';


const saira = Saira_Extra_Condensed({
weight: "400",
})

type Props = {
    title: string,
    children: JSX.Element,
    header: string,
    subHeader?: string,
    width?: number,
    card_type?: "ORDER" | "DEFAULT" | "INFO" | "PAYMENT",
    status?: boolean,
};
  
export const Card: React.FC<Props> = ({
    children,
    title,
    header,
    subHeader,
    width,
    card_type,
    status
}) => {
    return (
        <div className={`${styles.card}`}>
            {
                card_type == "ORDER" || card_type == "PAYMENT" ?  
                    <OrderHeader status={status} header={header} subHeader={subHeader as string} title={title} width={width} card_type={card_type}/> : 
                    card_type == "INFO" ?  
                    <InfoHeader status={status} header={header} subHeader={subHeader as string} title={title} width={width} /> : 
                    <DefaultHeader header={header} subHeader={subHeader as string} title={title} width={width} />
            }
            <main className={`${styles.col} ${styles.cardMain}`}>
                {children}
            </main>
        </div>
    )
}

export interface HeaderProps {
    title: string
    header: string
    subHeader: string
    width?: number,
    status?: boolean,
    id?: string,
    card_type?: "ORDER" | "DEFAULT" | "INFO" | "PAYMENT",
}

export const DefaultHeader: React.FC<HeaderProps> = ({
    title,
    header,
    subHeader,
    width
}) => {
    return (
        <header className={`${styles.col}`}>
            <div className={`${styles.col}`}>
                <p>{title}</p>
                <h1 className={`${saira.className}`}>
                {header}
                {subHeader == "" ? "" : <span style={{fontSize: "12px"}}> {subHeader}</span> }
            </h1>
            </div>
            <Underline  width={width  as number}/>
      </header>
    )
}


export const OrderHeader: React.FC<HeaderProps> = ({
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
                            width: "75%",
                            justifyContent: "flex-start"
                        }}
                        className={`${styles.row}`} >
                        <p 
                        className={`${saira.className}`}
                        style={{
                            fontSize: window.innerWidth > 720 ? 20 : "3vh",
                            lineHeight: window.innerWidth > 720 ? "" : "20px",
                        }}>{title}</p>
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
                            width: "25%",
                            justifyContent: "flex-end"
                        }}
                        className={`${styles.row}`} >
                        <p style={{
                            fontSize: 20
                        }}>. . .</p>
                    </div>
                </div>
                <h1 className={`${styles.col}`}>
                    {header == "" ? "" : <span style={{
                        fontWeight: 100,
                        fontSize: window.innerWidth > 720 ? "0.7vw" : "1.5vh"
                    }}> <b style={{
                        fontWeight: "bold",
                        fontSize: window.innerWidth > 720 ? "0.7vw" : "1.5vh"
                    }}>Tracking: </b>{header}</span>}
                    {subHeader == "" ? "" : <span style={{
                        fontSize: window.innerWidth > 720 ? "0.5vw" : "0.7vh",
                        fontWeight: 100}}> {subHeader}</span> }
                </h1>
            </div>
            <Underline width={width as number} />
      </header>
    )
};


export const InfoHeader: React.FC<HeaderProps> = ({
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
                            justifyContent: "flex-start"
                        }}
                        className={`${styles.row}`} >
                        <p 
                        style={{
                            fontSize: 20
                        }}>{title}</p>
                    </div>
                    <div 
                        style={{
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
            <Underline width={width  as number} />
      </header>
    )
};