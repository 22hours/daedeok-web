import Typo from "@ui/Typo";
import DateController from "lib/client/dateController";
import style from "./CommentList.module.scss";

const CommentList = ({ auth, commentList, type }) => {
    return (
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
    );
};

export default CommentList;
