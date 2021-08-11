import { useEffect, useState } from "react";
import TableWrapper from "@ui/board/TableWrapper";
import style from "./ClassStudentManageList.module.scss";
import { useAuthStore } from "store/AuthStore";
import { useClassDetailStore } from "store/ClassDetailStore";
import Typo from "@ui/Typo";
import TableRow from "@ui/board/TableRow";
import Button from "@ui/buttons/Button";
import Icon from "@ui/Icon";
import FileInput from "@ui/input/FileInput";
import useFileInput from "lib/hooks/useFileInput";
import Link from "next/link";
type Props = {};

const dummy = [
    {
        user_id: 1,
        name: "name1",
        duty: "duty",
        first_division: "123",
        second_division: "123",
        phone_num: "010-9011-7518",
        status: "FINISH",
        fileUrl: "http://naver.com",
    },
    {
        user_id: 2,
        name: "name2",
        duty: "duty",
        first_division: "123",
        second_division: "123",
        phone_num: "010-9011-7518",
        status: "ING",
        fileUrl: null,
    },
    {
        user_id: 3,
        name: "name3",
        duty: "duty",
        first_division: "123",
        second_division: "123",
        phone_num: "010-9011-7518",
        status: "FINISH",
        fileUrl: null,
    },
];
type UserListItem = {
    user_id: string;
    name: string;
    duty: string;
    first_division: string;
    second_division: string;
    phone_num: string;
    status: "ING" | "FINISH";
    fileUrl?: string;
};

const LeftBtn = ({ data }: { data: UserListItem }) => {
    const { clientSideApi } = useAuthStore();
    const [fileState, setFileState] = useState<string | null>(null);
    useEffect(() => {
        if (data) {
            setFileState(data.fileUrl || null);
        }
    }, [data]);

    const file = useFileInput();
    const leftBtnClassName = `${style[`${data.status.toLowerCase()}_btn`]} ${style.btn}`;

    const uploadDummy = async (file: File) => {
        var bodyFormData = new FormData();
        bodyFormData.append("file_list", file);
        const res = await clientSideApi("POST", "MAIN", "UPLOAD_DUMMY", undefined, bodyFormData);
        return res;
    };
    const setFile = async (file: File) => {
        const fileName: string = file.name;
        const url_res = await uploadDummy(file);
        if (url_res?.result === "SUCCESS") {
            const res = url_res.data[0];
            setFileState(res);
        } else {
            alert(url_res.msg);
        }
    };

    useEffect(() => {
        if (file.value) {
            setFile(file.value);
        }
    }, [file.value]);

    const getBtnText = () => {
        if (data.status === "FINISH") {
            if (fileState !== null) {
                return "다운로드";
            } else {
                return "업로드";
            }
        } else {
            return "진행중";
        }
    };

    const btn_text = getBtnText();
    return (
        <div className={style.left_btn_wrapper}>
            {btn_text === "진행중" && (
                <Button
                    className={leftBtnClassName}
                    type={"SQUARE"}
                    size={"small"}
                    fontSize={"smaller"}
                    content={btn_text}
                />
            )}
            {btn_text === "다운로드" && (
                // @ts-ignore
                <a href={fileState}>
                    <Button
                        className={leftBtnClassName}
                        type={"SQUARE"}
                        size={"small"}
                        fontSize={"smaller"}
                        content={btn_text}
                    />
                </a>
            )}
            {btn_text === "업로드" && (
                <FileInput {...file} accept={"image/*,.hwp,.word,.docx,.pptx,.show"}>
                    <Button
                        className={leftBtnClassName}
                        type={"SQUARE"}
                        size={"small"}
                        fontSize={"smaller"}
                        content={btn_text}
                    />
                </FileInput>
            )}

            <div className={style.delete_file_icon}>
                {btn_text === "다운로드" && <Icon onClick={() => alert("todo")} type={"delete"} />}
            </div>
        </div>
    );
};

type ClassStudentListItemProps = {
    idx: number;
    data: UserListItem;
};
const ClassStudentListItem = (props: ClassStudentListItemProps) => {
    const { idx, data } = props;
    return (
        <TableRow
            idx={idx + 1}
            studentName={data.name}
            studentInfo={{
                duty: data.duty,
                first_division: data.first_division,
                second_division: data.second_division,
                phone_number: data.phone_num,
            }}
            key={`userlist${idx}`}
        >
            <div className={style.btn_col}>
                <LeftBtn data={data} />
                <Button
                    className={`${style.btn} ${style.cancle_btn}`}
                    type={"SQUARE"}
                    size={"small"}
                    fontSize={"smaller"}
                    content={"철회"}
                />
            </div>
        </TableRow>
    );
};

type State = {
    student_num: string;
    user_list: UserListItem[];
};
const ClassStudentManageList = () => {
    const classDetailState = useClassDetailStore();
    const [data, setData] = useState<State | null>(null);

    const { clientSideApi } = useAuthStore();
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_MANAGE_STUDENT", {
            lecture_id: classDetailState.class_id,
        });
        if (res.result === "SUCCESS") {
            setData({ ...res.data, user_list: dummy });
        } else {
            alert(res.msg);
        }
    };

    useEffect(() => {
        if (classDetailState.class_id) {
            getData();
        }
    }, [classDetailState]);

    if (data === null) {
        return <div className={style.container}>LOAD NOW</div>;
    } else {
        return (
            <div className={style.container}>
                <div className={style.head}>
                    <Typo
                        type={"TEXT"}
                        size={"smaller"}
                        content={`총 수강인원 : ${data.student_num}`}
                        color={"gray_accent"}
                    />
                </div>
                <div className={style.body}>
                    <TableWrapper>
                        {data.user_list.map((it, idx) => {
                            return <ClassStudentListItem key={`usermanageitem:${idx}`} idx={idx} data={it} />;
                        })}
                    </TableWrapper>
                </div>
            </div>
        );
    }
};

export default ClassStudentManageList;
