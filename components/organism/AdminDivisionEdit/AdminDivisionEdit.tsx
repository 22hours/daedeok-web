import React, { useEffect, useState, useCallback } from "react";
import style from "./AdminDivisionEdit.module.scss";
import { useRouter } from "next/router";
import { useAuthStore } from "store/AuthStore";
import { useAlert } from "store/GlobalAlertStore";
import TextInput from "@ui/input/TextInput";
import Icon from "@ui/Icon";
import Typo from "@ui/Typo";
import Button from "@ui/buttons/Button";
import ListController from "lib/client/listController";

type SecondDivistionItemProps = {
    idx: number;
    value: string;
    onChange: any;
    onDelete: any;
};
const SecondDivisionItem = (props: SecondDivistionItemProps) => {
    const handleOnChange = (e) => {
        props.onChange(props.idx, e.target.value);
    };
    const handleOnDelete = () => {
        props.onDelete(props.idx);
    };
    return (
        <div className={style.second_division_item}>
            <TextInput value={props.value} onChange={handleOnChange} type={"text"} form={"box"} />
            <Icon onClick={handleOnDelete} type={"delete"} />
        </div>
    );
};

type second_division_list = { id?: number; second_division: string }[];

const AdminDivisionEdit = () => {
    const router = useRouter();
    const { first_division } = router.query;
    const { auth, clientSideApi } = useAuthStore();
    const { alertOn, apiErrorAlert } = useAlert();
    const [firstDivision, setFirstDivision] = useState<any>(first_division);
    const [secondDivisionList, setSecondDivisionList] = useState<second_division_list>([]);
    const [originSecondDivisionList, setOriginSecondDivisionList] = useState<second_division_list>([]);

    const [deleteList, setDeleteList] = useState<second_division_list>([]);
    const [updateList, setUpdateList] = useState<second_division_list>([]);

    useEffect(() => {
        // getDivision();
        setSecondDivisionList([
            {
                id: 1,
                second_division: "1학년",
            },
            {
                id: 2,
                second_division: "2학년",
            },
            {
                id: 3,
                second_division: "3학년",
            },
        ]);
        setOriginSecondDivisionList([
            {
                id: 1,
                second_division: "1학년",
            },
            {
                id: 2,
                second_division: "2학년",
            },
            {
                id: 3,
                second_division: "3학년",
            },
        ]);
    }, [first_division]);

    const addSecondDivisionItem = useCallback(() => {
        const cloneList = secondDivisionList.slice();
        cloneList.push({ second_division: "" });
        setSecondDivisionList(cloneList);
    }, [secondDivisionList]);

    const removeSecondDivistionItem = useCallback(
        (idx: number) => {
            const cloneList = secondDivisionList.slice();
            cloneList.splice(idx, 1);
            setSecondDivisionList(cloneList);
        },
        [secondDivisionList]
    );

    const editSecondDivisionItem = (idx: number, value: string) => {
        const cloneList = secondDivisionList.slice();
        cloneList[idx].second_division = value;
        setSecondDivisionList(cloneList);
    };

    const handleEditDivsion = async () => {
        if (firstDivision?.length < 1) {
            alertOn({
                message: "상위소속의 이름은 2자 이상이여야 합니다",
                type: "WARN",
            });
            return;
        }
        if (secondDivisionList.findIndex((it) => it.second_division === "" || it.second_division.length <= 1) !== -1) {
            alertOn({
                message: "하위소속의 이름은 2자 이상이여야 합니다",
                type: "WARN",
            });
            return;
        }

        const diffItemList = ListController.getUpdateInList(originSecondDivisionList, secondDivisionList);
        // const res = await props.addNewDivision(first_division.value, secondDivisionList);
        // if (res) {
        //     first_division.setValue("");
        //     setSecondDivisionList([""]);
        // }
        console.log(diffItemList);
    };

    const addNewDivision = async (first_division, second_division_list): Promise<boolean> => {
        const res = await clientSideApi("POST", "MAIN", "ADD_DIVISION", undefined, {
            first_division: first_division,
            second_division: second_division_list,
        });
        if (res.result === "SUCCESS") {
            alertOn({
                message: "성공적으로 추가되었습니다",
                type: "POSITIVE",
            });
            return true;
        } else {
            apiErrorAlert(res.msg);
            return false;
        }
    };

    const getDivision = async () => {
        const res = await clientSideApi("GET", "MAIN", "ADMIN_FIND_DIVISION", undefined, {
            first_division: first_division,
        });
        if (res.result === "SUCCESS") {
            setSecondDivisionList(res.data);
        } else {
            apiErrorAlert(res.msg);
        }
    };

    return (
        <div className={style.head}>
            <div className={style.new_division_container}>
                <div className={style.row}>
                    <Typo className={style.label} type={"TEXT"} size={"small"} content={"상위소속"} />
                    <TextInput
                        type={"text"}
                        form={"box"}
                        //@ts-ignore
                        value={firstDivision}
                        className={style.input}
                        onChange={(e) => {
                            setFirstDivision(e.target.value);
                        }}
                    />
                </div>
                <div className={style.row}>
                    <Typo className={style.label} type={"TEXT"} size={"small"} content={"하위소속"} />
                    <Button
                        className={style.button}
                        type={"SQUARE"}
                        size={"free"}
                        fontSize={"smaller"}
                        content={"하위소속추가"}
                        backgroundColor={"brown_base"}
                        color={"white"}
                        onClick={addSecondDivisionItem}
                    />
                </div>
                <div className={style.second_division_grid}>
                    {secondDivisionList?.map((it, idx) => {
                        return (
                            <SecondDivisionItem
                                key={`seconddivision${idx}`}
                                //@ts-ignore
                                value={it.second_division}
                                idx={idx}
                                onChange={editSecondDivisionItem}
                                onDelete={removeSecondDivistionItem}
                            />
                        );
                    })}
                </div>
                <div className={style.control_row}>
                    <Button
                        className={style.button}
                        type={"SQUARE"}
                        size={"medium"}
                        fontSize={"small"}
                        content={"수정"}
                        backgroundColor={"yellow_accent"}
                        color={"white"}
                        onClick={handleEditDivsion}
                    />
                </div>
            </div>
        </div>
    );
};
export default AdminDivisionEdit;
