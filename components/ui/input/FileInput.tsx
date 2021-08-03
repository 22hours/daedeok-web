import React, { useRef } from "react";
import style from "./FileInput.module.scss";
import CSS from "csstype";

type Props = {
    value?: string;
    accept: "image/*" | ".hwp,.word,.docx,.pptx,.show" | "image/*,.hwp,.word,.docx,.pptx,.show";
    onChange: (e) => void;
    children: JSX.Element;
    className?: string;
};

const FileInput = (props: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const ImgButton = () =>
        React.cloneElement(props.children, {
            onClick: () => {
                if (inputRef?.current) {
                    inputRef?.current.click();
                }
            },
        });
    return (
        <div className={`${props.className || ""}`}>
            <ImgButton />
            <input
                className={`${style.input}`}
                //@ts-ignore
                ref={inputRef}
                type={"file"}
                accept={props.accept}
                onChange={props.onChange}
            />
        </div>
    );
};

export default FileInput;
