import { FunctionComponent } from "react";
import styles from "../../styles/Main.module.css";

type Step = {
    required: boolean,
    complete: boolean,
    active: boolean,
    title: string,
}

type Props = {
    steps: Step[],
    formStep: string
}

export const FormProgress: FunctionComponent<Props> = ({steps}) => {

    return (
        <div className={`${styles.row} ${styles.twoThird}`}
            style={{
                justifyContent: "space-between",
                marginTop: "1rem"
            }}>
            {steps && steps.map((step, i) => {
                return (
                    <div
                        style={{
                            width: (100 / steps.length) + "%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        className={`${styles.col}`}>
                        <div 
                            style={{
                                width: window.innerWidth > 720 ? "50px" : "30px",
                                height:  window.innerWidth > 720 ? "50px" : "30px",
                                background: 'black',
                                borderRadius:  window.innerWidth > 720 ? "25px" : "15px",
                            }}>
                                <h4 style={{
                                    margin: 0,
                                    color: step.active ? "var(--accent)" : step.complete ? "#cccccc" : "rgb(75 75 75)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    lineHeight: window.innerWidth > 720 ? "50px" : "30px",
                                    fontSize: window.innerWidth > 720 ? "" : "10px",
                                }}>{i+1}</h4>
                            </div>
                            <h4 style={{
                                    margin: 0,
                                    color: step.active ? "black" : step.complete ? "#373737" :  "rgb(122 122 122)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    lineHeight: window.innerWidth > 720 ? "50px" : "30px",
                                    fontSize: window.innerWidth > 720 ? "" : "10px",
                                }}>{step.title}</h4>
                    </div>
                )
            })}
        </div>
    )
}

export default FormProgress;
