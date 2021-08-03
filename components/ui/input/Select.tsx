import React, { useMemo, useRef } from "react";
import style from "./Select.module.scss";
import CSS from "csstype";
import useFormStyle from "lib/hooks/useFormStyle";

// icons
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
type Props = {
    refs?: HTMLInputElement | null;
    form: "box" | "underline";
    value?: string | number;
    option_list: { value: string; name: string }[];
    onChange: (e) => void;
    placeholder?: string;
    disable?: boolean;
    error?: boolean;
    success?: boolean;
    className?: string;
};

const Select = (props: Props) => {
    const localRef = useRef<HTMLSelectElement | null>(null);
    const classNames = useFormStyle({ ...props, type: "select" });
    return (
        <div
            onClick={(e) => {
                if (localRef.current) {
                    const event = new MouseEvent("mousedown");
                    localRef.current.dispatchEvent(event);
                }
            }}
            className={Object.values(classNames).concat(props.className).concat(style.wrapper).join(" ")}
        >
            <select
                className={style.container}
                // @ts-ignore
                refs={localRef || undefined}
                onChange={props.onChange}
                value={props.value}
                disabled={props.disable}
            >
                {props.placeholder && (
                    <option value="" disabled selected>
                        {props.placeholder}
                    </option>
                )}

                {props.option_list.map((it, idx) => (
                    <option key={`option-${it.value}-${idx}`} value={it.value}>
                        {it.name}
                    </option>
                ))}
            </select>

            {props.form === "box" ? (
                <div className={style.arrow_wrapper}>
                    <ArrowDropDownIcon />{" "}
                </div>
            ) : (
                <ArrowDropDownIcon />
            )}
        </div>
    );
};

export default Select;
