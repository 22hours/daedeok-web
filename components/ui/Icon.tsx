import style from "./Icon.module.scss";
import CloseIcon from "@material-ui/icons/Close";

type Props = {
    type: "delete";
    size?: number;
    className?: string;
};

const Icon = (props: Props) => {
    switch (props.type) {
        case "delete": {
            return (
                <div className={`${style.delete} ${props.className || ""}`}>
                    <CloseIcon fontSize={"inherit"} />
                </div>
            );
        }
        default:
            return <div></div>;
    }
};

export default Icon;
