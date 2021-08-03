import style from "./Board.module.scss";
import Typo from "@ui/Typo";

type Props = {
    children?: JSX.Element | JSX.Element[];
    idx?: number;
    title?: string;
    studentName?: string;
    category?: string;
    author?: string;
    date?: string;
    studentLimit?: { student_limit: any; student_num: number };
    view?: number;
    studentInfo?: { duty: string; first_division: string; second_division: string; phone_number: string };
};

const TableRow = (props: Props) => {
    const { children, idx, title, studentName, category, author, date, studentInfo, view, studentLimit } = props;

    return (
        <div className={style.board_list}>
            <div className={style.board_item_wrapper}>
                {idx && (
                    <div className={style.idx_item}>
                        <Typo type="TEXT" size="small" content={idx.toString()} />
                    </div>
                )}
                {title && (
                    <div className={style.title_item}>
                        <Typo type="TEXT" size="medium" content={title.toString()} />
                    </div>
                )}
                {studentName && (
                    <div className={style.board_item}>
                        <Typo type="TEXT" size="medium" content={studentName.toString()} />
                    </div>
                )}
            </div>
            <div className={style.board_item_wrapper}>
                {studentInfo && (
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
                {category && (
                    <div className={style.board_item}>
                        <Typo type="TEXT" size="small" content={category.toString()} color={"red_accent"} />
                    </div>
                )}
                {author && (
                    <div className={style.board_item}>
                        <Typo type="TEXT" size="small" content={author.toString()} color={"gray_accent"} />
                    </div>
                )}
                {date && (
                    <div className={style.board_item}>
                        <Typo type="TEXT" size="small" content={date.toString()} color={"gray_accent"} />
                    </div>
                )}
                {view && (
                    <div className={style.board_item}>
                        <Typo type="TEXT" size="small" content={view.toString()} color={"gray_accent"} />
                    </div>
                )}
                {studentLimit && (
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
            <> {children && <div>{children}</div>}</>
        </div>
    );
};
export default TableRow;
