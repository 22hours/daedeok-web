import React, { useState, useEffect } from "react";
import TableRow from "@ui/board/TableRow";
import Button from "@ui/buttons/Button";
import TableWrapper from "@ui/board/TableWrapper";
import style from "./StudentClassPlanList.module.scss";
import Link from "next/link";
import { nanoid } from "nanoid";
//store
import { useAuthStore } from "store/AuthStore";
import { useClassDetailStore } from "store/ClassDetailStore";

import moment from "moment";

const ClassTypeBtn = ({ type, idx, classId, link, time }) => {
    const { clientSideApi, auth } = useAuthStore();
    const nowTime = moment();
    const diffTime = moment.duration(nowTime.diff(time)).asMinutes();

    const planUserAttendance = async () => {
        if (diffTime >= -30 && diffTime <= 180) {
            const res = await clientSideApi("POST", "MAIN", "LECTURE_PLAN_USER_ATTENDANCE_MEMBER", {
                plan_id: idx,
            });
            if (res.result === "SUCCESS") {
                alert("출석완료");
            } else {
                alert("다시 시도해주세요");
            }
        } else {
            alert("강의 시작 시간이 아닙니다.");
        }
    };

    switch (type) {
        case "ZOOM":
            return (
                <>
                    {diffTime >= -30 && diffTime <= 180 ? (
                        <Link href={link} passHref>
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
                            type="SQUARE"
                            onClick={planUserAttendance}
                        />
                    )}
                </>
            );
        case "ONLINE":
            return (
                <Link href={`/class/open/${classId}/student/join/detail/${idx}`}>
                    <Button
                        content={"영상보기"}
                        backgroundColor="yellow_accent"
                        fontSize="smaller"
                        color="white"
                        alignment="center"
                        size="small"
                        type="SQUARE"
                    />
                </Link>
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
                        <TableRow week={it.week + "주차"} weekTitle={it.title}>
                            <div style={{ width: "90px", marginRight: "20px" }}>
                                <ClassTypeBtn
                                    type={it.type}
                                    idx={it.id}
                                    classId={lectureId.class_id}
                                    link={it.link}
                                    time={it.date}
                                ></ClassTypeBtn>
                            </div>
                        </TableRow>
                    </div>
                ))}
            </TableWrapper>
        </div>
    );
};
export default StudentClassPlanList;
