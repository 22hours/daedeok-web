import React, { useEffect, useState, useRef } from "react";
import style from "./TutorNoticeDetail.module.scss";
import { res_types } from "@global_types";
import dynamic from "next/dynamic";
import Link from "next/link";
//component
import Typo from "@ui/Typo";
import Button from "@ui/buttons/Button";
import { nanoid } from "nanoid";
import TextArea from "@ui/input/TextArea";
import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";
//controller
import DateController from "lib/client/dateController";

//store
import { useAuthStore } from "store/AuthStore";
import CommentList from "../CommentList/CommentList";

const comment_list_dummy = [
    {
        id: 1,
        user_id: 1,
        author: "author",
        content: "content",
        create_date: "2021-08-06T16:23:58.025",
        children: [
            {
                id: 2,
                user_id: 1,
                author: "author",
                content: "content",
                create_date: "2021-08-06T16:23:58.025",
                children: null,
            },
            {
                id: 3,
                user_id: 1,
                author: "author",
                content: "content",
                create_date: "2021-08-06T16:23:58.025",
                children: null,
            },
        ],
    },
    {
        id: 4,
        user_id: 1,
        author: "author",
        content: "content",
        create_date: "2021-08-06T16:23:58.025",
        children: [
            {
                id: 5,
                user_id: 1,
                author: "author",
                content: "content",
                create_date: "2021-08-06T16:23:58.025",
                children: null,
            },
            {
                id: 6,
                user_id: 1,
                author: "author",
                content: "content",
                create_date: "2021-08-06T16:23:58.025",
                children: null,
            },
        ],
    },
];
const TextViewer = dynamic(() => import("components/molecule/TextViewer/TextViewer"), { ssr: false });

type State = res_types.tutorNoticeDetail;

const TutorNoticeDetail = ({ noticeId }) => {
    const { auth, clientSideApi } = useAuthStore();
    const [noticeDetailData, setNoticeDetailData] = useState<State | null>(null);

    useEffect(() => {
        getTutorNotieDetail();
    }, [noticeId]);

    //공지사항 상세 data
    const getTutorNotieDetail = async () => {
        const res = await clientSideApi("GET", "MAIN", "TUTOR_NOTICE_FIND_DETAIL", {
            notice_id: noticeId,
        });
        if (res.result === "SUCCESS") {
            const data: State = res.data;
            setNoticeDetailData(data);
        }
    };

    //댓글 작성
    const newComment = async (content: string, parent_id?: string) => {
        if (content) {
            const res = await clientSideApi(
                "POST",
                "MAIN",
                "TUTOR_NOTICE_NEW_COMMENT",
                { notice_id: noticeId },
                {
                    content: content,
                    parent_id: parent_id,
                }
            );
            if (res.result === "SUCCESS") {
                console.log(res.data);
                const new_comment_id = res.data;

                if (parent_id) {
                    // 대댓일때
                    if (noticeDetailData) {
                        var newCommentList: res_types.tutorNoticeDetail["comment_list"] = noticeDetailData?.comment_list.slice();
                        const matchIdx = newCommentList.findIndex((it) => it.id === parent_id);
                        newCommentList[matchIdx].children.push({
                            id: new_comment_id,
                            // @ts-ignore
                            user_id: auth?.user_id,
                            // @ts-ignore
                            author: auth?.name,
                            content: content,
                            create_date: new Date().toString(),
                            children: [],
                        });
                        setNoticeDetailData({
                            ...noticeDetailData,
                            //@ts-ignore
                            comment_list: newCommentList,
                        });
                    }
                } else {
                    // 댓일때
                    if (noticeDetailData) {
                        const newCommentList: res_types.tutorNoticeDetail["comment_list"] = noticeDetailData?.comment_list.slice();
                        newCommentList.push({
                            id: new_comment_id,
                            // @ts-ignore
                            user_id: auth?.user_id,
                            // @ts-ignore
                            author: auth?.name,
                            content: content,
                            create_date: new Date().toString(),
                            children: [],
                        });
                        setNoticeDetailData({
                            ...noticeDetailData,
                            //@ts-ignore
                            comment_list: newCommentList,
                        });
                    }
                }
                alert("댓글이 추가되었습니다.");
            } else {
                alert("다시 시도해주세요.");
            }
        } else {
            alert("댓글을 작성해주세요.");
        }
    };

    const editComment = async (content: string, comment_id: string, parent_id?: string) => {
        const res = await clientSideApi(
            "PUT",
            "MAIN",
            "TUTOR_NOTICE_EDIT_COMMENT",
            { comment_id: comment_id },
            {
                content: content,
                parent_id: parent_id,
            }
        );
        if (res.result === "SUCCESS") {
        } else {
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
                <CommentList
                    //@ts-ignore
                    commentList={noticeDetailData.comment_list}
                    newComment={newComment}
                    editComment={editComment}
                />

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
