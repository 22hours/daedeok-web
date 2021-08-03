import React from "react";
import style from "./../ClassEditor.module.scss";
import Typo from "@ui/Typo";
type rowProps = {
    labelName: string;
    children?: JSX.Element;
};
const InputComponent = ({ children, className }) =>
    React.cloneElement(children, {
        className: className,
    });
const ClassRow = (props: rowProps) => {
    return (
        <div className={style.RowContainer}>
            <div className={style.label_container}>
                <Typo type={"TEXT"} size={"small"} content={props.labelName} />
            </div>
            {props.children && <InputComponent className={style.inputBox}>{props.children}</InputComponent>}
        </div>
    );
};
export default ClassRow;
