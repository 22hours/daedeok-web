import { RefObject } from "react";
import Typo from "@ui/Typo";
import style from "./CheckBox.module.scss";
type Props = {
    ref?: RefObject<HTMLInputElement>;
    labelContent: string;
    value: boolean;
    onChange: (e) => void;
    isLabelRight?: boolean;
    className?: string;
};

const CheckBox = (props: Props) => {
    return (
        <div className={`${style.container} ${props.className || ""}`}>
            {props.isLabelRight ? (
                <>
                    <input
                        ref={props.ref || undefined}
                        type="checkbox"
                        checked={props.value}
                        onChange={props.onChange}
                    />
                    <div className={style.padding_bar}></div>
                    <Typo type={"TEXT"} size={"small"} color={"gray_accent"} content={props.labelContent} />
                </>
            ) : (
                <>
                    <Typo type={"TEXT"} size={"small"} color={"gray_accent"} content={props.labelContent} />
                    <div className={style.padding_bar}></div>
                    <input type="checkbox" checked={props.value} onChange={props.onChange} />
                </>
            )}
        </div>
    );
};

export default CheckBox;
