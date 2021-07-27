import { RefObject } from "react";
import style from "./TextArea.module.scss";
import CSS from "csstype";
import useFormStyle from "lib/hooks/useFormStyle";

type Props = {
    ref?: RefObject<HTMLTextAreaElement>;
    value: string | number;
    onChange: (e) => void;
    placeholder?: string;
    maxLength?: number;
    disable?: boolean;
    error?: boolean;
    success?: boolean;
    style?: CSS.Properties;
};

const TextArea = (props: Props) => {
    const classNames = useFormStyle({ ...props, type: "textarea" });

    return (
        <div className={Object.values(classNames).join(" ")}>
            <textarea
                className={style.container}
                ref={props.ref || undefined}
                style={props.style || undefined}
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
