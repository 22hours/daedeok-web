import { RefObject } from "react";
import style from "./TextArea.module.scss";
import CSS from "csstype";
import useFormStyle from "lib/hooks/useFormStyle";

type Props = {
    refs?: HTMLTextAreaElement;
    value?: string | number;
    onChange?: (e) => void;
    placeholder?: string;
    maxLength?: number;
    disable?: boolean;
    error?: boolean;
    success?: boolean;
    className?: string;
};

const TextArea = (props: Props) => {
    const classNames = useFormStyle({ ...props, type: "textarea" });

    return (
        <div className={Object.values(classNames).concat(props.className).join(" ")}>
            <textarea
                className={`${style.container}`}
                // @ts-ignore
                ref={props.refs || undefined}
                value={props.value}
                onChange={props.onChange}
                maxLength={props.maxLength || undefined}
                placeholder={props.placeholder || undefined}
                disabled={props.disable}
            />
        </div>
    );
};

export default TextArea;
