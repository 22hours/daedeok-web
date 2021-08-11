import { RefObject } from "react";
import Typo from "@ui/Typo";
import style from "./CheckBox.module.scss";
type Props = {
    refs?: HTMLInputElement;
    labelContent: string;
    value?: boolean;
    onChange?: (e) => void;
    isLabelRight?: boolean;
    className?: string;
    disable?: boolean;
};

const CheckBox = (props: Props) => {
    return (
        <div className={`${style.container} ${props.className || ""}`}>
            {props.isLabelRight ? (
                <>
                    <input
                        // @ts-ignore
                        ref={props.refs || undefined}
                        type="checkbox"
                        checked={props.value}
                        onChange={props.onChange}
                        disabled={props.disable}
                    />

                    <div className={style.padding_bar}></div>
                    <Typo type={"TEXT"} size={"small"} color={"gray_accent"} content={props.labelContent} />
                </>
            ) : (
                <>
                    <Typo type={"TEXT"} size={"small"} color={"gray_accent"} content={props.labelContent} />
                    <div className={style.padding_bar}></div>
                    <input
                        // @ts-ignore
                        ref={props.refs || undefined}
                        type="checkbox"
                        checked={props.value}
                        onChange={props.onChange}
                        disabled={props.disable}
                    />
                </>
            )}
        </div>
    );
};

export default CheckBox;
