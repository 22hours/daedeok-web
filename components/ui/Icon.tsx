import style from "./Icon.module.scss";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
type Props = {
    type: "delete" | "plus" | "brownplus";
    size?: number;
    className?: string;
    onClick?: () => void;
};

const Icon = (props: Props) => {
    const nothing = () => {};
    switch (props.type) {
        case "delete": {
            return (
                <div onClick={props.onClick || nothing} className={`${style.delete} ${props.className || ""}`}>
                    <CloseIcon fontSize={"inherit"} />
                </div>
            );
        }
        case "plus": {
            return (
                <div onClick={props.onClick || nothing} className={`${style.plus} ${props.className || ""}`}>
                    <AddIcon fontSize={"inherit"} />
                </div>
            );
        }
        case "brownplus": {
            return (
                <div onClick={props.onClick || nothing} className={`${style.brownplus} ${props.className || ""}`}>
                    <AddIcon fontSize={"inherit"} />
                </div>
            );
        }
        default:
            return <div></div>;
    }
};

export default Icon;
