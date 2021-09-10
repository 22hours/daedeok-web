import React, { useState, useEffect } from "react";
import TableRow from "@ui/board/TableRow";
import Button from "@ui/buttons/Button";
import TableWrapper from "@ui/board/TableWrapper";
import style from "./StudentClassPlanList.module.scss";
import Link from "next/link";
import { nanoid } from "nanoid";
import Typo from "@ui/Typo";
//store
import { useAuthStore } from "store/AuthStore";
import { useClassDetailStore } from "store/ClassDetailStore";
import { useAlert } from "store/GlobalAlertStore";

import moment from "moment";

const ClassTypeBtn = ({ type, idx, classId, link, time }) => {
    const { clientSideApi, auth } = useAuthStore();
    const { alertOn, apiErrorAlert } = useAlert();
    const nowTime = moment();
    const diffTime = moment.duration(nowTime.diff(time)).asMinutes();
    var nowLink = "";

    if (link.indexOf("http") !== -1 || link.indexOf("https") !== -1) {
        nowLink = link;
    } else {
        nowLink = "https://" + link;
    }

    console.log(nowLink);
    const handleError = () => {
        if (diffTime >= 0) {
        } else {
            alertOn({
                title: "",
                //@ts-ignore
                message: "강의 시작 시간이 아닙니다.",
                type: "WARN",
            });
        }
    };

    const planUserAttendance = async () => {
        if (diffTime >= -30 && diffTime <= 180) {
            const res = await clientSideApi("POST", "MAIN", "LECTURE_PLAN_USER_ATTENDANCE_MEMBER", {
                plan_id: idx,
            });
            if (res.result === "SUCCESS") {
                alertOn({
                    title: "강의출석",
                    //@ts-ignore
                    message: "출석 완료",
                    type: "POSITIVE",
                });
            } else {
                apiErrorAlert(res.msg);
            }
        } else {
            alertOn({
                title: "",
                //@ts-ignore
                message: "강의 시작 시간이 아닙니다.",
                type: "WARN",
            });
        }
    };

    switch (type) {
        case "ZOOM":
            return (
                <>
                    {diffTime >= -30 && diffTime <= 180 ? (
                        <Link href={nowLink} passHref>
                            <a target="_blank">
                                <Button
                                    content={"ZOOM"}
                                    backgroundColor="red_accent"
                                    fontSize="smaller"
                                    color="white"
                                    alignment="center"
                                    size="small"
                                    line="inline"
                                    type="SQUARE"
                                    onClick={planUserAttendance}
                                />
                            </a>
                        </Link>
                    ) : (
                        <Button
                            content={"ZOOM"}
                            backgroundColor="red_accent"
                            fontSize="smaller"
                            color="white"
                            alignment="center"
                            size="small"
                            line="inline"
                            className={style.cursor_none}
                            type="SQUARE"
                            onClick={planUserAttendance}
                        />
                    )}
                </>
            );
        case "ONLINE":
            return (
                <>
                    {diffTime >= 0 ? (
                        <Link href={`/class/open/${classId}/student/join/detail/${idx}`}>
                            <Button
                                content={"영상보기"}
                                backgroundColor="yellow_accent"
                                fontSize="smaller"
                                color="white"
                                alignment="center"
                                size="small"
                                type="SQUARE"
                                onClick={handleError}
                            />
                        </Link>
                    ) : (
                        <Button
                            content={"영상보기"}
                            backgroundColor="yellow_accent"
                            fontSize="smaller"
                            color="white"
                            alignment="center"
                            size="small"
                            className={style.cursor_none}
                            type="SQUARE"
                            onClick={handleError}
                        />
                    )}
                </>
            );
        case "OFFLINE":
            return (
                <Button
                    content={"오프라인"}
                    backgroundColor="brown_base"
                    fontSize="smaller"
                    color="white"
                    alignment="center"
                    size="small"
                    type="SQUARE"
                    className={style.cursor_none}
                />
            );
        default:
            return <div></div>;
    }
};

const StudentClassPlanList = () => {
    const [planList, setPlanList] = useState<
        Array<{ id: number; week: number; title: string; type: string; link: string; date: string }>
    >([]);
    const { clientSideApi } = useAuthStore();
    const lectureId = useClassDetailStore();

    useEffect(() => {
        if (lectureId.class_id) {
            getClassPlanList();
        }
    }, [lectureId]);

    const getClassPlanList = async () => {
        const res_data = await clientSideApi("GET", "MAIN", "LECTUER_PLAN_LIST", { lecture_id: lectureId.class_id });
        if (res_data.result === "SUCCESS") {
            var data = res_data.data;
            setPlanList(data);
        }
    };

    return (
        <div className={style.class_plan_list_wrapper}>
            <TableWrapper>
                {planList.map((it, idx) => (
                    <div key={`studentclassplanlist${nanoid()}`}>
                        <div className={style.planlist_wrapper}>
                            <div className={style.title_wrapper}>
                                <Typo
                                    color="gray_accent"
                                    content={`${it.week.toString()} 주차`}
                                    size="normal"
                                    type="TEXT"
                                    className={style.margin_style}
                                />
                                <Typo color="gray_accent" content={it.title} size="normal" type="TEXT" />
                            </div>
                            <div className={style.button}>
                                <ClassTypeBtn
                                    type={it.type}
                                    idx={it.id}
                                    classId={lectureId.class_id}
                                    link={it.link}
                                    time={it.date}
                                ></ClassTypeBtn>
                            </div>
                        </div>
                    </div>
                ))}
            </TableWrapper>
        </div>
    );
};
export default StudentClassPlanList;
