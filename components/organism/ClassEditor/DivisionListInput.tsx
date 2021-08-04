import React, { useCallback, useEffect, useState } from "react";
import style from "./ClassEditor.module.scss";
import ClassSelectInput from "./items/ClassSelectInput";
import { class_types } from "@global_types";
import { nanoid } from "nanoid";
import Typo from "@ui/Typo";
import Icon from "@ui/Icon";
type DivisionProps = {
    divisionList: class_types.ClassInfo["division_list"];
    addDivisionItem: (division: class_types.Division) => void;
    removeDivisionItem: (idx: number) => void;
};
type DivisionSelectOption = { value: string; name: string };
type OptionState = { first_division_list: DivisionSelectOption[]; second_division_list: DivisionSelectOption[] };
const DivisionListInput = (props: DivisionProps) => {
    // GET DIVISON LIST
    const [optionList, setOptionList] = useState<OptionState | null>(null);
    useEffect(() => {
        setOptionList({
            first_division_list: [
                {
                    value: "고등부",
                    name: "고등부",
                },
                {
                    value: "초등부",
                    name: "초등부",
                },
            ],
            second_division_list: [
                {
                    value: "1학년",
                    name: "1학년",
                },
                {
                    value: "2학년",
                    name: "2학년",
                },

                {
                    value: "3학년",
                    name: "3학년",
                },
            ],
        });
    }, []);

    return (
        <div className={style.DivisionListInput}>
            {optionList && <DivisionInputInner optionList={optionList} addDivisionList={props.addDivisionItem} />}
            <DivisionItemList divisionList={props.divisionList} removeDivisionItem={props.removeDivisionItem} />
        </div>
    );
};

// DIVISION ITEM LIST
type DivisionItemListProps = {
    divisionList: class_types.ClassInfo["division_list"];
    removeDivisionItem: (idx: number) => void;
};
const DivisionItemList = (props: DivisionItemListProps) => {
    type DivisionItemProps = {
        first_division: string;
        second_division: string;
        removeDivisionItem: (idx: number) => void;
        idx: number;
    };
    const DivisionItem = (props: DivisionItemProps) => {
        return (
            <div className={style.division_item}>
                <div className={style.item_text}>
                    <Typo type={"TEXT"} size={"small"} color={"brown_base"} content={props.first_division} />
                    <Typo type={"TEXT"} size={"small"} color={"brown_base"} content={props.second_division} />
                </div>
                <div onClick={() => props.removeDivisionItem(props.idx)}>
                    <Icon type={"delete"} />
                </div>
            </div>
        );
    };

    return (
        <div className={style.division_item_list}>
            {props.divisionList.map((it, idx) => (
                <DivisionItem
                    key={`divisionlistitem::${nanoid()}`}
                    idx={idx}
                    {...it}
                    removeDivisionItem={props.removeDivisionItem}
                />
            ))}
        </div>
    );
};

// DIVISON INPUT INNER
type InnerProps = {
    optionList: OptionState;
    addDivisionList: (division: class_types.Division) => void;
};
const DivisionInputInner = React.memo((props: InnerProps) => {
    const [localDivisionState, setLocalDivisionState] = useState<class_types.Division>({
        first_division: "",
        second_division: "",
    });

    useEffect(() => {
        if (localDivisionState.first_division !== "" && localDivisionState.second_division !== "") {
            props.addDivisionList(localDivisionState);
        }
    }, [localDivisionState.second_division]);

    const setFirstDivision = useCallback(
        (e) => setLocalDivisionState({ first_division: e.target.value, second_division: "" }),
        [localDivisionState]
    );

    const setSecondDivision = useCallback(
        (e) => setLocalDivisionState({ ...localDivisionState, second_division: e.target.value }),
        [localDivisionState]
    );

    return (
        <div>
            <ClassSelectInput
                labelName={"상위 소속"}
                value={localDivisionState.first_division}
                onChange={setFirstDivision}
                placeholder={"상위소속"}
                option_list={props.optionList.first_division_list}
            />
            <ClassSelectInput
                labelName={"하위 소속"}
                value={localDivisionState.second_division}
                onChange={setSecondDivision}
                placeholder={"하위소속"}
                option_list={localDivisionState.first_division !== "" ? props.optionList.second_division_list : []}
            />
        </div>
    );
});

export default DivisionListInput;
