import styles from "./Typo.module.scss";

type CommonProps = {
    content: string;
    color?:
        | "brown_base"
        | "brown_font"
        | "mint_accent"
        | "yellow_accent"
        | "red_accent"
        | "gray_accent"
        | "light_accent"
        | "white";
    className?: string;
};

type ButtonProps = {
    type: "BUTTON";
    size: "huge" | "large" | "medium" | "normal" | "small" | "smaller";
};

type HeaderProps = {
    type: "HEADER";
    size: "h1" | "h2" | "h3" | "h4";
};

type TextProps = {
    type: "TEXT";
    size: "huge" | "large" | "medium" | "normal" | "small" | "smaller";
};

type Props = (CommonProps & ButtonProps) | (CommonProps & HeaderProps) | (CommonProps & TextProps);

const Typo = ({ type, size, content, color, className }: Props) => {
    const styleColor = color || "brown_base";
    switch (type) {
        case "BUTTON":
            const buttonStyle = `${className || ""} ${styles[size]} ${styles[styleColor]}`;
            return <span className={buttonStyle}>{content}</span>;
        case "HEADER":
            var headerSize = size + "_header";
            const headerStyle = `${className || ""} ${styles[headerSize]} ${styles[styleColor]}`;
            switch (size) {
                case "h1":
                    return <h1 className={headerStyle}>{content}</h1>;
                case "h2":
                    return <h2 className={headerStyle}>{content}</h2>;
                case "h3":
                    return <h3 className={headerStyle}>{content}</h3>;
                case "h4":
                    return <h4 className={headerStyle}>{content}</h4>;
                default:
                    return <h5>{content}</h5>;
            }
        case "TEXT":
            var textSize = size + "_text";
            const textStyle = `${className || ""} ${styles[textSize]} ${styles[styleColor]}`;
            return <span className={textStyle}>{content}</span>;
        default:
            return <span></span>;
    }
};

export default Typo;
