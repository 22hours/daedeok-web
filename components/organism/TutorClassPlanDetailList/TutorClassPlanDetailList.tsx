import { meta_types } from "@global_types";
import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";
import Button from "@ui/buttons/Button";
import Typo from "@ui/Typo";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "store/AuthStore";
import { useAlert } from "store/GlobalAlertStore";
import { useConfirm } from "store/GlobalConfirmStore";

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
    week: number;
};

const TutorClassPlanDetailList = () => {
    const { clientSideApi } = useAuthStore();
    const [state, setState] = useState<State | null>(null);
    const router = useRouter();
    const { episode_id } = router.query;
    const { alertOn, apiErrorAlert } = useAlert();
    const { confirmOn } = useConfirm();

    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_FIND_PLAN_DETAIL", { episode_id: episode_id });
        if (res.result === "SUCCESS") {
            setState(res.data);
        } else {
            apiErrorAlert(res.msg);
        }
    };

    const postAttendance = async (user_id: number) => {
        if (state?.type === "OFFLINE") {
            const res = await clientSideApi(
                "POST",
                "MAIN",
                "LECTURE_PLAN_USER_ATTENDANCE",
                { plan_id: episode_id },
                {
                    user_id: user_id,
                }
            );
            if (res.result === "SUCCESS") {
                getData();
                alertOn({
                    title: "",
                    //@ts-ignore
                    message: "완료되었습니다",
                    type: "POSITIVE",
                });
            } else {
                apiErrorAlert(res.msg);
            }
        } else {
            alertOn({
                title: "",
                //@ts-ignore
                message: "오프라인 강의만 출석 가능합니다",
                type: "WARN",
            });
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
                            <Typo type={"TEXT"} size={"normal"} content={`${state.week}주차`} />
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
                            content={
                                state.type === "OFFLINE"
                                    ? "강의 형태 : 오프라인"
                                    : state.type === "ONLINE"
                                    ? "강의 형태 : 영상 강의"
                                    : "강의 형태 : ZOOM"
                            }
                        />
                    </div>
                </div>
                <TableWrapper>
                    {state.student_list.map((it, idx) => {
                        const studentInfo = `${it.duty} ${it.first_division} ${it.second_division} ${it.phone_num}`;
                        return (
                            <div key={`studentitem${idx}`}>
                                <div className={style.list_wrapper}>
                                    <div className={style.left_wrapper}>
                                        <div className={style.main_info}>
                                            <div className={style.list_id}>
                                                <Typo
                                                    type="TEXT"
                                                    size="small"
                                                    content={it.user_id.toString()}
                                                    color={"brown_font"}
                                                />
                                            </div>
                                            <div className={style.name}>
                                                <Typo
                                                    type="TEXT"
                                                    size="medium"
                                                    content={it.name}
                                                    color={"brown_font"}
                                                />
                                            </div>
                                            <div className={`${style.pc_only}  ${style.student_info_wrapper}`}>
                                                <Typo
                                                    type="TEXT"
                                                    size="small"
                                                    content={studentInfo}
                                                    color={"gray_accent"}
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            className={`${style.button}`}
                                            type={"SQUARE"}
                                            size={"small"}
                                            fontSize={"smaller"}
                                            backgroundColor={it.status !== "COMPLETE" ? "brown_base" : "gray_accent"}
                                            color={"white"}
                                            content={it.status !== "COMPLETE" ? "출석확인" : "출석완료"}
                                            onClick={
                                                it.status !== "COMPLETE" ? () => postAttendance(it.user_id) : () => {}
                                            }
                                        />
                                    </div>
                                    <div className={style.right_wrapper}>
                                        <div className={`${style.mobile_only}  ${style.student_info_wrapper}`}>
                                            <Typo
                                                type="TEXT"
                                                size="small"
                                                content={studentInfo}
                                                color={"gray_accent"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
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
