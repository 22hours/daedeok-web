import React, { useState, useEffect } from "react";
const useAgent = () => {
    const [agent, setAgnet] = useState<"desktop" | "mobile">("desktop");
    useEffect(() => {
        //450px
        const width = window.screen.width;
        if (width <= 450) {
            setAgnet("mobile");
        }
    }, []);
    useEffect(() => {
        console.log(agent);
    }, [agent]);
    return agent;
};
export default useAgent;
