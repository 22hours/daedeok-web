import React, { useEffect, useState } from "react";
import style from "./ClassSidebar.module.scss";

import MobileSideBar from "./MobileSideBar";
import PcSideBar from "./PcSideBar";

const ClassSidebar = () => {
    const [mode, setMode] = useState<"pc" | "mobile">("pc");

    const setModeByWindowSize = () => {
        if (window.innerWidth > 450) {
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

    return <>{mode === "pc" ? <PcSideBar /> : <MobileSideBar />}</>;
};
export default ClassSidebar;
