import { RefObject } from "react";
import style from "./TextInput.module.scss";
import CSS from "csstype";
import useFormStyle from "lib/hooks/useFormStyle";

type Props = {
    ref?: RefObject<HTMLInputElement>;
    type: "text" | "password" | "number" | "time" | "date";
    form: "box" | "underline";
    value: string | number;
    onChange: (e) => void;
    placeholder?: string;
    maxLength?: number;
    disable?: boolean;
    error?: boolean;
    success?: boolean;
    style?: CSS.Properties;
};

const getInputType = (type: Props["type"]) => {
    switch (type) {
        case "text":
            return "text";
        case "number":
            return "number";
        case "password":
            return "password";
        case "time":
            return "time";
        case "date":
            return "date";
        default:
            return "text";
    }
};

const TextInput = (props: Props) => {
    const classNames = useFormStyle({ ...props, type: "basic" });
    return (
        <div className={Object.values(classNames).join(" ")}>
            <input
                ref={props.ref || undefined}
                style={props.style || undefined}
                type={getInputType(props.type)}
                value={props.value}
                onChange={props.onChange}
                maxLength={props.maxLength || undefined}
                placeholder={props.placeholder || undefined}
                disabled={props.disable}
            />
        </div>
    );
};

export default TextInput;
