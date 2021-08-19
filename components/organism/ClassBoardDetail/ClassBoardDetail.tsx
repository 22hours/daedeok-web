import React, { useEffect, useState, useRef } from "react";
import style from "./ClassBoardDetail.module.scss";
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
import { useClassDetailStore } from "store/ClassDetailStore";
import { useAlert } from "store/GlobalAlertStore";
import { useConfirm } from "store/GlobalConfirmStore";
import CommentList from "../CommentList/CommentList";
import { useRouter } from "next/router";

const TextViewer = dynamic(() => import("components/molecule/TextViewer/TextViewer"), { ssr: false });

type State = res_types.classBoardDetail;

const ClassBoardDetail = () => {
    const router = useRouter();
    const { content_id } = router.query;
    const { auth, clientSideApi } = useAuthStore();
    const { class_id } = useClassDetailStore();
    const { apiErrorAlert, alertOn } = useAlert();
    const { confirmOn } = useConfirm();
    const [boardDetailData, setBoardDetailData] = useState<State | null>(null);
    useEffect(() => {
        getClassBoardDetail();
    }, [content_id]);

    //공지사항 상세 data
    const getClassBoardDetail = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_BOARD_DETAIL", {
            content_id: content_id,
        });
        if (res.result === "SUCCESS") {
            const data: State = res.data;
            setBoardDetailData(data);
        }
    };

    //detail 삭제
    const handleDelete = async () => {
        confirmOn({
            message: "삭제하시겠습니까?",
            onSuccess: async () => {
                const res = await clientSideApi("DELETE", "MAIN", "LECTURE_BOARD_DELETE", { content_id: content_id });
                if (res.result === "SUCCESS") {
                    alertOn({
                        title: "",
                        //@ts-ignore
                        message: "삭제되었습니다",
                        type: "POSITIVE",
                    });
                    location.replace(`/class/open/${class_id}/board`);
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

    //댓글 작성
    const newComment = async (content: string, parent_id?: string) => {
        if (content) {
            const res = await clientSideApi(
                "POST",
                "MAIN",
                "LECTURE_BOARD_NEW_COMMENT",
                { content_id: content_id },
                {
                    content: content,
                    parent_id: parent_id,
                }
            );
            if (res.result === "SUCCESS") {
                const new_comment_id = res.data;
                if (parent_id) {
                    // 대댓일때
                    if (boardDetailData) {
                        var newCommentList: res_types.classBoardDetail["comment_list"] =
                            boardDetailData?.comment_list?.slice();
                        const matchIdx = newCommentList?.findIndex((it) => it.id === parent_id);
                        //@ts-ignore
                        newCommentList[matchIdx]?.children.push({
                            id: new_comment_id,
                            // @ts-ignore
                            user_id: auth?.user_id,
                            // @ts-ignore
                            author: auth?.name,
                            content: content,
                            create_date: new Date().toString(),
                            children: [],
                        });
                        setBoardDetailData({
                            ...boardDetailData,
                            //@ts-ignore
                            comment_list: newCommentList,
                        });
                    }
                } else {
                    // 댓일때
                    if (boardDetailData) {
                        const newCommentList: res_types.classBoardDetail["comment_list"] =
                            //@ts-ignore
                            boardDetailData?.comment_list.slice();
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
                        setBoardDetailData({
                            ...boardDetailData,
                            //@ts-ignore
                            comment_list: newCommentList,
                        });
                    }
                }
                alertOn({
                    title: "",
                    //@ts-ignore
                    message: "댓글이 추가되었습니다",
                    type: "POSITIVE",
                });
            } else {
                alertOn({
                    title: "에러가 발생하였습니다",
                    //@ts-ignore
                    message: "다시 시도해주세요",
                    type: "ERROR",
                });
            }
        } else {
            alertOn({
                title: "",
                //@ts-ignore
                message: "댓글을 작성해주세요",
                type: "WARN",
            });
        }
    };

    const editComment = async (content: string, comment_id: string, parent_id?: string) => {
        if (content) {
            const res = await clientSideApi(
                "PUT",
                "MAIN",
                "LECTURE_BOARD_EDIT_COMMENT",
                { comment_id: comment_id },
                {
                    content: content,
                    parent_id: parent_id,
                }
            );
            if (res.result === "SUCCESS") {
                if (parent_id) {
                    // 대댓일때
                    if (boardDetailData) {
                        var newCommentList: res_types.classBoardDetail["comment_list"] =
                            boardDetailData?.comment_list?.slice();
                        const matchIdx = newCommentList?.findIndex((it) => it.id === parent_id);
                        const childMatchIdx = newCommentList[matchIdx].children.findIndex((it) => it.id === comment_id);
                        newCommentList[matchIdx].children[childMatchIdx].content = content;
                        newCommentList[matchIdx].children[childMatchIdx].create_date = new Date().toString();

                        setBoardDetailData({
                            ...boardDetailData,
                            //@ts-ignore
                            comment_list: newCommentList,
                        });
                    }
                } else {
                    // 댓일때
                    if (boardDetailData) {
                        const newCommentList: res_types.classBoardDetail["comment_list"] =
                            boardDetailData?.comment_list?.slice();
                        const matchIdx = newCommentList?.findIndex((it) => it.id === comment_id);
                        //@ts-ignore
                        newCommentList[matchIdx].content = content;
                        //@ts-ignore
                        newCommentList[matchIdx].create_date = new Date().toString();
                        setBoardDetailData({
                            ...boardDetailData,
                            //@ts-ignore
                            comment_list: newCommentList,
                        });
                    }
                }
                alertOn({
                    title: "",
                    //@ts-ignore
                    message: "수정되었습니다",
                    type: "POSITIVE",
                });
            } else {
                alertOn({
                    title: "에러가 발생하였습니다",
                    //@ts-ignore
                    message: "다시 시도해주세요",
                    type: "ERROR",
                });
            }
        } else {
            alertOn({
                title: "",
                //@ts-ignore
                message: "댓글을 작성해주세요",
                type: "WARN",
            });
        }
    };

    const deleteComment = async (comment_id: string, parent_id?: string) => {
        confirmOn({
            message: "삭제하시겠습니까?",
            onSuccess: async () => {
                const res = await clientSideApi(
                    "DELETE",
                    "MAIN",
                    "LECTURE_BOARD_DELETE_COMMENT",
                    { comment_id: comment_id },
                    undefined
                );
                if (res.result === "SUCCESS") {
                    if (parent_id) {
                        // 대댓일때
                        if (boardDetailData) {
                            var newCommentList: res_types.classBoardDetail["comment_list"] =
                                boardDetailData?.comment_list?.slice();
                            const matchIdx = newCommentList?.findIndex((it) => it.id === parent_id);
                            //@ts-ignore
                            const childMatchIdx = newCommentList[matchIdx].children.findIndex(
                                (it) => it.id === comment_id
                            );
                            //@ts-ignore
                            newCommentList[matchIdx].children.splice(childMatchIdx, 1);
                            setBoardDetailData({
                                ...boardDetailData,
                                //@ts-ignore
                                comment_list: newCommentList,
                            });
                        }
                    } else {
                        // 댓일때
                        if (boardDetailData) {
                            const newCommentList: res_types.classBoardDetail["comment_list"] =
                                boardDetailData?.comment_list.slice();
                            const matchIdx = newCommentList.findIndex((it) => it.id === comment_id);
                            newCommentList.splice(matchIdx, 1);
                            setBoardDetailData({
                                ...boardDetailData,
                                //@ts-ignore
                                comment_list: newCommentList,
                            });
                        }
                    }
                    alertOn({
                        title: "",
                        //@ts-ignore
                        message: "삭제되었습니다",
                        type: "POSITIVE",
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

    if (boardDetailData === null) {
        return <div>NOW LOAD</div>;
    } else {
        return (
            <div className={style.tutor_notice_detail}>
                <div className={style.header_title}>
                    <div>
                        <Typo
                            //@ts-ignore
                            content={boardDetailData?.title}
                            type="TEXT"
                            size="large"
                            className={style.header_margin}
                        />
                        <Typo content={`/ ${boardDetailData?.category}`} type="TEXT" size="small" color="gray_accent" />
                    </div>
                    <div>
                        <Typo
                            type="TEXT"
                            className={style.header_margin}
                            color={"gray_accent"}
                            size="small"
                            content={boardDetailData.author}
                        />
                        <Typo
                            type="TEXT"
                            color={"gray_accent"}
                            size="small"
                            className={style.header_margin}
                            content={DateController.getFormatedDate("YYYY/MM/DD", boardDetailData?.create_date)}
                        />
                        <Typo
                            type="TEXT"
                            color={"gray_accent"}
                            size="small"
                            content={`조회수 ${boardDetailData.view}`}
                        />
                    </div>
                </div>
                <div className={style.content}>
                    <TextViewer
                        //@ts-ignore
                        content={boardDetailData?.content}
                    />
                </div>
                <CommentList
                    //@ts-ignore
                    commentList={boardDetailData.comment_list}
                    newComment={newComment}
                    editComment={editComment}
                    deleteComment={deleteComment}
                />

                <div className={style.before_after_wrapper}>
                    <TableWrapper>
                        {boardDetailData.after && (
                            <Link href={`/class/open/${class_id}/board/detail/${boardDetailData.after.id}`} passHref>
                                <TableRow
                                    icon={true}
                                    iconType={"after"}
                                    title={boardDetailData.after?.title}
                                    category={boardDetailData.after?.category}
                                    author={boardDetailData.after?.author}
                                    date={DateController.getFormatedDate(
                                        "YYYY-MM-DD",
                                        boardDetailData.after?.create_date
                                    )}
                                />
                            </Link>
                        )}
                        {boardDetailData.before && (
                            <Link href={`/class/open/${class_id}/board/detail/${boardDetailData.before.id}`} passHref>
                                <TableRow
                                    icon={true}
                                    iconType={"before"}
                                    title={boardDetailData.before?.title}
                                    category={boardDetailData.after?.category}
                                    author={boardDetailData.after?.author}
                                    date={DateController.getFormatedDate(
                                        "YYYY-MM-DD",
                                        boardDetailData.before?.create_date
                                    )}
                                />
                            </Link>
                        )}
                    </TableWrapper>
                </div>
                <div className={style.bottom_btn_wrapper}>
                    {boardDetailData?.user_id.toString() === auth?.user_id.toString() && (
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
                            <Link href={`/class/open/${class_id}/board/edit/${boardDetailData.id}`} passHref>
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
                    <Link href={`/class/open/${class_id}/board`} passHref>
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
export default ClassBoardDetail;
