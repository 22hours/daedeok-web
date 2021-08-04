import { meta_types } from "@global_types";
import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";
import Button from "@ui/buttons/Button";
import Typo from "@ui/Typo";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "store/AuthStore";
import style from "./TutorClassPlanDetailList.module.scss";
type Props = {};
type Student = {
    user_id: number;
    name: string;
    duty: string;
    first_division: string;
    second_division: string;
    phone_num: number;
    status: "COMPLETE" | null;
};
type State = {
    total_student: number;
    type: meta_types.classType;
    student_list: Student[];
};

const dummyData = {
    total_student: 11,
    type: "ZOOM",
    student_list: [
        {
            user_id: 1,
            name: "name1",
            duty: "duty",
            first_division: "first_division",
            second_division: "second_division",
            phone_num: "010-9011-7518",
            status: "COMPLETE",
        },
        {
            user_id: 2,
            name: "name2",
            duty: "duty",
            first_division: "first_division",
            second_division: "second_division",
            phone_num: "010-9011-7518",
            status: null,
        },
        {
            user_id: 3,
            name: "name3",
            duty: "duty",
            first_division: "first_division",
            second_division: "second_division",
            phone_num: "010-9011-7518",
            status: null,
        },
    ],
};

const TutorClassPlanDetailList = () => {
    const { clientSideApi } = useAuthStore();
    const [state, setState] = useState<State | null>(null);
    const router = useRouter();
    const { episode_id } = router.query;

    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_FIND_PLAN_DETAIL", { episode_id: episode_id });
        if (res.result === "SUCCESS") {
            setState(res.data);
        } else {
            // alert(res.msg);

            //@ts-ignore
            setState(dummyData);
        }
    };

    const postAttendance = async (user_id: number) => {
        const res = await clientSideApi(
            "POST",
            "MAIN",
            "LECTURE_PLAN_USER_ATTENDANCE",
            { episode_id: episode_id },
            {
                user_id: user_id,
            }
        );
        if (res.result === "SUCCESS") {
            alert("출석 완료 되었습니다");
            getData();
        } else {
            alert(res.msg);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (!state) {
        return <div></div>;
    } else {
        return (
            <div>
                <div className={style.header}>
                    <div className={style.sub_breadcrumbs_container}>
                        <Link href={`${router.asPath.split("/").slice(0, -2).join("/")}`} passHref>
                            <div>
                                <Typo
                                    type={"TEXT"}
                                    size={"normal"}
                                    color={"yellow_accent"}
                                    content={"목록보기"}
                                    className={style.breadcrumb_item}
                                />
                            </div>
                        </Link>
                        &nbsp;
                        <Typo type={"TEXT"} size={"normal"} content={">"} />
                        &nbsp;
                        <div>
                            <Typo type={"TEXT"} size={"normal"} content={`${episode_id} 주차`} />
                        </div>
                    </div>
                    <div className={style.info}>
                        <Typo
                            type={"TEXT"}
                            size={"smaller"}
                            color={"gray_accent"}
                            content={`총 수강인원 : ${state.total_student}`}
                        />
                        <Typo
                            type={"TEXT"}
                            size={"smaller"}
                            color={"gray_accent"}
                            content={`강의 형태 : ${state.type}`}
                        />
                    </div>
                </div>
                <TableWrapper>
                    {state.student_list.map((it, idx) => {
                        return (
                            <TableRow
                                key={`planuseritem:${idx}`}
                                idx={idx + 1}
                                studentName={it.name}
                                studentInfo={{
                                    duty: it.duty,
                                    first_division: it.first_division,
                                    second_division: it.second_division,
                                    phone_number: it.phone_num.toString(),
                                }}
                            >
                                <Button
                                    type={"SQUARE"}
                                    size={"small"}
                                    fontSize={"smaller"}
                                    backgroundColor={it.status !== "COMPLETE" ? "brown_base" : "gray_accent"}
                                    color={"white"}
                                    content={it.status !== "COMPLETE" ? "출석확인" : "출석완료"}
                                    onClick={it.status !== "COMPLETE" ? () => postAttendance(it.user_id) : () => {}}
                                />
                            </TableRow>
                        );
                    })}
                </TableWrapper>
                <div className={style.footer}>
                    <Button
                        className={style.all_button}
                        type={"SQUARE"}
                        size={"small"}
                        fontSize={"smaller"}
                        backgroundColor={"red_accent"}
                        color={"white"}
                        content={"전체출석"}
                        onClick={() => postAttendance(-1)}
                    />
                </div>
            </div>
        );
    }
};

export default TutorClassPlanDetailList;
