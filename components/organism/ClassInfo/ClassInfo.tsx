import { meta_types } from "@global_types";
import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";
import Button from "@ui/buttons/Button";
import Typo from "@ui/Typo";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "store/AuthStore";
import { useClassDetailStore } from "store/ClassDetailStore";
import style from "./ClassInfo.module.scss";
type Props = {};

type HandoutItem = { id: string; name: string; url: string };

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
    );
};

const dummyHandout = [
    {
        id: 3,
        name: "aaaa.png",
        url: "https://daedeok.s3.ap-northeast-2.amazonaws.com/handout/J1yfes7Hwnyysi1eCqkv.png",
    },
    {
        id: 3,
        name: "aaaa.png",
        url: "https://daedeok.s3.ap-northeast-2.amazonaws.com/handout/J1yfes7Hwnyysi1eCqkv.png",
    },
    {
        id: 3,
        name: "aaaa.png",
        url: "https://daedeok.s3.ap-northeast-2.amazonaws.com/handout/J1yfes7Hwnyysi1eCqkv.png",
    },
    {
        id: 3,
        name: "aaaa.png",
        url: "https://daedeok.s3.ap-northeast-2.amazonaws.com/handout/J1yfes7Hwnyysi1eCqkv.png",
    },
];

type LecturePlanItem = {
    id: string;
    week: string;
    title: string;
    location: string;
    type: meta_types.classType;
    date: string;
};

const LecturePlanItem = (props: LecturePlanItem) => {
    return (
        <TableRow week={props.week} weekTitle={props.title} date={props.date}>
            <div>
                <Typo
                    className={style.lecture_plan_children}
                    type={"TEXT"}
                    size={"small"}
                    content={"강사 TODO"}
                    color={"gray_accent"}
                />
                <Typo
                    className={style.lecture_plan_children}
                    type={"TEXT"}
                    size={"small"}
                    content={props.location}
                    color={"gray_accent"}
                />
            </div>
        </TableRow>
    );
    // return <div className={style.lecture_plan_item}>{props.title}</div>;
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
                    {lecture_plan_list.map((it, idx) => (
                        <LecturePlanItem key={`lectureplanitem:${idx}`} {...it} />
                    ))}
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

    const [state, setState] = useState<State | null>(null);
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
            </div>
        );
    }
};

export default ClassInfo;
