import styles from "./Button.module.scss";
import Typo from "../Typo";

type Props = {
    children?: JSX.Element | JSX.Element[];
    type: "SQUARE" | "ROUND" | "TEXT";
    size: "small" | "medium" | "large" | "full";
    fontSize: "huge" | "large" | "medium" | "small" | "smaller";
    line: "inline" | "outline";
    backgroundColor:
        | "brown_base"
        | "brown_font"
        | "mint_accent"
        | "yellow_accent"
        | "red_accent"
        | "gray_accent"
        | "light_accent"
        | "transparent"
        | "white";
    color:
        | "brown_base"
        | "brown_font"
        | "mint_accent"
        | "yellow_accent"
        | "red_accent"
        | "gray_accent"
        | "light_accent"
        | "white";
    content: string;
    alignment: "center" | "left" | "right" | "between";
    onClick?: any;
    className?: string;
};

const Button = (props: Props) => {
    const { children, type, size, line, backgroundColor, fontSize, content, color, alignment, onClick } = props;
    switch (type) {
        case "SQUARE":
            var btnType = "square";
            return (
                <div
                    className={`${props.className || ""} ${styles[btnType]} ${styles[size]}  ${styles[line]} ${
                        styles[backgroundColor]
                    } ${styles[alignment]}`}
                    onClick={onClick}
                >
                    <Typo type={"BUTTON"} size={fontSize} color={color} content={content} />
                    {children}
                </div>
            );
        case "ROUND":
            var btnType = "round";
            return (
                <div
                    className={`${props.className || ""}  ${styles[btnType]}  ${styles[size]} ${styles[line]} ${
                        styles[backgroundColor]
                    } ${styles[alignment]}`}
                    onClick={onClick}
                >
                    <Typo type={"BUTTON"} size={fontSize} color={color} content={content} />
                    {children}
                </div>
            );
        case "TEXT":
            var btnType = "text";
            return (
                <div
                    className={`${props.className || ""}  ${styles[btnType]}  ${styles[size]} ${styles[line]} ${
                        styles[backgroundColor]
                    } ${styles[alignment]}`}
                    onClick={onClick}
                >
                    <Typo type={"BUTTON"} size={fontSize} color={color} content={content} />
                    {children}
                </div>
            );
        default:
            return <div></div>;
    }
};
export default Button;
