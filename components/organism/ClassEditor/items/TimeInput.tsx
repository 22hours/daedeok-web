import React from "react";
import TextInput from "@ui/input/TextInput";
import ClassRow from "components/organism/ClassEditor/items/ClassRow";
import { useRouter } from "next/router";

type titleProps = {
    labelName: string;
    value: string;
    onChange: (e) => void;
};

const TimeInput = (props: titleProps) => {
    const router = useRouter();
    const { status } = router.query;
    return (
        <ClassRow labelName={props.labelName}>
            <TextInput
                // @ts-ignore
                type="time"
                form="box"
                placeholder="hh:mm"
                // @ts-ignore
                value={props.value}
                onChange={props.onChange}
                disable={status === "close"}
            />
        </ClassRow>
    );
};
export default TimeInput;
