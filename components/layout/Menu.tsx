import styles from "../../styles/Main.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
    faGauge,
    faMagnifyingGlassChart,
    faUsers,
    faBasketShopping,
    faPercent,
    faMoneyBillTransfer,
    faTruckFast,
    faSliders,
    faArrowRightFromBracket,
    faPersonThroughWindow
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Underline from "../ui/Underline";
import { Dispatch, FC, FunctionComponent, MouseEvent, SetStateAction, useState } from "react";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";

const authState = auth;

const URL = "https://cdn.shopify.com/s/files/1/0574/9263/5817/files/bigly_logo_art_file.png?v=1626380659&width=300";
type Props = {
    openState: boolean,
    toggleMenu: Dispatch<SetStateAction<boolean>>
}
export const Menu: FunctionComponent<Props> = ({openState, toggleMenu}) => {

    const router = useRouter();
    console.log(router.pathname);


    const logOut = (e: MouseEvent<any>) => {
        e.preventDefault();
        signOut(authState)
            .then(() => {
                // Sign-out successful.
                console.log("Signed Out");
            }).catch((error) => {
            // An error happened.
                console.log("Signed Out");
            })
    };

    return (
        <nav 
            className={`${styles.col} ${styles.sideBar} `} 
            style={{
                marginLeft: window.innerWidth > 720 ?  "0" : !openState ?   "-600px" : "0",
                height: window.innerHeight < 720 ? "" + (window.innerHeight + 600) + "px" : "" + (window.innerHeight) + "px",
                minHeight: "" + window.innerHeight + "px",
            }}>
            <header className={`${styles.col} ${styles.topHeaderMobile}`}>
                <div className={`${styles.row}`}>
                    <Image
                    src={URL}
                    alt="imPowered Logo"
                    width={90} 
                    height={90}/>
                    <div 
                        onClick={(e) => toggleMenu(!openState)}
                        className={`${styles.row} ${styles.mobileExit}`}>
                        <div><FontAwesomeIcon icon={faArrowRightFromBracket} /></div>
                    </div>
                </div>
                    <Underline width={40} />
            </header>
            <div 
                style={{
                    height: "100%",
                    justifyContent: "space-between",
                }}
                className={`${styles.col} ${styles.menu} `}>
                <ul className={`${styles.col}`}>
                    <li className={`${styles.menuItem} ${styles.menuTitle}`}>
                        <p>Menu</p>
                    </li>
                    <li className={`${styles.col}`}>
                        <Link  
                            onClick={(e) => toggleMenu(!openState)}
                            className={`${styles.row}`}
                            style={{
                                borderLeft: router.pathname == "/" ? "4px solid white" : "4px solid transparent"
                            }}
                            href={'/'}>
                            <div className={`${styles.row} ${styles.menuItem} `}>
                                <i style={{
                                        color: router.pathname == "/" ? "white" : ""
                                    }}><FontAwesomeIcon icon={faGauge}/></i>
                                <span 
                                    style={{
                                        color: router.pathname == "/" ? "white" : ""
                                    }}>Home</span>
                            </div>
                        </Link>
                    </li>
                    <li className={`${styles.col}`}>
                        <Link  
                            onClick={(e) => toggleMenu(!openState)}
                            className={`${styles.row}`}
                            style={{
                                borderLeft: router.pathname == "/analytics/daily" ? "4px solid white" : "4px solid transparent",
                            }}
                            href={'/analytics/daily'}>
                            <div className={`${styles.row} ${styles.menuItem} `}>
                                <i 
                                    style={{
                                        color: router.pathname == "/analytics/daily" ? "white" : ""
                                    }}>
                                    <FontAwesomeIcon icon={faMagnifyingGlassChart} /></i>
                                <span 
                                    style={{
                                        color: router.pathname == "/analytics/daily" ? "white" : ""
                                    }}>Analytics</span>
                            </div>
                        </Link>
                        <ul className={`${styles.col}`}>
                            <li className={`${styles.col} ${styles.indentedMenuItem}`}>
                                <Link
                                    onClick={(e) => toggleMenu(!openState)}
                                    className={`${styles.row}`}
                                    href={'/analytics/funnels/all'}>
                                    <div className={`${styles.row} ${styles.menuItem} `}>
                                        <i
                                            style={{
                                                color: router.pathname.includes("/analytics/funnels") ? "white" : "",
                                                fontSize: "0.8rem",
                                                padding: "0.1rem 0",
                                            }}><FontAwesomeIcon icon={faGauge}/></i>
                                        <span 
                                            style={{
                                                color: router.pathname.includes("/analytics/funnels/all") ? "white" : ""
                                            }}>Funnel</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className={`${styles.row}`}>
                        <Link  
                            onClick={(e) => toggleMenu(!openState)}
                            className={`${styles.row}`}
                            style={{
                                borderLeft: router.pathname.includes("/discounts") ? "4px solid white" : "4px solid transparent"
                            }}
                            href={'/discounts/all'}>
                            <div className={`${styles.row} ${styles.menuItem} `}>
                                <i
                                    style={{
                                        color: router.pathname == "/discounts/all" ? "white" : ""
                                    }}><FontAwesomeIcon icon={faPercent} /></i>
                                <span
                                    style={{
                                        color: router.pathname == "/discounts/all" ? "white" : ""
                                    }}>Discounts</span>
                            </div>
                        </Link>
                    </li>
                    <li className={`${styles.col}`}>
                        <Link
                            onClick={(e) => toggleMenu(!openState)}
                            className={`${styles.row}`}
                            style={{
                                borderLeft: router.pathname == "/products/all" ? "4px solid white" : "4px solid transparent"
                            }}
                            href={'/products/all'}>
                            <div className={`${styles.row} ${styles.menuItem} `}>
                                <i
                                    style={{
                                        color: router.pathname == "/products/all" ? "white" : ""
                                    }}><FontAwesomeIcon icon={faBasketShopping} /></i>
                                <span
                                    style={{
                                        color: router.pathname == "/products/all" ? "white" : ""
                                    }}>Products</span>
                            </div>
                        </Link>
                        <ul className={`${styles.col}`}>
                            <li className={`${styles.col} ${styles.indentedMenuItem}`}>
                                <Link
                                    onClick={(e) => toggleMenu(!openState)}
                                    className={`${styles.row}`}
                                    href={'/products/subscriptions'}>
                                    <div className={`${styles.row} ${styles.menuItem} `}>
                                        <i
                                            style={{
                                                color: router.pathname.includes("/products/subscriptions") ? "white" : "",
                                                fontSize: "0.8rem",
                                                padding: "0.1rem 0",
                                            }}><FontAwesomeIcon icon={faGauge}/></i>
                                        <span 
                                            style={{
                                                color: router.pathname.includes("/products/subscriptions") ? "white" : "",
                                            }}>Subscriptions</span>
                                    </div>
                                </Link>
                            </li>
                            <li className={`${styles.col} ${styles.indentedMenuItem}`}>
                                <Link
                                    onClick={(e) => toggleMenu(!openState)}
                                    className={`${styles.row}`}
                                    href={'/products/bundles'}>
                                    <div className={`${styles.row} ${styles.menuItem} `}>
                                        <i
                                            style={{
                                                color: router.pathname.includes("/products/bundles") ? "white" : "",
                                                fontSize: "0.8rem",
                                                padding: "0.1rem 0",
                                            }}><FontAwesomeIcon icon={faGauge}/></i>
                                        <span 
                                            style={{
                                                color: router.pathname.includes("/products/bundles") ? "white" : "",
                                            }}>Bundles</span>
                                    </div>
                                </Link>
                            </li>
                            <li className={`${styles.col} ${styles.indentedMenuItem}`}>
                                <Link
                                    onClick={(e) => toggleMenu(!openState)}
                                    className={`${styles.row}`}
                                    href={'/products/collections'}>
                                    <div className={`${styles.row} ${styles.menuItem} `}>
                                        <i
                                            style={{
                                                color: router.pathname.includes("/products/collections") ? "white" : "",
                                                fontSize: "0.8rem",
                                                padding: "0.1rem 0",
                                            }}><FontAwesomeIcon icon={faGauge}/></i>
                                        <span 
                                            style={{
                                                color: router.pathname.includes("/products/collections") ? "white" : "",
                                            }}>Collections</span>
                                    </div>
                                </Link>
                            </li>
                            <li className={`${styles.col} ${styles.indentedMenuItem}`}>
                                <Link
                                    onClick={(e) => toggleMenu(!openState)}
                                    className={`${styles.row}`}
                                    href={'/products/gift_cards'}>
                                    <div className={`${styles.row} ${styles.menuItem} `}>
                                        <i
                                            style={{
                                                color: router.pathname.includes("/products/gift_cards") ? "white" : "",
                                                fontSize: "0.8rem",
                                                padding: "0.1rem 0",
                                            }}><FontAwesomeIcon icon={faGauge}/></i>
                                        <span 
                                            style={{
                                                color: router.pathname.includes("/products/bungift_cardsdles") ? "white" : "",
                                            }}>Gift Cards</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className={`${styles.col}`}>
                        <Link
                            onClick={(e) => toggleMenu(!openState)}
                            className={`${styles.row}`}
                            style={{
                                borderLeft: router.pathname.includes("/customers") ? "4px solid white" : "4px solid transparent"
                            }}
                            href={'/customers/all'}>
                            <div className={`${styles.row} ${styles.menuItem} `}>
                                <i
                                    style={{
                                        color: router.pathname.includes("/customers") ? "white" : ""
                                    }}><FontAwesomeIcon icon={faUsers} /></i>
                                <span
                                    style={{
                                        color: router.pathname.includes("/customers") ? "white" : ""
                                    }}>Customers</span>
                            </div>
                        </Link>
                    </li>
                    <li className={`${styles.col}`}>
                        <Link
                            onClick={(e) => toggleMenu(!openState)}
                            className={`${styles.row}`}
                            style={{
                                borderLeft: router.pathname.includes("/orders") ? "4px solid white" : "4px solid transparent"
                            }}
                            href={'/orders/all'}>
                            <div className={`${styles.row} ${styles.menuItem} `}>
                                <i
                                    style={{
                                        color: router.pathname.includes("/orders/all") ? "white" : ""
                                    }}><FontAwesomeIcon icon={faMoneyBillTransfer} /></i>
                                <span
                                    style={{
                                        color: router.pathname.includes("/orders/all") ? "white" : ""
                                    }}>Orders</span>
                            </div>
                        </Link>
                        <ul className={`${styles.col}`}>
                            <li className={`${styles.col} ${styles.indentedMenuItem}`}>
                                <Link
                                    onClick={(e) => toggleMenu(!openState)}
                                    className={`${styles.row}`}
                                    href={'/orders/carts'}>
                                    <div className={`${styles.row} ${styles.menuItem} `}>
                                        <i
                                            style={{
                                                color: router.pathname.includes("/orders/carts") ? "white" : "",
                                                fontSize: "0.8rem",
                                                padding: "0.1rem 0",
                                            }}><FontAwesomeIcon icon={faGauge}/></i>
                                        <span 
                                            style={{
                                                color: router.pathname.includes("/orders/carts") ? "white" : ""
                                            }}>Carts</span>
                                    </div>
                                </Link>
                            </li>
                            <li className={`${styles.col} ${styles.indentedMenuItem}`}>
                                <Link
                                    onClick={(e) => toggleMenu(!openState)}
                                    className={`${styles.row}`}
                                    href={'/orders/draft_orders'}>
                                    <div className={`${styles.row} ${styles.menuItem} `}>
                                        <i
                                            style={{
                                                color: router.pathname.includes("/orders/draft_orders") ? "white" : "",
                                                fontSize: "0.8rem",
                                                padding: "0.1rem 0",
                                            }}><FontAwesomeIcon icon={faGauge}/></i>
                                        <span 
                                            style={{
                                                color: router.pathname.includes("/orders/draft_orders") ? "white" : ""
                                            }}>Draft Orders</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className={`${styles.row}`}>
                        <Link
                            onClick={(e) => toggleMenu(!openState)}
                            className={`${styles.row}`}
                            style={{
                                borderLeft: router.pathname.includes("/fullfilment") ? "4px solid white" : "4px solid transparent"
                            }}
                            href={'/fullfilment/all'}>
                            <div className={`${styles.row} ${styles.menuItem} `}>
                                <i
                                    style={{
                                        color: router.pathname.includes("/fullfilment") ? "white" : ""
                                    }}><FontAwesomeIcon icon={faTruckFast} /></i>
                                <span
                                    style={{
                                        color: router.pathname.includes("/fullfilment") ? "white" : ""
                                    }}>Fulfilment</span>
                            </div>
                        </Link>
                    </li>
                </ul>
                <div className={`${styles.col} `}>
                    <Underline width={40} />
                    <ul style={{
                            width: "100%",
                            paddingLeft: 0
                        }}>
                        <li 
                            className={`${styles.menuSettingItem}`}
                            style={{
                                width: "100%",
                                padding: "1rem 2rem"
                            }}>
                            <p>Bigly Store</p>
                        </li>
                        <li className={`${styles.menuSettingItem}`}>
                            <Link
                                onClick={(e) => toggleMenu(!openState)}
                                className={`${styles.row}`}
                                href={'/settings'}>
                                <div className={`${styles.row} ${styles.menuItem} `}>
                                    <i
                                        style={{
                                            color: router.pathname.includes("/settings") ? "white" : "",
                                            fontSize: "0.8rem",
                                            padding: "0.1rem 0",
                                        }}><FontAwesomeIcon icon={faSliders}/></i>
                                    <span 
                                        style={{
                                            color: router.pathname == "/" ? "" : ""
                                        }}>Settings</span>
                                </div>
                            </Link>
                        </li>
                        <li 
                            onClick={(e) => logOut(e)}
                            className={`${styles.menuSettingItem}`}>
                            <div className={`${styles.row} ${styles.menuItem} `}>
                                <i
                                    style={{
                                        color: router.pathname.includes("/settings") ? "white" : "",
                                        fontSize: "0.8rem",
                                        padding: "0.1rem 0",
                                    }}><FontAwesomeIcon icon={faPersonThroughWindow}/></i>
                                <span 
                                    style={{
                                        color: router.pathname == "/" ? "" : ""
                                    }}>Logout</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Menu;