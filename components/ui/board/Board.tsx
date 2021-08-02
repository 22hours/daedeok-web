import { Children } from "react";
import style from "./Board.module.scss";
import Typo from "@ui/Typo";

{
    /* 아래 복붙 후 사용
    사용하지 않는 props 는 false로 입력

    <Board
    idx={false}
    title={false}
    studentInfo={false}
    category={false}
    author={false}
    date={false}
    studentName={false}
    view={false}
    studentLimit={false}
> */
}

type Props = {
    children?: JSX.Element | JSX.Element[];
    idx: number | boolean;
    title: string | boolean;
    studentName: string | boolean;
    category: string | boolean;
    author: string | boolean;
    date: string | boolean;
    studentLimit: { student_limit: any; student_num: number } | boolean;
    view: number | boolean;
    studentInfo: { duty: string; first_division: string; second_division: string; phone_number: string } | boolean;
};

const Board = (props: Props) => {
    const { children, idx, title, studentName, category, author, date, studentInfo, view, studentLimit } = props;

    return (
        <div className={style.board_list}>
            <div className={style.board_item_wrapper}>
                {idx ? (
                    <div className={style.idx_item}>
                        <Typo type="TEXT" size="small" content={idx.toString()} />
                    </div>
                ) : (
                    <></>
                )}
                {title ? (
                    <div className={style.title_item}>
                        <Typo type="TEXT" size="medium" content={title.toString()} />
                    </div>
                ) : (
                    <></>
                )}
                <div className={style.board_item}>
                    {studentName ? <Typo type="TEXT" size="medium" content={studentName.toString()} /> : <></>}
                </div>
            </div>
            <div className={style.board_item_wrapper}>
                {studentInfo === false ? (
                    <></>
                ) : (
                    <>
                        <div className={style.student_info_item}>
                            <Typo
                                type="TEXT"
                                size="small"
                                //@ts-ignore
                                content={studentInfo.first_division}
                                color="gray_accent"
                            />
                        </div>
                        <div className={style.student_info_item}>
                            <Typo
                                type="TEXT"
                                size="small"
                                //@ts-ignore
                                content={studentInfo.second_division}
                                color="gray_accent"
                            />
                        </div>
                        <div className={style.student_info_item}>
                            <Typo
                                type="TEXT"
                                size="small"
                                //@ts-ignore
                                content={studentInfo.phone_number}
                                color="gray_accent"
                            />
                        </div>
                    </>
                )}
                {category ? (
                    <div className={style.board_item}>
                        <Typo type="TEXT" size="small" content={category.toString()} color={"red_accent"} />
                    </div>
                ) : (
                    <></>
                )}
                {author ? (
                    <div className={style.board_item}>
                        <Typo type="TEXT" size="small" content={author.toString()} color={"gray_accent"} />
                    </div>
                ) : (
                    <></>
                )}
                {date ? (
                    <div className={style.board_item}>
                        <Typo type="TEXT" size="small" content={date.toString()} color={"gray_accent"} />
                    </div>
                ) : (
                    <></>
                )}
                {view ? (
                    <div className={style.board_item}>
                        <Typo type="TEXT" size="small" content={view.toString()} color={"gray_accent"} />
                    </div>
                ) : (
                    <></>
                )}
                {studentLimit === false ? (
                    <></>
                ) : (
                    <div className={style.board_item}>
                        <Typo
                            type="TEXT"
                            size="small"
                            //@ts-ignore
                            content={studentLimit.student_num.toString() + "/" + studentLimit.student_limit.toString()}
                            color={"gray_accent"}
                        />
                    </div>
                )}
            </div>
            <> {children ? <div>{children}</div> : <></>}</>
        </div>
    );
};
export default Board;
