import React, { useMemo, useRef } from "react";
import style from "./Select.module.scss";
import CSS from "csstype";
import useFormStyle from "lib/hooks/useFormStyle";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// icons
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
type Props = {
    refs?: HTMLSelectElement | null;
    form: "box" | "underline";
    value?: string | number;
    option_list: { value: string; name: string }[];
    onChange?: (e) => void;
    placeholder?: string;
    disable?: boolean;
    error?: boolean;
    success?: boolean;
    className?: string;
};

const useStyles = makeStyles((theme) => ({
    select: {
        width: "100%",
    },
}));

const Select = (props: Props) => {
    const classNames = useFormStyle({ ...props, type: "select" });
    const classes = useStyles();

    return (
        <div className={Object.values(classNames).concat(props.className).concat(style.wrapper).join(" ")}>
            <NativeSelect
                className={`${props.value === "" ? style.nowOff : ""} ${style.container}`}
                // @ts-ignore
                refs={props.refs || undefined}
                onChange={props.onChange}
                value={props.value}
                disabled={props.disable}
                variant={"filled"}
            >
                {props.placeholder && (
                    <option aria-label="None" value="" disabled selected>
                        {props.placeholder}
                    </option>
                )}

                {props.option_list.map((it, idx) => (
                    <option key={`option-${it.value}-${idx}`} value={it.value}>
                        {it.name}
                    </option>
                ))}
            </NativeSelect>
        </div>
    );
};

export default Select;
