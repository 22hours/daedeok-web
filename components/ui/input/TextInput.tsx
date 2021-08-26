import useFormStyle from "lib/hooks/useFormStyle";
import { useRef, useState } from "react";

type Props = {
    refs?: HTMLInputElement | null;
    type: "text" | "password" | "number" | "time" | "date";
    form: "box" | "underline";
    value?: string | number;
    onChange?: (e) => void;
    placeholder?: string;
    maxLength?: number;
    disable?: boolean;
    error?: boolean;
    success?: boolean;
    className?: string;
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
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const classNames = useFormStyle({ ...props, type: "basic" });
    return (
        <div className={Object.values(classNames).concat(props.className).join(" ")}>
            {/* {["date", "time"].includes(props.type) ? (
                <input
                    //@ts-ignore
                    ref={props.refs}
                    type={!isFocus ? "text" : getInputType(props.type)}
                    value={props.value}
                    onChange={props.onChange}
                    maxLength={props.maxLength || undefined}
                    placeholder={props.placeholder || undefined}
                    disabled={props.disable}
                    onFocus={() => setIsFocus(true)}
                />
            ) : (
                <input
                    //@ts-ignore
                    ref={props.refs}
                    type={getInputType(props.type)}
                    value={props.value}
                    onChange={props.onChange}
                    maxLength={props.maxLength || undefined}
                    placeholder={props.placeholder || undefined}
                    disabled={props.disable}
                />
            )} */}

            <input
                //@ts-ignore
                ref={props.refs}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                maxLength={props.maxLength || undefined}
                placeholder={props.placeholder || undefined}
                disabled={props.disable}
                min={0}
            />
        </div>
    );
};

export default TextInput;
