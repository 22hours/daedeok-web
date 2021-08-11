import style from "./Icon.module.scss";
import CloseIcon from "@material-ui/icons/Close";

type Props = {
    type: "delete";
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
        default:
            return <div></div>;
    }
};

export default Icon;
