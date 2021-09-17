import React, { useEffect, useState } from "react";
import style from "./ClassJoinDetailList.module.scss";
import { res_types } from "@global_types";
import Link from "next/link";
import { meta_types } from "@global_types";

//ui
import Typo from "@ui/Typo";
import Button from "@ui/buttons/Button";
import TableWrapper from "@ui/board/TableWrapper";
import TableRow from "@ui/board/TableRow";

//hooks
import UseDate from "lib/hooks/useDate";
import { nanoid } from "nanoid";
import DateController from "lib/client/dateController";

//store
import { useAuthStore } from "store/AuthStore";
import { useRouter } from "next/router";

type LecturePlanItem = {
    id: string;
    week: string;
    title: string;
    location: string;
    type: meta_types.classType;
    date: string;
    tutor: string;
};

const LecturePlanItem = (props: LecturePlanItem) => {
    return (
        <TableRow
            week={props.week + "주차"}
            weekTitle={props.title}
            date={`${DateController.getFormatedDate("YYYY/MM/DD HH:MM", props.date)}`}
        >
            <div>
                <Typo
                    className={style.lecture_plan_children}
                    type={"TEXT"}
                    size={"small"}
                    content={props.tutor}
                    color={"gray_accent"}
                />
                <Typo
                    className={style.lecture_plan_children}
                    type={"TEXT"}
                    size={"small"}
                    content={
                        props.location === "ZOOM" ? "ZOOM" : props.location === "ONLINE" ? "영상강의" : props.location
                    }
                    color={"gray_accent"}
                />
            </div>
        </TableRow>
    );
};

const ClassJoinDetailList = () => {
    const { clientSideApi } = useAuthStore();
    const router = useRouter();
    const [detailData, setDetailData] = useState<res_types.classDetail>();
    const [classType, setClassType] = useState<Array<string>>();
    const { class_id } = router.query;

    const ListForm = ({ label, content }) => {
        return (
            <div>
                {label === "대상" ? (
                    <div className={style.list_item}>
                        <div className={style.label}>
                            <Typo size="normal" content={label} color="white" type="TEXT" />
                        </div>
                        {content?.length === 0 ? (
                            <div className={style.list_content}>
                                <div key={nanoid()} className={style.division}>
                                    <Typo size="normal" content={"전체"} type="TEXT" className={style.content} />
                                </div>
                            </div>
                        ) : (
                            <div className={style.list_content}>
                                {content?.map((it, idx) => (
                                    <div key={nanoid()} className={style.division}>
                                        <Typo
                                            size="normal"
                                            content={it.first_division + " " + it.second_division}
                                            type="TEXT"
                                            className={style.content}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={style.list_item}>
                        <div className={style.label}>
                            <Typo size="normal" content={label} color="white" type="TEXT" />
                        </div>
                        {label === "강의계획" ? (
                            <></>
                        ) : (
                            <div className={style.list_content}>
                                <Typo size="normal" content={content} type="TEXT" className={style.content} />
                            </div>
                        )}
                    </div>
                )}
            </div>
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
                        {lecture_plan_list?.map((it, idx) => (
                            <LecturePlanItem key={`classjoindetaillistitem:${idx}`} {...it} />
                        ))}
                    </TableWrapper>
                </div>
            </div>
        );
    };
    const getClassJoinDetailData = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_DETAIL", { lecture_id: class_id }, {});
        if (res.result === "SUCCESS") {
            var data = res.data;
            setDetailData(data);
        }
    };

    useEffect(() => {
        getClassJoinDetailData();
    }, [class_id]);

    useEffect(() => {
        if (detailData?.type) {
            UpdateArray(detailData?.type, "OFFLINE", "오프라인 강의", "ONLINE", "영상 강의");
        }
    }, [detailData]);

    const UpdateArray = (changeArray, oldValue1, newValue1, oldValue2, newValue2) => {
        var new_classType = changeArray?.slice();
        const idx1 = new_classType?.indexOf(oldValue1);
        const idx2 = new_classType?.indexOf(oldValue2);
        if (idx1 !== -1) {
            //@ts-ignore
            new_classType[idx1] = newValue1;
        }
        if (idx2 !== -1) {
            //@ts-ignore
            new_classType[idx2] = newValue2;
        }
        setClassType(new_classType);
    };

    return (
        <div>
            <div className={style.detail_header}>
                <div>
                    <Typo
                        type="TEXT"
                        size="large"
                        //@ts-ignore
                        content={detailData?.title}
                    />
                </div>
                <div>
                    <Typo
                        type="TEXT"
                        size="small"
                        color="red_accent"
                        //@ts-ignore
                        content={detailData?.category}
                        className={style.detail_category}
                    />
                    <Typo
                        type="TEXT"
                        size="small"
                        color="gray_accent"
                        //@ts-ignore
                        content={
                            UseDate(
                                "YYYY/MM/DD",
                                //@ts-ignore
                                detailData?.start_date
                            ) +
                            " ~ " +
                            UseDate(
                                "YYYY/MM/DD",
                                //@ts-ignore
                                detailData?.end_date
                            )
                        }
                        className={style.detail_date}
                    />
                    <Typo
                        type="TEXT"
                        size="small"
                        color="gray_accent"
                        //@ts-ignore
                        content={`수강인원 ${detailData?.student_num}/${
                            detailData?.student_limit === -1 ? "무제한" : detailData?.student_limit
                        }`}
                        className={style.detail_limit}
                    />
                </div>
            </div>
            <div className={style.detail_content}>
                <Typo
                    type="TEXT"
                    size="medium"
                    //@ts-ignore
                    content={detailData?.content}
                />
            </div>
            <div className={style.detail_list}>
                <ListForm label={"강사"} content={detailData?.tutor} />
                <ListForm
                    label={"정원"}
                    content={
                        detailData?.student_limit === -1
                            ? "무제한"
                            : detailData?.student_limit + " (선착순 신청 후 마감)"
                    }
                />
                <ListForm label={"강의형태"} content={classType?.join(" - ")} />
                <ListForm
                    label={"대상"}
                    //@ts-ignore
                    content={detailData?.division_list}
                />
                <ListForm label={"요일"} content={detailData?.day} />
                <ListForm label={"시간"} content={detailData?.time} />
                <ListForm label={"참고자료"} content={detailData?.reference} />
                <ListForm label={"강의계획"} content={detailData?.reference} />
            </div>
            <LecturePlanSection
                //@ts-ignore
                lecture_plan_list={detailData?.lecture_plan}
            />
            <div className={style.go_back_btn_wrapper}>
                <Link href="/class/join" passHref>
                    <Button
                        type="SQUARE"
                        content={"목록보기"}
                        backgroundColor="yellow_accent"
                        color="white"
                        size="small"
                        fontSize="small"
                        className={style.go_back_btn}
                    />
                </Link>
            </div>
        </div>
    );
};

export default ClassJoinDetailList;
