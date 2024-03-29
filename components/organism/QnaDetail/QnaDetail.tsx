import React, { useEffect, useState, useRef } from "react";
import style from "./QnaDetail.module.scss";
import { res_types } from "@global_types";
import dynamic from "next/dynamic";
import Link from "next/link";
//component
import Typo from "@ui/Typo";
import Button from "@ui/buttons/Button";
import TextArea from "@ui/input/TextArea";
import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";
//controller
import DateController from "lib/client/dateController";

//store
import { useAuthStore } from "store/AuthStore";
import CommentList from "../CommentList/CommentList";
import { useRouter } from "next/router";
import { useAlert } from "store/GlobalAlertStore";
import { useConfirm } from "store/GlobalConfirmStore";
import CookieController from "lib/client/cookieController";
const TextViewer = dynamic(() => import("components/molecule/TextViewer/TextViewer"), { ssr: false });

type State = res_types.qnaDetailList;

const QnaDetail = ({ articleId }) => {
    const router = useRouter();

    const { alertOn, apiErrorAlert } = useAlert();
    const { confirmOn } = useConfirm();

    const { article_id } = router.query;
    const { auth, clientSideApi } = useAuthStore();
    const [qnaDetailData, setQnaDetailData] = useState<State | null>(null);

    useEffect(() => {
        if (article_id) {
            const token = CookieController.getTokenInCookie();
            if (token?.access_token) {
                if (auth !== null) {
                    getQnaDetail();
                }
            } else {
                getQnaDetail();
            }
        }
    }, [auth, article_id]);

    const getQnaDetail = async () => {
        const res = await clientSideApi("GET", "MAIN", "QNA_FIND_DETAIL", {
            article_id: article_id,
        });
        if (res.result === "SUCCESS") {
            const data: State = res.data;
            setQnaDetailData(data);
        } else {
            confirmOn({
                message: "열람할 수 없는 글 입니다\n확인을 클릭하시면 이전 페이지로 돌아갑니다",
                onSuccess: () => router.back(),
                isFailButtonRemove: true,
            });
        }
    };

    //공지사항 삭제
    const handleDelete = async () => {
        confirmOn({
            message: "삭제하시겠습니까?",
            onSuccess: async () => {
                const res = await clientSideApi("DELETE", "MAIN", "QNA_DELETE", { article_id: articleId });
                if (res.result === "SUCCESS") {
                    confirmOn({
                        message: "삭제되었습니다",
                        onSuccess: () => router.replace("/acinfo/qna"),
                        isFailButtonRemove: true,
                    });
                } else {
                    apiErrorAlert(res.msg);
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
                "QNA_COMMENT_SAVE",
                { article_id: article_id },
                {
                    content: content,
                    parent_id: parent_id,
                }
            );
            if (res.result === "SUCCESS") {
                const new_comment_id = res.data;
                if (parent_id) {
                    // 대댓일때
                    if (qnaDetailData) {
                        var newCommentList: res_types.qnaDetailList["comment_list"] =
                            qnaDetailData?.comment_list.slice();
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
                        setQnaDetailData({
                            ...qnaDetailData,
                            //@ts-ignore
                            comment_list: newCommentList,
                        });
                    }
                } else {
                    // 댓일때
                    if (qnaDetailData) {
                        const newCommentList: res_types.qnaDetailList["comment_list"] =
                            qnaDetailData?.comment_list.slice();
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
                        setQnaDetailData({
                            ...qnaDetailData,
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
                apiErrorAlert(res.msg);
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
                "QNA_UPDATE_COMMENT",
                { comment_id: comment_id },
                {
                    content: content,
                    parent_id: parent_id,
                }
            );
            if (res.result === "SUCCESS") {
                if (parent_id) {
                    // 대댓일때
                    if (qnaDetailData) {
                        var newCommentList: res_types.qnaDetailList["comment_list"] =
                            qnaDetailData?.comment_list.slice();
                        const matchIdx = newCommentList.findIndex((it) => it.id === parent_id);
                        const childMatchIdx = newCommentList[matchIdx].children.findIndex((it) => it.id === comment_id);
                        newCommentList[matchIdx].children[childMatchIdx].content = content;
                        newCommentList[matchIdx].children[childMatchIdx].create_date = new Date().toString();
                        setQnaDetailData({
                            ...qnaDetailData,
                            //@ts-ignore
                            comment_list: newCommentList,
                        });
                    }
                } else {
                    // 댓일때
                    if (qnaDetailData) {
                        const newCommentList: res_types.qnaDetailList["comment_list"] =
                            qnaDetailData?.comment_list.slice();
                        const matchIdx = newCommentList.findIndex((it) => it.id === comment_id);
                        newCommentList[matchIdx].content = content;
                        newCommentList[matchIdx].create_date = new Date().toString();
                        setQnaDetailData({
                            ...qnaDetailData,
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
                apiErrorAlert(res.msg);
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
                    "QNA_DELETE_COMMENT",
                    { comment_id: comment_id },
                    undefined
                );
                if (res.result === "SUCCESS") {
                    if (parent_id) {
                        // 대댓일때
                        if (qnaDetailData) {
                            var newCommentList: res_types.qnaDetailList["comment_list"] =
                                qnaDetailData?.comment_list.slice();
                            const matchIdx = newCommentList.findIndex((it) => it.id === parent_id);
                            const childMatchIdx = newCommentList[matchIdx].children.findIndex(
                                (it) => it.id === comment_id
                            );
                            newCommentList[matchIdx].children.splice(childMatchIdx, 1);
                            setQnaDetailData({
                                ...qnaDetailData,
                                //@ts-ignore
                                comment_list: newCommentList,
                            });
                        }
                    } else {
                        // 댓일때
                        if (qnaDetailData) {
                            const newCommentList: res_types.qnaDetailList["comment_list"] =
                                qnaDetailData?.comment_list.slice();
                            const matchIdx = newCommentList.findIndex((it) => it.id === comment_id);
                            newCommentList.splice(matchIdx, 1);
                            setQnaDetailData({
                                ...qnaDetailData,
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
                    apiErrorAlert(res.msg);
                }
            },
        });
    };

    const ControlBtn = () => {
        if (qnaDetailData) {
            return (
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
                    <Link href={`/acinfo/qna/edit/${qnaDetailData.id}`} passHref>
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
            );
        } else {
            return null;
        }
    };

    if (qnaDetailData === null) {
        return <div>NOW LOAD</div>;
    } else {
        return (
            <div className={style.tutor_notice_detail}>
                <div className={style.header_title}>
                    <div>
                        <Typo
                            //@ts-ignore
                            content={qnaDetailData?.title}
                            type="TEXT"
                            size="large"
                            className={style.header_margin}
                        />
                        <Typo content={`/ ${qnaDetailData?.category}`} type="TEXT" size="small" color="gray_accent" />
                    </div>
                    <div>
                        <Typo
                            type="TEXT"
                            className={style.header_margin}
                            color={"gray_accent"}
                            size="small"
                            content={qnaDetailData.author}
                        />
                        <Typo
                            type="TEXT"
                            color={"gray_accent"}
                            size="small"
                            className={style.header_margin}
                            content={DateController.getFormatedDate("YYYY/MM/DD", qnaDetailData?.create_date)}
                        />
                        <Typo type="TEXT" color={"gray_accent"} size="small" content={`조회수 ${qnaDetailData.view}`} />
                    </div>
                </div>
                <div className={style.content}>
                    <TextViewer
                        //@ts-ignore
                        content={qnaDetailData?.content}
                        attachment={qnaDetailData?.attachment_list}
                    />
                </div>
                <CommentList
                    //@ts-ignore
                    commentList={qnaDetailData.comment_list}
                    newComment={newComment}
                    editComment={editComment}
                    deleteComment={deleteComment}
                />

                <div className={style.before_after_wrapper}>
                    <TableWrapper>
                        {qnaDetailData.after && (
                            <Link href={`/acinfo/qna/detail/${qnaDetailData.after.id}`} passHref>
                                <TableRow
                                    icon={true}
                                    iconType={"after"}
                                    title={qnaDetailData.after?.title}
                                    category={qnaDetailData.after.category}
                                    author={qnaDetailData.after.author}
                                    date={DateController.getFormatedDate(
                                        "YYYY-MM-DD",
                                        qnaDetailData.after?.create_date
                                    )}
                                    view={`조회수 ${qnaDetailData.after.view}`}
                                />
                            </Link>
                        )}
                        {qnaDetailData.before && (
                            <Link href={`/acinfo/qna/detail/${qnaDetailData.before.id}`} passHref>
                                <TableRow
                                    icon={true}
                                    iconType={"before"}
                                    title={qnaDetailData.before?.title}
                                    category={qnaDetailData.before.category}
                                    author={qnaDetailData.before.author}
                                    date={DateController.getFormatedDate(
                                        "YYYY-MM-DD",
                                        qnaDetailData.before?.create_date
                                    )}
                                    view={`조회수 ${qnaDetailData.before.view}`}
                                />
                            </Link>
                        )}
                    </TableWrapper>
                </div>
                <div className={style.bottom_btn_wrapper}>
                    {auth?.role === "ROLE_ADMIN" ? (
                        <ControlBtn />
                    ) : qnaDetailData?.user_id.toString() === auth?.user_id.toString() ? (
                        <ControlBtn />
                    ) : null}

                    <Link href={"/acinfo/qna"} passHref>
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
export default QnaDetail;
