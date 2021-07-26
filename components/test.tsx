import React, { useState, useEffect } from "react";
import CollapseButton from "./ui/buttons/CollapseButton";

const test = () => {
    const handleClick = () => {
        window.alert("click");
    };
    const childItem = ["첫번째", "두번째", "세번째"];
    return (
        <>
            <div>
                <CollapseButton
                    mainText={"Collapse"}
                    childItem={childItem}
                    toggle={false}
                    size={"medium"}
                    fontSize={"medium"}
                ></CollapseButton>
            </div>
        </>
    );
};

export default test;
