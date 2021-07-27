import style from "./SearchBar.module.scss";
import useFormStyle from "lib/hooks/useFormStyle";
import CSS from "csstype";
import { RefObject } from "react";

//icons
import SearchIcon from "@material-ui/icons/Search";

type Props = {
    ref?: RefObject<HTMLInputElement>;
    form: "box" | "underline";
    value: string;
    onChange: (e) => void;
    onEnterKeyDown?: (e) => void;
    placeholder?: string;
    maxLength?: number;
    style?: CSS.Properties;
};

const SearchBar = (props: Props) => {
    const classNames = useFormStyle({ ...props, type: "basic" });

    const onKeyDown = (e) => {
        if (props.onEnterKeyDown) {
            if (e.keyCode === 13) {
                props.onEnterKeyDown(e);
            }
        }
    };
    return (
        <div className={Object.values(classNames).concat(style.container).join(" ")}>
            <input
                ref={props.ref || undefined}
                type={"text"}
                value={props.value}
                onKeyDown={onKeyDown}
                onChange={props.onChange}
                maxLength={props.maxLength || undefined}
                placeholder={props.placeholder || undefined}
            />
            <SearchIcon />
        </div>
    );
};

export default SearchBar;
