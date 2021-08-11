import React from "react";
import ClassRow from "components/organism/ClassEditor/items/ClassRow";
import Select from "@ui/input/Select";
import { useRouter } from "next/router";
type titleProps = {
    labelName: string;
    placeholder: string;
    maxLength?: number;
    value: string;
    option_list: { value: string; name: string }[];
    onChange: (e) => void;
};
const ClassSelectInput = (props: titleProps) => {
    const router = useRouter();
    const { status } = router.query;

    return (
        <ClassRow labelName={props.labelName}>
            <Select
                form={"box"}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                option_list={props.option_list}
                disable={status === "close"}
            />
        </ClassRow>
    );
};

export default React.memo(ClassSelectInput);
