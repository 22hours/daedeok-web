import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import PcHeader from "./PcHeader";
import MobileHeader from "./MobileHeader";
import WindowController from "lib/client/windowController";

const Header = () => {
    const [mode, setMode] = useState<"pc" | "mobile">("pc");

    const setModeByWindowSize = () => {
        var width = WindowController.getWindowSize();
        if (width > 775) {
            setMode("pc");
        } else {
            setMode("mobile");
        }
    };
    useEffect(() => {
        setModeByWindowSize();
        window.addEventListener("resize", setModeByWindowSize);
        return () => {
            window.removeEventListener("resize", setModeByWindowSize);
        };
    }, []);
    return <div className={styles.container}>{mode === "pc" ? <PcHeader /> : <MobileHeader />}</div>;
};
export default Header;
