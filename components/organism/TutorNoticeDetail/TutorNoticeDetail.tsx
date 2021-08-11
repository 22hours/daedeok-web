import React, { useEffect, useState, useRef } from "react";
import style from "./TutorNoticeDetail.module.scss";
import { res_types } from "@global_types";
import dynamic from "next/dynamic";
import Link from "next/link";
//component
import Typo from "@ui/Typo";
import Button from "@ui/buttons/Button";
import { nanoid } from "nanoid";
import CommentList from "@ui/commentList/CommentList";
import TextArea from "@ui/input/TextArea";
import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";

//store
import { useAuthStore } from "store/AuthStore";
import DateController from "lib/client/dateController";

const TextViewer = dynamic(() => import("components/molecule/TextViewer/TextViewer"), { ssr: false });

type State = res_types.tutorNoticeDetail;

const TutorNoticeDetail = ({ noticeId }) => {
    const { auth, clientSideApi } = useAuthStore();
    const [noticeDetailData, setNoticeDetailData] = useState<State | null>(null);
    const newCommentRef = useRef<HTMLInputElement | null>(null);

    const commentDummy = {
        comment_list: [
            {
                id: 1,
                user_id: 1,
                author: "이정환",
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
    }, [noticeId]);

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
                        <div className={style.first_comment} key={nanoid()}>
                            <CommentList commentList={it} auth={auth} type={"first"} />
                            {it.children?.map((sub_it, idx) => (
                                <div className={style.second_comment} key={nanoid()}>
                                    <CommentList commentList={sub_it} auth={auth} type={"second"} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className={style.new_comment}>
                    <div>
                        <TextArea
                            placeholder={"댓글을 입력해주세요."}
                            maxLength={120}
                            className={style.commen_box_style}
                            //@ts-ignore
                            refs={newCommentRef}
                        />
                    </div>
                    <div className={style.new_comment_btn}>
                        <Button
                            type="SQUARE"
                            size="smaller"
                            fontSize="smaller"
                            backgroundColor="yellow_accent"
                            content="댓글작성"
                            color="white"
                            className={style.btn_style}
                        />
                    </div>
                </div>
                <div className={style.before_after_wrapper}>
                    <TableWrapper>
                        {noticeDetailData.after && (
                            <Link href={`/class/notice/detail/${noticeDetailData.after.id}`} passHref>
                                <TableRow
                                    icon={true}
                                    iconType={"after"}
                                    title={noticeDetailData.after?.title}
                                    date={DateController.getFormatedDate(
                                        "YYYY-MM-DD",
                                        noticeDetailData.after?.create_date
                                    )}
                                />
                            </Link>
                        )}
                        {noticeDetailData.before && (
                            <Link href={`/class/notice/detail/${noticeDetailData.before.id}`} passHref>
                                <TableRow
                                    icon={true}
                                    iconType={"before"}
                                    title={noticeDetailData.before?.title}
                                    date={DateController.getFormatedDate(
                                        "YYYY-MM-DD",
                                        noticeDetailData.before?.create_date
                                    )}
                                />
                            </Link>
                        )}
                    </TableWrapper>
                </div>
                <div className={style.bottom_btn_wrapper}>
                    {noticeDetailData?.user_id.toString() === auth?.user_id.toString() && (
                        <>
                            <Button
                                type="SQUARE"
                                size="smaller"
                                fontSize="smaller"
                                backgroundColor="gray_accent"
                                content="글삭제"
                                color="white"
                                className={style.bottom_btn_style}
                            />
                            <Link href={`/class/notice/edit/${noticeDetailData.id}`} passHref>
                                <Button
                                    type="SQUARE"
                                    size="smaller"
                                    fontSize="smaller"
                                    backgroundColor="yellow_accent"
                                    content="수정"
                                    color="white"
                                    className={style.bottom_btn_style}
                                />
                            </Link>
                        </>
                    )}
                    <Link href={"/class/notice"} passHref>
                        <Button
                            type="SQUARE"
                            size="smaller"
                            fontSize="smaller"
                            backgroundColor="yellow_accent"
                            content="목록보기"
                            color="white"
                            className={style.bottom_btn_style}
                        />
                    </Link>
                </div>
            </div>
        );
    }
};
export default TutorNoticeDetail;
