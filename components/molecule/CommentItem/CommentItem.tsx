import { meta_types, res_types } from "@global_types";
import { Collapse } from "@material-ui/core";
import Button from "@ui/buttons/Button";
import TextArea from "@ui/input/TextArea";
import Typo from "@ui/Typo";
import DateController from "lib/client/dateController";
import useBoolean from "lib/hooks/useBoolean";
import useInput from "lib/hooks/useInput";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import style from "./CommentItem.module.scss";

// VIEW
type ViewFormProps = res_types.CommentItem & {
    type: "FIRST" | "SECOND";
    isMine: boolean;
    newComment: (content: string, parent_id?: string) => void;
    handleEditButton: any;
    deleteComment: (content: string, parent_id?: string) => void;
};
const CommentViewForm = (props: ViewFormProps) => {
    const comment = useInput();
    const isNewCommentEdit = useBoolean(false);

    const handleNewComment = () => {
        comment.setValue("");
        isNewCommentEdit.toggle();
    };

    return (
        <div className={style.view_container}>
            <div className={style.head}>
                <div className={style.head_left}>
                    <Typo type={"TEXT"} size={"smaller"} content={props.author} />
                    <Typo
                        className={style.text__date}
                        type={"TEXT"}
                        size={"smaller"}
                        content={DateController.getFormatedDate("YYYY/MM/DD", props.create_date)}
                        color={"gray_accent"}
                    />
                </div>
                <div className={style.head_right}>
                    {props.type === "FIRST" && (
                        <>
                            <div onClick={handleNewComment} className={style.text_btn}>
                                <Typo type={"TEXT"} size={"smaller"} content={"댓글"} color={"gray_accent"} />
                            </div>
                            <Typo
                                className={style.sep}
                                type={"TEXT"}
                                size={"smaller"}
                                content={"/"}
                                color={"gray_accent"}
                            />
                        </>
                    )}

                    {props.isMine && (
                        <>
                            <div onClick={() => props.handleEditButton(true)} className={style.text_btn}>
                                <Typo type={"TEXT"} size={"smaller"} content={"수정"} color={"gray_accent"} />
                            </div>
                            <Typo
                                className={style.sep}
                                type={"TEXT"}
                                size={"smaller"}
                                content={"/"}
                                color={"gray_accent"}
                            />
                            <div
                                onClick={() => {
                                    props.deleteComment(props.id, props?.parent_id);
                                }}
                                className={style.text_btn}
                            >
                                <Typo type={"TEXT"} size={"smaller"} content={"지우기"} color={"gray_accent"} />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className={style.body}>
                <Typo type="TEXT" content={props.content} size="small" color="brown_font" />
            </div>
            <Collapse in={isNewCommentEdit.value} timeout="auto" unmountOnExit>
                <div className={style.new_children_container}>
                    <TextArea {...comment} />
                    <div className={style.edit_footer}>
                        <Button
                            type="SQUARE"
                            size="small"
                            fontSize="smaller"
                            content="취소"
                            onClick={handleNewComment}
                            className={`${style.cancle_btn} ${style.edit_footer_btn}`}
                        />
                        <Button
                            type="SQUARE"
                            size="small"
                            fontSize="smaller"
                            backgroundColor="yellow_accent"
                            content="작성"
                            color="white"
                            onClick={() => {
                                props.newComment(comment.value, props.id);
                                handleNewComment();
                            }}
                            className={`${style.success_btn} ${style.edit_footer_btn}`}
                        />
                    </div>
                </div>
            </Collapse>
        </div>
    );
};

// EDIT
type EditFormProps = {
    comment_id: string;
    parent_id?: string;
    content: string;
    handleEditButton: any;
    editComment: (content: string, comment_id: string, parent_id?: string) => void;
};
const CommentEditForm = (props: EditFormProps) => {
    const comment = useInput();
    useEffect(() => {
        comment.setValue(props.content);
    }, []);
    return (
        <div className={style.view_container}>
            <TextArea {...comment} />
            <div className={style.edit_footer}>
                <Button
                    type="SQUARE"
                    size="small"
                    fontSize="smaller"
                    content="취소"
                    onClick={() => props.handleEditButton(false)}
                    className={`${style.cancle_btn} ${style.edit_footer_btn}`}
                />
                <Button
                    type="SQUARE"
                    size="small"
                    fontSize="smaller"
                    backgroundColor="yellow_accent"
                    content="수정"
                    color="white"
                    onClick={() => {
                        props.editComment(comment.value, props.comment_id, props.parent_id);
                        props.handleEditButton(false);
                    }}
                    className={`${style.success_btn} ${style.edit_footer_btn}`}
                />
            </div>
        </div>
    );
};

// PARENT
type Props = res_types.CommentItem & {
    type: "FIRST" | "SECOND";
    newComment: (content: string, parent_id?: string) => void;
    editComment: (content: string, comment_id: string, parent_id?: string) => void;
    deleteComment: (comment_id: string, parent_id?: string) => void;
};
const CommentItem = (props: Props) => {
    const { auth } = useAuthStore();

    const [state, setState] = useState({
        isEdit: false,
        isCommentNow: false,
    });

    const handleEditState = useCallback(
        (value: boolean) => {
            setState({
                isEdit: value,
                isCommentNow: false,
            });
        },
        [state.isEdit]
    );

    const isMine = auth?.user_id.toString() === props.user_id.toString();

    const makeComment = () => {
        if (!state.isEdit) {
            return (
                <CommentViewForm
                    isMine={isMine}
                    {...props}
                    newComment={props.newComment}
                    handleEditButton={handleEditState}
                    deleteComment={props.deleteComment}
                />
            );
        } else {
            return (
                <CommentEditForm
                    comment_id={props.id}
                    parent_id={props?.parent_id}
                    content={props.content}
                    handleEditButton={handleEditState}
                    editComment={props.editComment}
                />
            );
        }
    };

    return (
        <div className={`${style.container} ${props.type === "SECOND" ? style.second_container : ""}`}>
            {props.type === "SECOND" && <div className={style.second_left_padding_div}></div>}
            {makeComment()}
        </div>
    );
};

export default CommentItem;
