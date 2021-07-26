import styles from "./Typo.module.scss";

type Props = {
    type: "BUTTON" | "HEADER" | "TEXT";
    size: "huge" | "large" | "medium" | "small" | "h1" | "h2" | "h3";
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
};

const Typo = ({ type, size, content, color }: Props) => {
    switch (type) {
        case "BUTTON":
            return <span className={`${styles[size]} ${styles[color]}`}>{content}</span>;
        case "HEADER":
            var headerSize = size + "_header";
            return <p className={`${styles[headerSize]} ${styles[color]}`}>{content}</p>;
        case "TEXT":
            var textSize = size + "_text";
            return <p className={`${styles[textSize]} ${styles[color]}`}>{content}</p>;
        default:
            return <span></span>;
    }
};

export default Typo;
