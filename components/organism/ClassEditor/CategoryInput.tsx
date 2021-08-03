import React from "react";
import ClassSelectInput from "./items/ClassSelectInput";
type titleProps = {
    labelName: string;
    placeholder: string;
    maxLength?: number;
    value: string;
    option_list: { value: string; name: string }[];
    onChange: (e) => void;
};
const ClassTextInput = (props: titleProps) => {
    return (
        <div>
            <ClassSelectInput
                labelName={props.labelName}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                option_list={props.option_list}
            />
        </div>
    );
};

export default React.memo(ClassTextInput);
