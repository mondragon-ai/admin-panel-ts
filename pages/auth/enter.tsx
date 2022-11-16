import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { use, useState } from "react";
import { auth } from "../../lib/firebase";
import {User} from "@firebase/auth-types"
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Main.module.css";
import auth_styles from '../../styles/Auth.module.css';
import {
    faEyeSlash,
    faEye
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Fonts? 
import { 
    Merienda_One,
    Saira_Extra_Condensed,
    Anonymous_Pro,
    Bungee_Shade,
} from '@next/font/google'

const meriendaOne = Merienda_One({
  weight: '400',
})

const saira = Saira_Extra_Condensed({
    weight: "400",
})

const bungee = Bungee_Shade({
    weight: '400'
})

const anonPro = Anonymous_Pro({
    weight: "400",
})

const IMG_URL = "https://cdn.dribbble.com/assets/auth/sign-in-a63d9cf6c1f626ccbde669c582b10457b07523adb58c2a4b46833b7b4925d9a3.jpg"
const IMG_NFT = "https://vagazine.com/vaga_v3/wp-content/uploads/2022/04/ezgif.com-gif-maker-1.gif";
const LOGO = "https://cdn.shopify.com/s/files/1/0574/9263/5817/files/bigly_logo_art_file.png?v=1626380659&width=300";

const authUser = auth;
export default function Enter() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authState, toggleState] = useState(false);
    const [showPass, hidePass] = useState(false);
    const [error, setErr] = useState("")
    const [FORM_STATE, setFormState] = useState<"SIGN_UP" | "SIGN_IN" | "">("SIGN_UP");
    const [loading, setLoading] = useState(false);
    // const [text, setText] = useState("");

    let text = "app"
    // let i = 0;
    // const words = ["Site", "App", "Blog", "Store", "NFT"];

    // setInterval(() => {
    //     // console.log("interval")
    //     if (i)
    //     i = i+1;
    //     // setText(words[(i % words.length)]);
    //     console.log(text)
    // }, 500)

    const signIn = (e: any) => {
        e.preventDefault();

        signInWithEmailAndPassword(authUser, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                toggleState(true);
            })
            .catch((err) => {
                const errCode = err.code;
                const errMsg = err.message;
                console.log(" => ERROR")
                console.log(errCode + " " + errMsg)
            });
    } 

    const signUp = (e: any) => {
        e.preventDefault();
        createUserWithEmailAndPassword(authUser, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                toggleState(true);
                console.log("Signed Up -- Created");
                console.log(user)
                // setUser(user)
                // ...
            })
            .catch((error) => {
                console.log("Signed Up Error");
                const errorCode = error.code;
                const errorMessage = error.message;
                setErr(errorCode + " " + errorMessage);
            });
    }

    return (
        <div className={` ${styles.row} ${auth_styles.authPage}`}>
            <section className={`${styles.col} ${auth_styles.leftSide}`}>
                <header className={`${styles.col}`}>
                    <div>
                        <Image 
                            src={LOGO} 
                            alt="imPowered Logo" 
                            width={50}
                            height={50}
                        />
                    </div>
                    <h4 className={`${saira.className} ${auth_styles.moto}`}> Bring your next big idea to life with our
                    {/* <span> {text} </span> */}
                    builder </h4>
                </header>
                <div className={`${styles.col} ${auth_styles.colRight}`}>

                    <div className={`${styles.col} ${auth_styles.art}`}>
                        <div>
                            <Image 
                                className={`${auth_styles.className}`}
                                src={IMG_NFT} 
                                alt="Art for enter now page." 
                                width={250}
                                height={200}/>
                        </div>
                    </div>
                    <footer  className={`${saira.className}`}>
                        <p>Art by</p>
                        <Link
                            className={`${auth_styles.artistList}`}
                            href={"/"}>Lorem Ipsum</Link> 
                    </footer>
                </div>
            </section>
            <section className={`${styles.col} ${auth_styles.rightSide}`}>
                <header className={`${styles.row} ${auth_styles.formToggle}`}>
                    {FORM_STATE == "SIGN_UP" ? <h5 onClick={() => setFormState("SIGN_IN")}>Sign Up</h5> : <h5 onClick={() => setFormState("SIGN_UP")}>Sign In</h5>}         
                </header>
                <form className={`${styles.col} ${styles.formItem} ${auth_styles.authForm}`}>
                    <h3 className={`${saira.className}`}>  {FORM_STATE == "SIGN_UP"  ? "Sign up to" : "Sign in to"} </h3>
                    <div className={`${styles.row}`}>
                        <h2 className={`${bungee.className} ${auth_styles.imPowered}`}>imPowered</h2>
                    </div>
                    <div className={`${styles.row} ${styles.topLeft}`}>
                        <label 
                            className={`${styles.formItem} ${styles.row}`}
                            htmlFor="email">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                placeholder="" />
                            <label style={{ 
                                top: email != "" ? "-5px" : "", 
                                fontSize: email != "" ? "10px" : ""}}>Email </label>
                        </label>
                    </div>
                    <div className={`${styles.row} ${styles.topLeft}`}>
                        <label 
                            className={`${styles.formItem} ${styles.row}`}
                            htmlFor="password">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPass ? "text" : "password" }
                                name="password"
                                placeholder="" />
                            <label 
                                style={{ 
                                    top: password != "" ? "-5px" : "", 
                                    fontSize: password != "" ? "10px" : ""}}
                                onClick={() => hidePass(!showPass)}>
                                    Password 
                                    <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye } />
                            </label>
                        </label>
                    </div>
                    <div className={`${styles.row} ${auth_styles.btnRow}`}>
                        {   
                            !authState && FORM_STATE == "SIGN_UP" ? 
                            <button 
                                style={{
                                    padding: "0.5rem 1.2rem"
                                }}
                                onClick={(e) => signUp(e)}>Sign Up </button> :  
                            !authState && FORM_STATE == "SIGN_IN" ? 
                            <button 
                                style={{
                                    padding: "0.5rem 1.2rem"
                                }}
                                onClick={(e) => signIn(e)}>Sign In</button> : 
                            <button disabled={true}>Loading . . .</button> 
                        }
                    </div>

                    <div className={`${styles.row}  ${auth_styles.errMsgRow} ${anonPro.className}`}>
                        {   !authState && !loading ? 
                            null  : 
                            <div><p>NOT ACIVE USER</p></div> 
                        }
                    </div>
                </form>
            </section>
        </div>
    )
}