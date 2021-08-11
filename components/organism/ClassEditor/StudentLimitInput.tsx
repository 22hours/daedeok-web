import React from "react";
import style from "./ClassEditor.module.scss";
import TextInput from "@ui/input/TextInput";
import ClassRow from "components/organism/ClassEditor/items/ClassRow";
import CheckBox from "@ui/input/CheckBox";
import { useRouter } from "next/router";
type titleProps = {
    value: number;
    onChange: (value: number) => void;
};
const StudentLimitInput = (props: titleProps) => {
    const handleInputChange = (e) => {
        props.onChange(e.target.value);
    };
    const toggleCheck = () => {
        if (props.value === -1) {
            props.onChange(0);
        } else {
            props.onChange(-1);
        }
    };
    return (
        <div className={style.StudentLimitInput}>
            <ClassRow labelName={"정원"}>
                <InputColumn value={props.value} toggleCheck={toggleCheck} onChange={handleInputChange} />
            </ClassRow>
        </div>
    );
};

type InputProps = {
    className?: string;
    toggleCheck: () => void;
} & titleProps;
const InputColumn = (props: InputProps) => {
    const router = useRouter();
    const { status } = router.query;

    return (
        <div className={style.InputColumn}>
            {props.value === -1 ? (
                <TextInput
                    className={style.text}
                    type={"text"}
                    disable={true}
                    form={"box"}
                    value={"무제한"}
                    onChange={() => {}}
                />
            ) : (
                <TextInput
                    className={style.text}
                    type={"number"}
                    form={"box"}
                    value={props.value}
                    onChange={props.onChange}
                    disable={status === "close"}
                />
            )}

            <CheckBox
                className={style.check}
                labelContent="무제한"
                value={props.value === -1 ? true : false}
                onChange={(e) => {
                    props.toggleCheck();
                }}
                isLabelRight={true}
                disable={status === "close"}
            />
        </div>
    );
};

export default React.memo(StudentLimitInput);
