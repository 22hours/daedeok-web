import React, { useState, useEffect } from "react";
import TableRow from "@ui/board/TableRow";
import Button from "@ui/buttons/Button";
import TableWrapper from "@ui/board/TableWrapper";
import style from "./StudentClassPlanList.module.scss";
import Link from "next/link";
//store
import { useAuthStore } from "store/AuthStore";
import { useClassDetailStore } from "store/ClassDetailStore";

const ClassTypeBtn = ({ type, idx, classId }) => {
    switch (type) {
        case "ZOOM":
            return (
                <Button
                    content={"ZOOM"}
                    backgroundColor="red_accent"
                    fontSize="smaller"
                    color="white"
                    alignment="center"
                    size="small"
                    line="inline"
                    type="SQUARE"
                    onClick={() => {
                        console.log("줌링크 넣어야함");
                    }}
                />
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
    const [planList, setPlanList] = useState<Array<{ id: number; week: number; title: string; type: string }>>([]);
    const { clientSideApi } = useAuthStore();
    const lectureId = useClassDetailStore();

    useEffect(() => {
        if (lectureId.class_id) {
            getClassPlanList();
        }
    }, [lectureId]);

    const getClassPlanList = async () => {
        const res_data = await clientSideApi(
            "GET",
            "MAIN",
            "LECTUER_PLAN_LIST",
            { lecture_id: lectureId.class_id },
            { lecture_idx: lectureId.class_id }
        );
        if (res_data.result === "SUCCESS") {
            var data = res_data.data;
            setPlanList(data);
        }
    };

    return (
        <div className={style.class_plan_list_wrapper}>
            <TableWrapper>
                {planList.map((it, idx) => (
                    <div key={idx}>
                        <TableRow idx={it.week + "주차"} title={it.title}>
                            <div style={{ width: "90px", marginRight: "20px" }}>
                                <ClassTypeBtn type={it.type} idx={it.id} classId={lectureId.class_id}></ClassTypeBtn>
                            </div>
                        </TableRow>
                    </div>
                ))}
            </TableWrapper>
        </div>
    );
};
export default StudentClassPlanList;
