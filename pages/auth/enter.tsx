import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { SetStateAction, useState } from "react";
import { auth } from "../../lib/firebase";
import {User} from "@firebase/auth/dist/auth-public";
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


// const auth = getAuth();
const updateUser = async (
    toggleState: SetStateAction<any>,
    loadingState: SetStateAction<any>,
    setErr: SetStateAction<any>,
    first_name: string
) => {
    console.log(first_name);

    const user = auth?.currentUser as User;

    await updateProfile(user, {
        displayName: first_name,
        photoURL: "https://preview.redd.it/do-people-still-like-deku-i-mean-with-the-multiple-quirks-v0-0n2llx05e5p91.jpg?auto=webp&s=de896ef0fd36735be9ff048149135fa39f723f84",
    }).then(() => {

        // Update states
        toggleState(true);
        loadingState(false);
        console.log("SUCCESS");

    }).catch((error) => {

        // Update states
        loadingState(false);
        setErr("Profile not updated succesfully.");
        console.log("SUCCESS");

        // Debug
        console.log(error.code);
    });
}
        

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

const IMG_URL = "https://cdn.dribbble.com/assets/auth/sign-in-a63d9cf6c1f626ccbde669c582b10457b07523adb58c2a4b46833b7b4925d9a3.jpg";
const IMG_NFT = "https://vagazine.com/vaga_v3/wp-content/uploads/2022/04/ezgif.com-gif-maker-1.gif";
const LOGO = "https://cdn.shopify.com/s/files/1/0574/9263/5817/files/bigly_logo_art_file.png?v=1626380659&width=300";

const authUser = auth;
export default function Enter() {

    // Input State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState("");

    // Auth State
    const [authState, toggleState] = useState(false);

    // Toggle password view
    const [showPass, hidePass] = useState(false);

    // err handling state
    const [error, setErr] = useState("")

    // Form type 
    const [FORM_STATE, setFormState] = useState<"SIGN_UP" | "SIGN_IN" | "">("SIGN_UP");

    // async loading handling for UI
    const [loading, setLoading] = useState(false);


    let text = "app"

    const signIn = (e: any) => {
        e.preventDefault();
        setLoading(true);

        signInWithEmailAndPassword(authUser, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                // Update states
                toggleState(true);
                setLoading(false);

                // Debug
                console.log(user)
            })
            .catch((err) => {
                // Update states
                setLoading(false);
                setErr("Email or password did not match. Reset password?");

                // Debug
                console.log(err.code);
            });
    } 

    const signUp = (e: any) => {
        e.preventDefault();

        // Start Loading
        setLoading(true);

        // Create account & send POST to create database || LINK
        createUserWithEmailAndPassword(authUser, email, password)
            .then( async (userCredential) => {
                // Signed Up
                const user = userCredential.user;

                if (user !== null) {
                  user.providerData.forEach((profile) => {
                    console.log(" => Sign-in provider: " + profile);
                    console.log("Sign-in provider: " + profile.providerId);
                    console.log("  Provider-specific UID: " + profile.uid);
                    console.log("  Name: " + profile.displayName);
                    console.log("  Email: " + profile.email);
                    console.log("  Photo URL: " + profile.photoURL);
                  });
                }

                // Update user Auth Profile
                await updateUser(
                    toggleState,
                    setLoading,
                    setErr,
                    first_name);

                // Debug
                console.log("Signed Up -- Created - FN: " + first_name);
                console.log("  UUID: " + user.uid);
                console.log("  TOKEN: " + await user.getIdToken());
                console.log("  VERIFIED: " + user.emailVerified);
                console.log("  VERIFIED: " +  user.email);
                console.log("  NAME: " +  user.displayName);
                console.log("  IS ANON: " +  user.isAnonymous);
            })
            .catch((error) => {
                // Update states
                setErr("Email already exists. Sign in?");
                setLoading(false);

                // Debug
                console.log(error.code);
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
                    {FORM_STATE == "SIGN_UP" ? <h5 onClick={() => setFormState("SIGN_IN")}>Have an account? Log in</h5> : <h5 onClick={() => setFormState("SIGN_UP")}>Sign Up Now 🆕</h5>}         
                </header>
                <form className={`${styles.col} ${styles.formItem} ${auth_styles.authForm}`}>
                    <h3 className={`${saira.className}`}>  {FORM_STATE == "SIGN_UP"  ? "Sign up to" : "Sign in to"} </h3>
                    <div className={`${styles.row}`}>
                        <h2 className={`${bungee.className} ${auth_styles.imPowered}`}>imPowered</h2>
                    </div>
                   {FORM_STATE == "SIGN_UP" ? <div className={`${styles.row} ${styles.topLeft}`}>
                        <label 
                            className={`${styles.formItem} ${styles.row}`}
                            htmlFor="first_name">
                            <input
                                onChange={(e) => setFirstName(e.target.value)}
                                type="first_name"
                                name="first_name"
                                placeholder="" />
                            <label style={{ 
                                top: first_name && first_name != "" ? "-5px" : "", 
                                fontSize: first_name && first_name != "" ? "10px" : ""}}>First Name </label>
                        </label>
                    </div> : null}
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
                                top: email && email != "" ? "-5px" : "", 
                                fontSize: email && email != ""  ? "10px" : ""}}>Email </label>
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
                                    top: password && password != "" ? "-5px" : "", 
                                    fontSize: password && password != "" ? "10px" : ""}}
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
                                onClick={(e) => signUp(e)}>{loading ? "Loading . . ." : "Sign Up"}</button> :  
                            !authState && FORM_STATE == "SIGN_IN" ? 
                            <button 
                                style={{
                                    padding: "0.5rem 1.2rem"
                                }}
                                onClick={(e) => signIn(e)}>{loading ? "Loading . . ." : "Sign In"}</button> : 
                            <button disabled={true}>Loading . . .</button> 
                        }
                    </div>

                    <div className={`${styles.row}  ${auth_styles.errMsgRow} ${anonPro.className}`}>
                        {
                            error != "" ? <div><p>{error}</p></div> : null
                        }
                    </div>
                </form>
            </section>
        </div>
    )
}