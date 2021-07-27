import React, { useState } from "react";
import styles from "./CollapseButton.module.scss";
import Button from "./Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Collapse from "@material-ui/core/Collapse";

type Props = {
    mainText: string;
    childButtonItem: Array<string>;
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
    childButtonSize: "small" | "medium" | "large" | "full";
    childFontSize: "huge" | "large" | "medium" | "small";
    childBackgroundColor:
        | "brown_base"
        | "brown_font"
        | "mint_accent"
        | "yellow_accent"
        | "red_accent"
        | "gray_accent"
        | "light_accent"
        | "white";
    childTextColor:
        | "brown_base"
        | "brown_font"
        | "mint_accent"
        | "yellow_accent"
        | "red_accent"
        | "gray_accent"
        | "light_accent"
        | "white";
    icon: boolean;
    childButtonMargin: boolean;
    onClick: () => void;
};

const CollapseButton = ({
    mainText,
    childButtonItem,
    mainButtonSize,
    mainFontSize,
    mainBackgroundColor,
    mainTextColor,
    childButtonSize,
    childFontSize,
    childBackgroundColor,
    childTextColor,
    icon,
    childButtonMargin,
    onClick,
}: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Button
                type={"TEXT"}
                size={mainButtonSize}
                fontSize={mainFontSize}
                line={"inline"}
                backgroundColor={mainBackgroundColor}
                color={mainTextColor}
                content={mainText}
                onClick={handleToggle}
                alignment={"between"}
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
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <>
                    {childButtonItem.map((it, idx) =>
                        childButtonMargin ? (
                            <div key={`CATEGORY_ITEM::${idx}`} style={{ marginTop: "15px" }}>
                                <Button
                                    type={"SQUARE"}
                                    size={childButtonSize}
                                    line={"inline"}
                                    backgroundColor={childBackgroundColor}
                                    fontSize={childFontSize}
                                    content={it}
                                    color={childTextColor}
                                    alignment={"left"}
                                    onClick={onClick}
                                ></Button>
                            </div>
                        ) : (
                            <div key={`CATEGORY_ITEM::${idx}`}>
                                <Button
                                    type={"SQUARE"}
                                    size={childButtonSize}
                                    line={"inline"}
                                    backgroundColor={childBackgroundColor}
                                    fontSize={childFontSize}
                                    content={it}
                                    color={childTextColor}
                                    alignment={"left"}
                                    onClick={onClick}
                                ></Button>
                            </div>
                        )
                    )}
                </>
            </Collapse>
        </>
    );
};
export default CollapseButton;
