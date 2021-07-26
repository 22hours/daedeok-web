import React, { useState } from "react";
import styles from "./CollapseButton.module.scss";
import Button from "./Button";
import Typo from "../Typo";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { style } from "@material-ui/system";

type Props = {
    mainText: string;
    childItem: Array<string>;
    toggle: boolean;
    size: "small" | "medium" | "large" | "full";
    fontSize: "huge" | "large" | "medium" | "small";
};

const CollapseButton = ({ mainText, childItem, toggle, size, fontSize }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(toggle);
    const handleToggle = () => setIsOpen(!isOpen);
    console.log(isOpen);
    console.log(childItem);
    return (
        <>
            <Button
                type={"TEXT"}
                size={size}
                fontSize={fontSize}
                line={"inline"}
                backgroundColor={"light_accent"}
                color={"brown_font"}
                content={mainText}
                onClickEvent={handleToggle}
                alignment={"between"}
            >
                {isOpen ? (
                    <ArrowDropDownIcon style={{ marginRight: "15px" }} />
                ) : (
                    <ArrowRightIcon style={{ marginRight: "15px" }} />
                )}
            </Button>
            <div className={`${styles[isOpen.toString()]}`}>
                {childItem.map((it, idx) => (
                    <div key={`list::${idx}`} style={{ marginTop: "30px" }}>
                        <Button
                            type={"SQUARE"}
                            content={it}
                            size={"small"}
                            fontSize={"medium"}
                            color={"brown_font"}
                            backgroundColor={"white"}
                            line={"inline"}
                            onClickEvent={() => window.alert("toggle")}
                            alignment={"left"}
                        ></Button>
                    </div>
                ))}
            </div>
            <div>dsfd</div>
        </>
    );
};
export default CollapseButton;
