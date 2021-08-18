import React, { useCallback, useEffect, useState } from "react";
import style from "./ClassEditor.module.scss";
import ClassSelectInput from "./items/ClassSelectInput";
import { class_types } from "@global_types";
import { nanoid } from "nanoid";
import Typo from "@ui/Typo";
import Icon from "@ui/Icon";
import useInput from "lib/hooks/useInput";
import useDivision from "lib/hooks/useDivision";
type DivisionProps = {
    divisionList: class_types.ClassInfo["division_list"];
    addDivisionItem: (division: class_types.Division) => void;
    addDivisonList: (division_list: class_types.Division[]) => void;
    removeDivisionItem: (idx: number) => void;
};
type DivisionSelectOption = { value: string; name: string };
const DivisionListInput = (props: DivisionProps) => {
    return (
        <div className={style.DivisionListInput}>
            <DivisionInputInner addDivisionItem={props.addDivisionItem} addDivisonList={props.addDivisonList} />
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
    addDivisionItem: (division: class_types.Division) => void;
    addDivisonList: (division_list: class_types.Division[]) => void;
};
const DivisionInputInner = React.memo((props: InnerProps) => {
    const first_division = useInput();
    const second_division = useInput();

    const { firstDivisionOptionList, secondDivisionOptionList } = useDivision(first_division, second_division);

    useEffect(() => {
        if (first_division.value !== "" && second_division.value !== "") {
            if (second_division.value === "ALL") {
                const newItemList: class_types.Division[] = [];
                secondDivisionOptionList().forEach((second_division) => {
                    newItemList.push({
                        first_division: first_division.value,
                        second_division: second_division.name,
                    });
                });
                console.log(newItemList);
                props.addDivisonList(newItemList);
            } else {
                props.addDivisionItem({
                    first_division: first_division.value,
                    second_division: second_division.value,
                });
            }
        }
    }, [second_division.value]);

    return (
        <div>
            <ClassSelectInput
                labelName={"상위 소속"}
                value={first_division.value}
                onChange={first_division.onChange}
                placeholder={"상위소속"}
                option_list={firstDivisionOptionList()}
            />
            <ClassSelectInput
                labelName={"하위 소속"}
                value={second_division.value}
                onChange={second_division.onChange}
                placeholder={"하위소속"}
                option_list={
                    first_division.value !== ""
                        ? [{ name: "전체", value: "ALL" }].concat(secondDivisionOptionList())
                        : []
                }
            />
        </div>
    );
});

export default DivisionListInput;
