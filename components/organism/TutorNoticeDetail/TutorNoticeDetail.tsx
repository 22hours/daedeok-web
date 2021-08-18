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
import { useRouter } from "next/router";

const TextViewer = dynamic(() => import("components/molecule/TextViewer/TextViewer"), { ssr: false });

type State = res_types.tutorNoticeDetail;

const TutorNoticeDetail = () => {
    const router = useRouter();
    const { notice_id } = router.query;
    const { auth, clientSideApi } = useAuthStore();
    const [noticeDetailData, setNoticeDetailData] = useState<State | null>(null);

    //공지사항 상세 data
    const getTutorNotieDetail = async () => {
        const res = await clientSideApi("GET", "MAIN", "TUTOR_NOTICE_FIND_DETAIL", {
            notice_id: notice_id,
        });
        if (res.result === "SUCCESS") {
            const data: State = res.data;
            setNoticeDetailData(data);
        }
    };

    useEffect(() => {
        if (auth !== null) {
            getTutorNotieDetail();
        }
    }, [auth]);
    //공지사항 삭제
    const handleDelete = async () => {
        const flag = confirm("삭제하시겠습니까?");
        if (flag) {
            const res = await clientSideApi("DELETE", "MAIN", "TUTOR_NOTICE_DELETE", notice_id);
            if (res.result === "SUCCESS") {
                alert("삭제되었습니다.");
                location.replace("/class/notice");
            } else {
                alert("다시 시도해주세요");
            }
        }
    };

    //댓글 작성
    const newComment = async (content: string, parent_id?: string) => {
        if (content) {
            const res = await clientSideApi(
                "POST",
                "MAIN",
                "TUTOR_NOTICE_NEW_COMMENT",
                { notice_id: notice_id },
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
            if (parent_id) {
                // 대댓일때
                if (noticeDetailData) {
                    var newCommentList: res_types.tutorNoticeDetail["comment_list"] = noticeDetailData?.comment_list.slice();
                    const matchIdx = newCommentList.findIndex((it) => it.id === parent_id);
                    const childMatchIdx = newCommentList[matchIdx].children.findIndex((it) => it.id === comment_id);
                    newCommentList[matchIdx].children[childMatchIdx].content = content;
                    newCommentList[matchIdx].children[childMatchIdx].create_date = new Date().toString();

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
                    const matchIdx = newCommentList.findIndex((it) => it.id === comment_id);
                    newCommentList[matchIdx].content = content;
                    newCommentList[matchIdx].create_date = new Date().toString();
                    setNoticeDetailData({
                        ...noticeDetailData,
                        //@ts-ignore
                        comment_list: newCommentList,
                    });
                }
            }
            alert("수정되었습니다.");
        } else {
            alert("다시 시도해주세요.");
        }
    };

    const deleteComment = async (comment_id: string, parent_id?: string) => {
        const flag = confirm("삭제하시겠습니까?");
        if (flag) {
            const res = await clientSideApi("DELETE", "MAIN", "TUTOR_NOTICE_DELETE_COMMENT", comment_id, undefined);
            console.log(comment_id);
            if (res.result === "SUCCESS") {
                if (parent_id) {
                    // 대댓일때
                    if (noticeDetailData) {
                        var newCommentList: res_types.tutorNoticeDetail["comment_list"] = noticeDetailData?.comment_list.slice();
                        const matchIdx = newCommentList.findIndex((it) => it.id === parent_id);
                        const childMatchIdx = newCommentList[matchIdx].children.findIndex((it) => it.id === comment_id);
                        newCommentList[matchIdx].children.splice(childMatchIdx, 1);

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
                        const matchIdx = newCommentList.findIndex((it) => it.id === comment_id);
                        newCommentList.splice(matchIdx, 1);
                        setNoticeDetailData({
                            ...noticeDetailData,
                            //@ts-ignore
                            comment_list: newCommentList,
                        });
                    }
                }
                alert("삭제되었습니다.");
            } else {
                alert("다시 시도해주세요.");
            }
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
                    deleteComment={deleteComment}
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
                                onClick={handleDelete}
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
