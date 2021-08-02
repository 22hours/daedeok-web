import React, { useState } from "react";
import styles from "./CollapseButton.module.scss";
import Button from "./Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Collapse from "@material-ui/core/Collapse";

type Props = {
    mainText: string;
    mainButtonSize: "small" | "medium" | "large" | "full";
    mainFontSize: "huge" | "large" | "medium" | "small";
    mainBackgroundColor:
        | "brown_base"
        | "brown_font"
        | "mint_accent"
        | "yellow_accent"
        | "red_accent"
        | "gray_accent"
        | "light_accent"
        | "transparent"
        | "white";
    mainTextColor:
        | "brown_base"
        | "brown_font"
        | "mint_accent"
        | "yellow_accent"
        | "red_accent"
        | "gray_accent"
        | "light_accent"
        | "white";

    icon: boolean;
    children: JSX.Element;
    buttonClassName?: string;
    childClassName?: string;
};

const CollapseButton = (props: Props) => {
    const {
        mainText,
        mainButtonSize,
        mainFontSize,
        mainBackgroundColor,
        mainTextColor,
        children,
        icon,
        buttonClassName,
        childClassName,
    } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Button
                type={"UNDERLINE"}
                size={mainButtonSize}
                fontSize={mainFontSize}
                line={"inline"}
                backgroundColor={mainBackgroundColor}
                color={mainTextColor}
                content={mainText}
                onClick={handleToggle}
                alignment={"between"}
                className={buttonClassName || ""}
            >
                {icon ? (
                    <>
                        {isOpen ? (
                            <ArrowDropDownIcon style={{ marginRight: "15px" }} />
                        ) : (
                            <ArrowRightIcon style={{ marginRight: "15px" }} />
                        )}
                    </>
                ) : (
                    <></>
                )}
            </Button>
            <Collapse className={childClassName || ""} in={isOpen} timeout="auto" unmountOnExit>
                <>{children}</>
            </Collapse>
        </>
    );
};
export default CollapseButton;
