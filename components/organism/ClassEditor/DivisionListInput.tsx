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
    setDivisionList: (division_list: class_types.Division[]) => void;
    removeDivisionItem: (idx: number) => void;
};
type DivisionSelectOption = { value: string; name: string };
const DivisionListInput = (props: DivisionProps) => {
    return (
        <div className={style.DivisionListInput}>
            <DivisionInputInner
                divisionList={props.divisionList}
                addDivisionItem={props.addDivisionItem}
                addDivisonList={props.addDivisonList}
                setDivisionList={props.setDivisionList}
            />
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
    divisionList: class_types.ClassInfo["division_list"];
    addDivisionItem: (division: class_types.Division) => void;
    addDivisonList: (division_list: class_types.Division[]) => void;
    setDivisionList: (division_list: class_types.Division[]) => void;
};
const DivisionInputInner = React.memo((props: InnerProps) => {
    const first_division = useInput();
    const second_division = useInput();

    const { firstDivisionOptionList, secondDivisionOptionList } = useDivision(first_division, second_division);

    useEffect(() => {
        if (first_division.value !== "" && second_division.value !== "") {
            //전체일경우
            if (first_division.value === "ALL") {
            } else {
                //전체가 아닐 경우
                if (second_division.value === "ALL") {
                    var newList = props.divisionList.slice();
                    newList = newList.filter((it) => it.first_division !== first_division.value);
                    newList.push({
                        first_division: first_division.value,
                        second_division: "전체",
                    });
                    props.setDivisionList(newList);
                    // props.addDivisionItem({
                    //     first_division: first_division.value,
                    //     second_division: "전체",
                    // });
                } else {
                    props.addDivisionItem({
                        first_division: first_division.value,
                        second_division: second_division.value,
                    });
                }
            }
            var nowList = props.divisionList.slice();
            nowList = nowList.filter((it) => it.first_division === "전체");
            //이미 전체가 있는 경우
            if (nowList.length > 0) {
                props.setDivisionList([{ first_division: "전체", second_division: "" }]);
            }
        }
    }, [second_division.value]);

    useEffect(() => {
        //전체 선택
        if (first_division.value === "ALL") {
            props.setDivisionList([{ first_division: "전체", second_division: "" }]);
        }
    }, [first_division.value]);

    return (
        <div>
            <ClassSelectInput
                labelName={"상위 소속"}
                value={first_division.value}
                onChange={first_division.onChange}
                placeholder={"상위소속"}
                option_list={[{ name: "전체", value: "ALL" }].concat(firstDivisionOptionList())}
                // option_list={firstDivisionOptionList()}
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
