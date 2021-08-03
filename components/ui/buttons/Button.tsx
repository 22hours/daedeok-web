import styles from "./Button.module.scss";
import Typo from "../Typo";

type Props = {
    children?: JSX.Element | JSX.Element[];
    type: "SQUARE" | "ROUND" | "UNDERLINE" | "TEXT";
    size: "free" | "smaller" | "small" | "medium" | "large" | "full";
    fontSize: "huge" | "large" | "medium" | "small" | "smaller";
    content: string;
    line?: "inline" | "outline";
    backgroundColor?:
        | "brown_base"
        | "brown_font"
        | "mint_accent"
        | "yellow_accent"
        | "red_accent"
        | "gray_accent"
        | "light_accent"
        | "transparent"
        | "white";
    color?:
        | "brown_base"
        | "brown_font"
        | "mint_accent"
        | "yellow_accent"
        | "red_accent"
        | "gray_accent"
        | "light_accent"
        | "white";
    alignment?: "center" | "left" | "right" | "between";
    onClick?: any;
    className?: string;
};

const Button = (props: Props) => {
    const { children, type, size, line, backgroundColor, fontSize, content, color, alignment, onClick } = props;
    const bgStyle = props.backgroundColor || "transparent";
    const alignStyle = props.alignment || "center";
    const colorStyle = props.color || "brown_base";
    const lineStyle = props.line || "inline";
    switch (type) {
        case "SQUARE":
            var btnType = "square";
            return (
                <div
                    className={`${props.className || ""} ${styles[btnType]} ${styles[size]}  ${styles[lineStyle]} ${
                        styles[bgStyle]
                    } ${styles[alignStyle]}`}
                    onClick={onClick}
                >
                    <Typo type={"BUTTON"} size={fontSize} color={colorStyle} content={content} />
                    {children}
                </div>
            );
        case "ROUND":
            var btnType = "round";
            return (
                <div
                    className={`${props.className || ""}  ${styles[btnType]}  ${styles[size]} ${styles[lineStyle]} ${
                        styles[bgStyle]
                    } ${styles[alignStyle]}`}
                    onClick={onClick}
                >
                    <Typo type={"BUTTON"} size={fontSize} color={colorStyle} content={content} />
                    {children}
                </div>
            );
        case "UNDERLINE":
            var btnType = "underline";
            return (
                <div
                    className={`${props.className || ""}  ${styles[btnType]}  ${styles[size]} ${styles[lineStyle]} ${
                        styles[bgStyle]
                    } ${styles[alignStyle]}`}
                    onClick={onClick}
                >
                    <Typo type={"BUTTON"} size={fontSize} color={colorStyle} content={content} />
                    {children}
                </div>
            );
        case "TEXT":
            var btnType = "text";
            return (
                <div
                    className={`${props.className || ""}  ${styles[btnType]}  ${styles[size]} ${styles[lineStyle]} ${
                        styles[bgStyle]
                    } ${styles[alignStyle]}`}
                    onClick={onClick}
                >
                    <Typo type={"BUTTON"} size={fontSize} color={colorStyle} content={content} />
                    {children}
                </div>
            );
        default:
            return <div></div>;
    }
};
export default Button;
