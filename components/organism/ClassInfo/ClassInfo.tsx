import { meta_types } from "@global_types";
import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";
import Button from "@ui/buttons/Button";
import Typo from "@ui/Typo";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "store/AuthStore";
import { useClassDetailStore } from "store/ClassDetailStore";
import style from "./ClassInfo.module.scss";
import { useAlert } from "store/GlobalAlertStore";
import { useConfirm } from "store/GlobalConfirmStore";
import { useRouter } from "next/router";
import LecturePlanItem from "components/organism/LecturePlanItem/LecturePlanItem";

//controller
import DateController from "lib/client/dateController";

type HandoutItem = { id: string; name: string; url: string };
type LecturePlanItem = {
    id: string;
    week: string;
    title: string;
    location: string;
    type: meta_types.classType;
    date: string;
    tutor: string;
};
// HANDOUT
const HandoutItem = (props: HandoutItem) => {
    return (
        <div className={style.handout_item_container}>
            <Typo type={"TEXT"} size={"small"} content={props.name} />
            <a href={props.url} target="_blank" rel="noreferrer">
                <Button
                    className={style.handout_item_download_btn}
                    type={"SQUARE"}
                    size={"free"}
                    fontSize={"smaller"}
                    content={"다운로드"}
                    backgroundColor={"brown_base"}
                    color={"white"}
                />
            </a>
        </div>
    );
};
const HandoutSection = ({ handout_list }: { handout_list: State["handout_list"] }) => {
    return (
        <>
            {handout_list.length !== 0 && (
                <div className={style.handout_row}>
                    <div>
                        <Typo
                            className={style.head_block_text}
                            type={"TEXT"}
                            size={"small"}
                            content={"강의자료 받기"}
                            color={"white"}
                        />
                    </div>
                    <div className={style.handout_list_col}>
                        {handout_list.map((it: HandoutItem, idx: number) => (
                            <HandoutItem key={`handoutitem:${idx}`} {...it} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

const LecturePlanSection = ({ lecture_plan_list }: { lecture_plan_list: LecturePlanItem[] }) => {
    return (
        <div className={style.lecture_plan_row}>
            <div>
                <Typo
                    className={style.head_block_text}
                    type={"TEXT"}
                    size={"small"}
                    content={"강의계획"}
                    color={"white"}
                />
            </div>
            <div className={style.lecture_plan_list_container}>
                <TableWrapper>
                    <LecturePlanItem
                        //@ts-ignore
                        lecture_plan={lecture_plan_list}
                        type={"class"}
                    />
                </TableWrapper>
            </div>
        </div>
    );
};

type State = {
    handout_list: HandoutItem[];
    lecture_plan_list: LecturePlanItem[];
};

const ClassInfo = () => {
    const { clientSideApi } = useAuthStore();
    const classDetailState = useClassDetailStore();
    const { alertOn } = useAlert();
    const { confirmOn } = useConfirm();
    const [state, setState] = useState<State | null>(null);
    const router = useRouter();
    const { status, class_id } = router.query;
    //강의삭제
    const handleDelete = async () => {
        confirmOn({
            message: "정말 철회하시겠습니까?",
            onSuccess: async () => {
                const res = await clientSideApi(
                    "DELETE",
                    "MAIN",
                    "LECTURE_CANCEL",
                    { lecture_id: class_id },
                    undefined
                );
                if (res.result === "SUCCESS") {
                    confirmOn({
                        message: "강의가 철회되었습니다\n확인을 클릭하면 강의실 메인으로 이동합니다",
                        onSuccess: () => location.replace("/class"),
                        isFailButtonRemove: true,
                    });
                } else {
                    alertOn({
                        title: "에러가 발생하였습니다",
                        //@ts-ignore
                        message: "다시 시도해주세요",
                        type: "ERROR",
                    });
                }
            },
        });
    };

    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_DETAIL_HANDOUT", {
            lecture_id: classDetailState.class_id,
        });
        if (res.result === "SUCCESS") {
            setState(res.data);
        } else {
            alert(res.msg);
        }
    };

    useEffect(() => {
        if (classDetailState.class_id) {
            getData();
        }
    }, [classDetailState]);

    if (state === null) {
        return <div>LOAD</div>;
    } else {
        return (
            <div className={style.container}>
                <HandoutSection handout_list={state.handout_list} />
                <LecturePlanSection lecture_plan_list={state.lecture_plan_list} />

                <div className={style.submit_row}>
                    <Button
                        className={style.submit_btn}
                        type="SQUARE"
                        size="small"
                        fontSize="smaller"
                        line="inline"
                        backgroundColor="brown_base"
                        color="white"
                        content={"강의철회"}
                        alignment="center"
                        onClick={handleDelete}
                    />
                </div>
            </div>
        );
    }
};

export default ClassInfo;
