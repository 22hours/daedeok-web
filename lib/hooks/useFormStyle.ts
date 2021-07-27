import { useState } from "react";
type Props = {
    type: "basic" | "select" | "textarea";
    form?: "box" | "underline";
    disable?: boolean;
    error?: boolean;
    success?: boolean;
};
const useFormStyle = (props: Props) => {
    switch (props.type) {
        case "textarea": {
            return {
                LayoutClassName: "form__box",
                successClassName: props.success && "form__success",
                errorClassName: props.error && "form__error",
                disableClassName: props.disable && "form__disable",
            };
        }
        default: {
            return {
                LayoutClassName: props.form === "box" ? "form__box" : "form__underline",
                successClassName: props.success && "form__success",
                errorClassName: props.error && "form__error",
                disableClassName: props.disable && "form__disable",
            };
        }
    }
};
export default useFormStyle;
