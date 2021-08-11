import React, { useEffect, useState, useRef } from "react";
import Typo from "@ui/Typo";
import style from "./CommentList.module.scss";
import TextArea from "@ui/input/TextArea";
import Button from "@ui/buttons/Button";
//store
import { useAuthStore } from "store/AuthStore";
//controller
import DateController from "lib/client/dateController";

type State = {
    comment_list: Array<{
        user_id: number | null;
        author: string;
        content: string;
        create_date: string;
        children?: Array<{
            user_id: number;
            author: string;
            content: string;
            create_date: string;
            children?: any;
        }>;
    }>;
};

type Action =
    | { type: "ADD_COMMENT"; data: { parentId?: number; content: string } }
    | { type: "DEL_COMMENT"; data: { parentId?: number; content: string } }
    | { type: "EDIT_COMMENT"; data: { parentId?: number; content: string } };

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "ADD_COMMENT": {
            var new_comment_list = state.comment_list.slice();
            new_comment_list.push({
                user_id: null,
                author: "",
                content: "",
                create_date: "",
                children: [],
            });
        }
        case "DEL_COMMENT": {
        }
        case "DEL_COMMENT": {
        }
    }
    return state;
};

const CommentList = ({ auth, commentList, type, noticeId }) => {
    const { clientSideApi } = useAuthStore();

    return (
        <div>
            <div className={style.comment_wrapper}>
                {type === "second" && <div className={style.second_comment_line}></div>}
                <div className={style.comment_box}>
                    <div className={style.comment_header}>
                        <div className={style.comment_header_top}>
                            <Typo
                                type={"TEXT"}
                                content={commentList.author}
                                size={"smaller"}
                                color={"brown_font"}
                                className={style.margin}
                            />
                            <Typo
                                type={"TEXT"}
                                content={DateController.getFormatedDate("YYYY/MM/DD", commentList?.create_date)}
                                size={"smaller"}
                                color={"gray_accent"}
                            />
                        </div>
                        <div className={style.comment_edit_del}>
                            {type === "first" && (
                                <Typo
                                    type={"TEXT"}
                                    content={"댓글"}
                                    size={"smaller"}
                                    color={"gray_accent"}
                                    className={style.cursor_pointer}
                                />
                            )}

                            {auth?.user_id?.toString() === (commentList?.user_id).toString() && (
                                <>
                                    <div className={style.slash}>/</div>
                                    <Typo
                                        type={"TEXT"}
                                        content={"수정"}
                                        size={"smaller"}
                                        color={"gray_accent"}
                                        className={style.cursor_pointer}
                                    />
                                    <div className={style.slash}>/</div>
                                    <Typo
                                        type={"TEXT"}
                                        content={"삭제"}
                                        size={"smaller"}
                                        className={style.cursor_pointer}
                                        color={"gray_accent"}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <div className={style.comment_content}>
                        <Typo type="TEXT" content={commentList.content} size="small" color="brown_font" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentList;
