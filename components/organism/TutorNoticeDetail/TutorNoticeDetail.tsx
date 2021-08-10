import React, { useEffect, useState } from "react";
import style from "./TutorNoticeDetail.module.scss";
import { res_types } from "@global_types";
import dynamic from "next/dynamic";
import Link from "next/link";
//component
import Typo from "@ui/Typo";
import { nanoid } from "nanoid";
//store
import { useAuthStore } from "store/AuthStore";
import DateController from "lib/client/dateController";

const TextViewer = dynamic(() => import("components/molecule/TextViewer/TextViewer"), { ssr: false });

type State = res_types.tutorNoticeDetail;

const TutorNoticeDetail = ({ noticeId }) => {
    const { auth, clientSideApi } = useAuthStore();
    const [noticeDetailData, setNoticeDetailData] = useState<State | null>(null);
    console.log(auth);
    const commentDummy = {
        comment_list: [
            {
                id: 1,
                user_id: 1,
                author: "이정환",
                content: "댓글테스트입니다댓글테스트입니다댓글테스트입니다댓글테스트입니다",
                create_date: "2021-08-06T16:23:58.025",
                children: null,
            },
            {
                id: 2,
                user_id: 2,
                author: "신다민",
                content: "댓글테스트입니다댓글테스트입니다댓글테스트입니다댓글테스트입니다",
                create_date: "2021-08-06T16:23:58.025",
                children: [
                    {
                        id: 2,
                        user_id: 2,
                        author: "김효빈",
                        content: "댓글테스트입니다댓글테스트입니다댓글테스트입니다댓글테스트입니다",
                        create_date: "2021-08-06T16:23:58.025",
                        children: null,
                    },
                ],
            },
            {
                id: 3,
                user_id: 1,
                author: "이종원",
                content: "댓글테스트입니다댓글테스트입니다댓글테스트입니다댓글테스트입니다",
                create_date: "2021-08-06T16:23:58.025",
                children: null,
            },
        ],
    };

    useEffect(() => {
        getTutorNotieDetail();
    }, []);

    const getTutorNotieDetail = async () => {
        const res = await clientSideApi("GET", "MAIN", "TUTOR_NOTICE_FIND_DETAIL", {
            notice_id: noticeId,
        });
        if (res.result === "SUCCESS") {
            const data = res.data;
            setNoticeDetailData(data);
        }
    };

    if (noticeDetailData === null) {
        return <div>NOW LOAD</div>;
    } else {
        return (
            <div className={style.tutor_notice_detail}>
                <div className={style.header_title}>
                    <Typo
                        //@ts-ignore
                        content={noticeDetailData?.title}
                        type="TEXT"
                        size="large"
                    />
                    <Typo
                        type="TEXT"
                        color={"gray_accent"}
                        size="small"
                        content={DateController.getFormatedDate("YYYY/MM/DD", noticeDetailData?.create_date)}
                    />
                </div>
                <div className={style.content}>
                    <TextViewer
                        //@ts-ignore
                        content={noticeDetailData?.content}
                    />
                </div>
                <div className={style.comment_list}>
                    {commentDummy?.comment_list?.map((it, idx) => (
                        <div key={nanoid()} className={style.first_comment}>
                            <div className={style.comment_header}>
                                <div>
                                    <Typo
                                        type={"TEXT"}
                                        content={it.author}
                                        size={"small"}
                                        color={"brown_font"}
                                        className={style.margin}
                                    />
                                    <Typo
                                        type={"TEXT"}
                                        content={DateController.getFormatedDate("YYYY/MM/DD", it?.create_date)}
                                        size={"smaller"}
                                        color={"gray_accent"}
                                    />
                                </div>
                                <div>
                                    <Typo type={"TEXT"} content={"댓글"} size={"smaller"} color={"gray_accent"} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};
export default TutorNoticeDetail;
