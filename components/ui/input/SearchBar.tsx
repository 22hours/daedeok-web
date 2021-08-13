import style from "./SearchBar.module.scss";
import useFormStyle from "lib/hooks/useFormStyle";
import CSS from "csstype";
import { RefObject, useEffect } from "react";

//icons
import SearchIcon from "@material-ui/icons/Search";
import useInput from "lib/hooks/useInput";

type Props = {
    form: "box" | "underline";
    refs?: RefObject<HTMLInputElement>;
    value?: string;
    onChange?: (e) => void;
    onEnterKeyDown?: (e) => void;
    placeholder?: string;
    maxLength?: number;
    className?: string;
    initialValue?: string;
};

const SearchBar = (props: Props) => {
    const localState = useInput();
    const classNames = useFormStyle({ ...props, type: "basic" });

    const onKeyDown = (e) => {
        if (props.onEnterKeyDown) {
            if (e.keyCode === 13) {
                props.onEnterKeyDown(e);
            }
        }
    };

    useEffect(() => {
        if (props.initialValue) {
            localState.setValue(props.initialValue);
        }
    }, [props]);

    return (
        <div className={Object.values(classNames).concat(props.className).concat(style.container).join(" ")}>
            <input
                ref={props.refs || undefined}
                type={"text"}
                value={props.value || localState.value}
                onKeyDown={onKeyDown}
                onChange={props.onChange || localState.onChange}
                maxLength={props.maxLength || undefined}
                placeholder={props.placeholder || undefined}
            />
            <div className={style.search_btn_wrapper}>
                <SearchIcon />
            </div>
        </div>
    );
};

export default SearchBar;
