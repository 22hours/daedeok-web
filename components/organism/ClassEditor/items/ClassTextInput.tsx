import React from "react";
import TextInput from "@ui/input/TextInput";
import ClassRow from "components/organism/ClassEditor/items/ClassRow";
type titleProps = {
    labelName: string;
    type: "number" | "time" | "text" | "password" | "date";
    placeholder: string;
    maxLength?: number;
    value: string;
    onChange: (e) => void;
};
const ClassTextInput = (props: titleProps) => {
    return (
        <ClassRow labelName={props.labelName}>
            <TextInput
                type={"text"}
                form={"box"}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                maxLength={props.maxLength}
            />
        </ClassRow>
    );
};

export default React.memo(ClassTextInput);
