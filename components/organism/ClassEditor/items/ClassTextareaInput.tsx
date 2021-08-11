import React from "react";
import ClassRow from "components/organism/ClassEditor/items/ClassRow";
import TextArea from "@ui/input/TextArea";
import { useRouter } from "next/router";
type titleProps = {
    labelName: string;
    placeholder: string;
    maxLength?: number;
    value: string;
    onChange: (e) => void;
};
const ClassTextareaInput = (props: titleProps) => {
    const router = useRouter();
    const { status } = router.query;

    return (
        <ClassRow labelName={props.labelName}>
            <TextArea
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                maxLength={props.maxLength}
                disable={status === "close"}
            />
        </ClassRow>
    );
};

export default React.memo(ClassTextareaInput);
