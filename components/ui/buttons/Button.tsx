import styles from "./Button.module.scss";
import Typo from "../Typo";

type Props = {
    children: JSX.Element | JSX.Element[] | undefined;
    type: "SQUARE" | "ROUND" | "TEXT";
    size: "small" | "medium" | "large" | "full";
    fontSize: "huge" | "large" | "medium" | "small";
    line: "inline" | "outline";
    backgroundColor:
        | "brown_base"
        | "brown_font"
        | "mint_accent"
        | "yellow_accent"
        | "red_accent"
        | "gray_accent"
        | "light_accent"
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
    onClickEvent: () => void | "";
};

const Button = ({
    children,
    type,
    size,
    line,
    backgroundColor,
    fontSize,
    content,
    color,
    alignment,
    onClickEvent,
}: Props) => {
    switch (type) {
        case "SQUARE":
            var btnType = "square";
            return (
                <div
                    className={`${styles[btnType]} ${styles[size]} ${styles[line]} ${styles[backgroundColor]} ${styles[alignment]}`}
                    onClick={onClickEvent}
                >
                    <Typo type={"BUTTON"} size={fontSize} color={color} content={content} />
                    {children}
                </div>
            );
        case "ROUND":
            var btnType = "round";
            return (
                <div
                    className={`${styles[btnType]} ${styles[size]} ${styles[line]} ${styles[backgroundColor]} ${styles[alignment]}`}
                    onClick={onClickEvent}
                >
                    <Typo type={"BUTTON"} size={fontSize} color={color} content={content} />
                    {children}
                </div>
            );
        case "TEXT":
            var btnType = "text";
            return (
                <div
                    className={`${styles[btnType]} ${styles[size]} ${styles[line]} ${styles[backgroundColor]} ${styles[alignment]}`}
                    onClick={onClickEvent}
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
