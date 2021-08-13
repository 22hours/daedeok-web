import useInput from "lib/hooks/useInput";
import { useCallback, useEffect, useState } from "react";
import style from "./AdminManageDivision.module.scss";

import Typo from "@ui/Typo";
import TextInput from "@ui/input/TextInput";
import Icon from "@ui/Icon";
import Button from "@ui/buttons/Button";
import { useAuthStore } from "store/AuthStore";
import TableWrapper from "@ui/board/TableWrapper";
import TableRow from "@ui/board/TableRow";

type Props = {};

type SecondDivistionItemProps = {
    idx: number;
    value: string;
    onChnage: any;
    onDelete: any;
};
const SecondDivisionItem = (props: SecondDivistionItemProps) => {
    const handleOnChange = (e) => {
        props.onChnage(props.idx, e.target.value);
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

type second_division_list = Array<string>;
type NewDivisionAddFormProps = {
    addNewDivision: (first_division: string, second_division_list: string[]) => Promise<boolean>;
};
const NewDivisionAddForm = (props: NewDivisionAddFormProps) => {
    const fisrt_division = useInput();
    const [secondDivisionList, setSecondDivisionList] = useState<second_division_list>([""]);

    const addSecondDivisionItem = useCallback(() => {
        const cloneList = secondDivisionList.slice();
        cloneList.push("");
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
        cloneList[idx] = value;
        setSecondDivisionList(cloneList);
    };
    const handleAddDivsion = async () => {
        if (fisrt_division.value.length <= 1) {
            alert("상위소속의 이름은 2자 이상이여야 합니다");
            return;
        }
        if (secondDivisionList.findIndex((it) => it === "" || it.length <= 1) !== -1) {
            alert("하위소속의 이름은 2자 이상이여야 합니다");
            return;
        }
        const res = await props.addNewDivision(fisrt_division.value, secondDivisionList);
        if (res) {
            fisrt_division.setValue("");
            setSecondDivisionList([""]);
        }
    };
    return (
        <div className={style.new_division_container}>
            <div className={style.row}>
                <Typo className={style.label} type={"TEXT"} size={"small"} content={"상위소속"} />
                <TextInput
                    placeholder={"상위소속을 입력하세요"}
                    type={"text"}
                    form={"box"}
                    {...fisrt_division}
                    className={style.input}
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
                {secondDivisionList.map((it, idx) => {
                    return (
                        <SecondDivisionItem
                            key={`seconddivisionitem${idx}`}
                            //@ts-ignore
                            value={it}
                            idx={idx}
                            onChnage={editSecondDivisionItem}
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
                    content={"전체추가"}
                    backgroundColor={"yellow_accent"}
                    color={"white"}
                    onClick={handleAddDivsion}
                />
            </div>
        </div>
    );
};

type DivisionList = {
    first_division: string;
    second_division: string[];
};
const AdminManageDivision = () => {
    const [data, setData] = useState<DivisionList[]>([]);
    const { auth, clientSideApi } = useAuthStore();
    const addNewDivision = async (first_division, second_division_list): Promise<boolean> => {
        const res = await clientSideApi("POST", "MAIN", "ADD_DIVISION", undefined, {
            fisrt_division: first_division,
            second_division: second_division_list,
        });
        if (res.result === "SUCCESS") {
            alert("성공적으로 추가되었습니다");
            setData([]);
            getData();
            return true;
        } else {
            alert(res.msg);
            return false;
        }
    };

    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "FIND_DIVISION");
        if (res.result === "SUCCESS") {
            setData(res.data);
        } else {
            alert(res.msg);
        }
    };

    useEffect(() => {
        if (auth) {
            getData();
        }
    }, [auth]);

    const deleteDivision = async (first_division: string) => {
        const res = await clientSideApi("DELETE", "MAIN", "DELETE_DIVISION", undefined, {
            name: first_division,
        });
        if (res.result === "SUCCESS") {
            setData([]);
            getData();
        } else {
            alert(res.msg);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.head}>
                <NewDivisionAddForm addNewDivision={addNewDivision} />
            </div>
            <div className={style.body}>
                <TableWrapper>
                    <>
                        {data.map((it, idx) => (
                            <TableRow
                                key={`divisionlistitem${idx}`}
                                title={it.first_division || " "}
                                studentName={it.second_division.map((it) => it).join(",")}
                            >
                                <div className={style.control_col}>
                                    <Button
                                        className={style.button}
                                        type={"SQUARE"}
                                        size={"free"}
                                        fontSize={"smaller"}
                                        content={"삭제"}
                                        backgroundColor={"brown_base"}
                                        color={"white"}
                                        onClick={() => deleteDivision(it.first_division)}
                                    />
                                </div>
                            </TableRow>
                        ))}
                    </>
                </TableWrapper>
            </div>
            <div className={style.footer}></div>
        </div>
    );
};

export default AdminManageDivision;