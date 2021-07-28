import React, { useState } from "react";
import Typo from "../Typo";
import Link from "next/link";
import styles from "./DropdownButton.module.scss";

import useBoolean from "lib/hooks/useBoolean";

type Props = {
    children?: JSX.Element | JSX.Element[];
    mainText: string;
    childButtonItem: Array<{ text: string; url: string }>;
    mainButtonSize: "small" | "medium" | "large" | "full";
    mainFontSize: "huge" | "large" | "medium" | "small" | "smaller";
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
    childFontSize: "huge" | "large" | "medium" | "small" | "smaller";

    childTextColor:
        | "brown_base"
        | "brown_font"
        | "mint_accent"
        | "yellow_accent"
        | "red_accent"
        | "gray_accent"
        | "light_accent"
        | "white";
};

const ChildButton = (props: {
    url: string;
    text: string;
    childButtonSize: Props["childButtonSize"];
    childFontSize: Props["childFontSize"];
    childTextColor: Props["childTextColor"];
}) => {
    const isOn = useBoolean();
    const toggle = () => isOn.onChange(!isOn.value);
    const onOffStyle = isOn.value ? styles.child_square_on : styles.child_square_off;
    return (
        <Link href={props.url}>
            <div
                className={`${onOffStyle} ${styles.child_square} ${styles[props.childButtonSize]} `}
                onMouseEnter={toggle}
                onMouseLeave={toggle}
            >
                <Typo
                    type={"BUTTON"}
                    size={props.childFontSize}
                    color={props.childTextColor}
                    content={props.text}
                ></Typo>
            </div>
        </Link>
    );
};

const DropdownButton = (props: Props) => {
    const { children, mainText, childButtonItem, mainButtonSize, mainFontSize, mainBackgroundColor, mainTextColor } =
        props;

    const [isOpen, setIsOpen] = useState(false);

    const mainMouseOver = () => {
        setIsOpen(true);
    };
    const mainMoueOut = () => {
        setIsOpen(false);
    };

    return (
        <div onMouseEnter={mainMouseOver} onMouseLeave={mainMoueOut} className={styles.container}>
            <div className={`${styles.square} ${styles[mainButtonSize]} ${styles[mainBackgroundColor]}`}>
                <Typo type={"BUTTON"} size={mainFontSize} color={mainTextColor} content={mainText} />
                {children}
            </div>
            <>
                {isOpen && (
                    <>
                        {childButtonItem.map((it, idx) => (
                            <ChildButton key={`ChildItem::${idx}`} url={it.url} text={it.text} {...props} />
                        ))}
                    </>
                )}
            </>
        </div>
    );
};
export default DropdownButton;
