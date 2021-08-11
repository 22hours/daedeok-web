import Button from "@ui/buttons/Button";
import TextArea from "@ui/input/TextArea";
import CommentItem from "components/molecule/CommentItem/CommentItem";
import useInput from "lib/hooks/useInput";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import style from "./CommentList.module.scss";

type NewCommentSectionProps = {
    newComment: (content: string, parent_id?: string) => void;
};
const NewCommentSection = (props: NewCommentSectionProps) => {
    const comment = useInput();
    return (
        <div className={style.section_new_comment}>
            <div>
                <TextArea
                    {...comment}
                    placeholder={"댓글을 입력해주세요."}
                    maxLength={120}
                    className={style.new_comment_input}
                    //@ts-ignore
                    // refs={newCommentRef}
                />
            </div>
            <div className={style.new_comment_btn_wrapper}>
                <Button
                    className={style.new_comment_btn}
                    type="SQUARE"
                    size="smaller"
                    fontSize="smaller"
                    backgroundColor="yellow_accent"
                    content="댓글작성"
                    color="white"
                    onClick={() => props.newComment(comment.value)}
                />
            </div>
        </div>
    );
};

type CommentItem = {
    id: string;
    user_id: string;
    author: string;
    content: string;
    create_date: string;
    children: CommentItem[];
} & { type: "FIRST" | "SECOND" };

type Props = {
    commentList: CommentItem[];
    newComment: (content: string, parent_id?: string) => void;
    editComment: (content: string, comment_id: string, parent_id?: string) => void;
};
const CommentList = (props: Props) => {
    const [flatCommentList, setFlatCommentList] = useState<CommentItem[]>([]);
    useEffect(() => {
        if (props) {
            var res_list: any[] = [];
            props.commentList.forEach((comment_item) => {
                res_list.push({
                    ...comment_item,
                    type: "FIRST",
                });
                comment_item.children.forEach((comment_children_item) => {
                    res_list.push({
                        ...comment_children_item,
                        parent_id: comment_item.id,
                        type: "SECOND",
                    });
                });
            });
            setFlatCommentList(res_list);
        }
    }, [props]);

    return (
        <div className={style.container}>
            <div className={style.comment_list}>
                {flatCommentList.map((it, idx) => {
                    return (
                        <CommentItem
                            key={`commentitem:${idx}`}
                            {...it}
                            type={it.type}
                            newComment={props.newComment}
                            editComment={props.editComment}
                            deleteComment={() => alert("TODO")}
                        />
                    );
                })}
            </div>
            <NewCommentSection newComment={props.newComment} />
        </div>
    );
};

export default CommentList;
