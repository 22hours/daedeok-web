import style from "./TutorClassPlanList.module.scss";
import { meta_types } from "@global_types";
import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";
import Button from "@ui/buttons/Button";
import Link from "next/link";
import router from "next/router";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "store/AuthStore";
import { useClassDetailStore } from "store/ClassDetailStore";

type PlanType = {
    id: number;
    week: number;
    title: string;
    type: meta_types.classType;
};

const TutorClassPlanList = () => {
    const [planList, setPlanList] = useState<PlanType[]>([]);
    const classDetailState = useClassDetailStore();
    const { clientSideApi } = useAuthStore();

    const getPlanListData = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_FIND_PLAN", { lecture_id: classDetailState.class_id });
        if (res.result === "SUCCESS") {
            setPlanList(res.data);
        } else {
            alert(res.msg);
        }
    };
    useEffect(() => {
        if (classDetailState.class_id) {
            getPlanListData();
        }
    }, [classDetailState]);

    return (
        <div className={style.container}>
            <TableWrapper>
                {planList.map((it, idx) => {
                    return (
                        <TableRow key={`planlistitem:${idx}`} idx={`${it.week.toString()}주차`} title={it.title}>
                            <Link href={`${router.asPath}/detail/${it.id}`} passHref>
                                <Button
                                    type={"SQUARE"}
                                    size={"small"}
                                    fontSize={"smaller"}
                                    backgroundColor={"brown_base"}
                                    color={"white"}
                                    content={"출석관리"}
                                />
                            </Link>
                        </TableRow>
                    );
                })}
            </TableWrapper>
        </div>
    );
};

export default TutorClassPlanList;
