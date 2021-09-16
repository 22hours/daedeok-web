import useInput from "lib/hooks/useInput";
import { useCallback, useEffect, useState } from "react";
import style from "./AdminManageDivision.module.scss";
import Link from "next/link";
import Typo from "@ui/Typo";
import TextInput from "@ui/input/TextInput";
import Icon from "@ui/Icon";
import Button from "@ui/buttons/Button";
import { useAuthStore } from "store/AuthStore";
import TableWrapper from "@ui/board/TableWrapper";
import TableRow from "@ui/board/TableRow";
import { useAlert } from "store/GlobalAlertStore";
import { useConfirm } from "store/GlobalConfirmStore";

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
    const { alertOn, apiErrorAlert } = useAlert();
    const { confirmOn } = useConfirm();
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
            alertOn({
                message: "상위소속의 이름은 2자 이상이여야 합니다",
                type: "WARN",
            });
            return;
        }
        if (secondDivisionList.findIndex((it) => it === "" || it.length <= 1) !== -1) {
            alertOn({
                message: "하위소속의 이름은 2자 이상이여야 합니다",
                type: "WARN",
            });
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
    const { alertOn, apiErrorAlert } = useAlert();
    const { confirmOn } = useConfirm();
    const [data, setData] = useState<DivisionList[]>([]);
    const { auth, clientSideApi } = useAuthStore();
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
            setData([]);
            getData();
            return true;
        } else {
            apiErrorAlert(res.msg);
            return false;
        }
    };

    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "FIND_DIVISION");
        if (res.result === "SUCCESS") {
            setData(res.data);
        } else {
            apiErrorAlert(res.msg);
        }
    };

    useEffect(() => {
        if (auth) {
            getData();
        }
    }, [auth]);

    const deleteDivision = async (first_division: string) => {
        confirmOn({
            message: "해당 소속을 정말로 삭제하시겠습니까?",
            onSuccess: async () => {
                const res = await clientSideApi("DELETE", "MAIN", "DELETE_DIVISION", undefined, {
                    name: first_division,
                });
                if (res.result === "SUCCESS") {
                    alertOn({
                        message: "성공적으로 삭제되었습니다",
                        type: "POSITIVE",
                    });
                    setData([]);
                    getData();
                } else {
                    apiErrorAlert(res.msg);
                }
            },
        });
    };

    return (
        <div className={style.container}>
            <div className={style.head}>
                <NewDivisionAddForm addNewDivision={addNewDivision} />
            </div>
            <div className={style.body}>
                <TableWrapper>
                    <>
                        <div key={`divisionlistitemheader`} className={style.list_container}>
                            <div>
                                <Typo
                                    className={style.list_item}
                                    type="TEXT"
                                    size="medium"
                                    content={"상위소속"}
                                    color={"brown_font"}
                                />
                            </div>
                            <div>
                                <Typo
                                    className={style.list_item}
                                    type="TEXT"
                                    size="medium"
                                    content={"하위대상"}
                                    color={"brown_font"}
                                />
                            </div>
                            <div>
                                <Typo
                                    className={style.list_item}
                                    type="TEXT"
                                    size="medium"
                                    content={"관리"}
                                    color={"brown_font"}
                                />
                            </div>
                        </div>
                        {data.map((it, idx) => (
                            <div key={`divisionlistitem${idx}`} className={style.list_container}>
                                <div className={style.first_division}>
                                    <Typo type="TEXT" size="normal" content={it.first_division} color={"brown_font"} />
                                </div>
                                <div className={style.second_division}>
                                    <Typo
                                        type="TEXT"
                                        size="normal"
                                        content={it.second_division.map((it) => it).join(",")}
                                        color={"brown_font"}
                                    />
                                </div>
                                <div>
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
                                    <Link href={`/admin/division/edit?first_division=${it.first_division}`} passHref>
                                        <Button
                                            className={style.edit_btn}
                                            type={"SQUARE"}
                                            size={"free"}
                                            fontSize={"smaller"}
                                            content={"수정"}
                                            backgroundColor={"brown_base"}
                                            color={"white"}
                                        />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </>
                </TableWrapper>
            </div>
            <div className={style.footer}></div>
        </div>
    );
};

export default AdminManageDivision;
