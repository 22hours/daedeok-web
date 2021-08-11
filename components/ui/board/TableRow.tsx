import style from "./TableRow.module.scss";
import Typo from "@ui/Typo";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Link from "next/link";

type Props = {
    children?: JSX.Element | JSX.Element[];
    idx?: number | string;
    icon?: boolean;
    title?: string;
    studentName?: string;
    category?: string;
    author?: string;
    date?: string;
    studentLimit?: { student_limit: any; student_num: number };
    view?: number;
    tutor?: string;
    type?: string;
    classInfo?: boolean;
    week?: string;
    weekTitle?: string;
    href?: string;
    iconType?: string;
    studentInfo?: { duty: string; first_division: string; second_division: string; phone_number: string };
};

const TableRow = (props: Props) => {
    const {
        children,
        idx,
        icon,
        tutor,
        type,
        title,
        studentName,
        category,
        author,
        date,
        studentInfo,
        view,
        studentLimit,
        week,
        weekTitle,
        classInfo,
        href,
        iconType,
    } = props;

    return (
        <>
            {href ? (
                <div className={style.table_row_wrapper}>
                    <Link href={href}>
                        <div className={`${style.link_board_list} ${style.link}`}>
                            <div className={style.board_item_wrapper}>
                                {idx && (
                                    <div className={style.idx_item}>
                                        <Typo
                                            type="TEXT"
                                            size="small"
                                            content={idx.toString()}
                                            color={classInfo ? "gray_accent" : "brown_font"}
                                        />
                                    </div>
                                )}
                                {week && (
                                    <div className={style.idx_item}>
                                        <Typo type="TEXT" size="normal" content={week} color={"gray_accent"} />
                                    </div>
                                )}
                                {icon && (
                                    <div className={style.idx_item}>
                                        {iconType === "after" ? (
                                            <ExpandLessIcon className={style.icon_item} />
                                        ) : (
                                            <ExpandMoreIcon className={style.icon_item} />
                                        )}
                                    </div>
                                )}
                                {weekTitle && (
                                    <div className={style.title_item}>
                                        <Typo type="TEXT" size="normal" content={weekTitle} color={"gray_accent"} />
                                    </div>
                                )}
                                {title && (
                                    <div className={style.title_item}>
                                        <Typo
                                            type="TEXT"
                                            size="medium"
                                            content={title.toString()}
                                            color={classInfo ? "gray_accent" : "brown_font"}
                                        />
                                    </div>
                                )}
                                {studentName && (
                                    <div className={style.board_item}>
                                        <Typo type="TEXT" size="medium" content={studentName.toString()} />
                                    </div>
                                )}
                            </div>
                            <div className={style.right_item_wrapper}>
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
                                    <div className={style.category_item}>
                                        <Typo
                                            type="TEXT"
                                            size="small"
                                            content={category.toString()}
                                            color={"red_accent"}
                                        />
                                    </div>
                                )}
                                {author && (
                                    <div className={style.board_item}>
                                        <Typo
                                            type="TEXT"
                                            size="small"
                                            content={author.toString()}
                                            color={"gray_accent"}
                                        />
                                    </div>
                                )}
                                {date && (
                                    <div className={style.board_item}>
                                        <Typo
                                            type="TEXT"
                                            size="small"
                                            content={date.toString()}
                                            color={"gray_accent"}
                                        />
                                    </div>
                                )}
                                {tutor && (
                                    <div className={style.tutor_item}>
                                        <div>
                                            <Typo type="TEXT" size="small" content={tutor} color={"gray_accent"} />
                                        </div>
                                        <div>
                                            <Typo
                                                type="TEXT"
                                                size="small"
                                                //@ts-ignore
                                                content={type}
                                                color={"gray_accent"}
                                            />
                                        </div>
                                    </div>
                                )}
                                {view && (
                                    <div className={style.board_item}>
                                        <Typo
                                            type="TEXT"
                                            size="small"
                                            content={view.toString()}
                                            color={"gray_accent"}
                                        />
                                    </div>
                                )}
                                {studentLimit && (
                                    <div className={style.limit_item}>
                                        <Typo
                                            type="TEXT"
                                            size="small"
                                            //@ts-ignore
                                            content={
                                                studentLimit.student_num.toString() +
                                                "/" +
                                                studentLimit.student_limit.toString()
                                            }
                                            color={"gray_accent"}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                    <> {children && <div>{children}</div>}</>
                </div>
            ) : (
                <div className={style.board_list}>
                    <div className={style.board_item_wrapper}>
                        {idx && (
                            <div className={style.idx_item}>
                                <Typo
                                    type="TEXT"
                                    size="small"
                                    content={idx.toString()}
                                    color={classInfo ? "gray_accent" : "brown_font"}
                                />
                            </div>
                        )}
                        {week && (
                            <div className={style.idx_item}>
                                <Typo type="TEXT" size="normal" content={week} color={"gray_accent"} />
                            </div>
                        )}
                        {icon && (
                            <div className={style.idx_item}>
                                {iconType === "after" ? (
                                    <ExpandLessIcon className={style.icon_item} />
                                ) : (
                                    <ExpandMoreIcon className={style.icon_item} />
                                )}
                            </div>
                        )}
                        {weekTitle && (
                            <div className={style.title_item}>
                                <Typo type="TEXT" size="normal" content={weekTitle} color={"gray_accent"} />
                            </div>
                        )}
                        {title && (
                            <div className={style.title_item}>
                                <Typo
                                    type="TEXT"
                                    size="medium"
                                    content={title.toString()}
                                    color={classInfo ? "gray_accent" : "brown_font"}
                                />
                            </div>
                        )}
                        {studentName && (
                            <div className={style.board_item}>
                                <Typo type="TEXT" size="medium" content={studentName.toString()} />
                            </div>
                        )}
                    </div>
                    <div className={style.right_item_wrapper}>
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
                        {tutor && (
                            <div className={style.tutor_item}>
                                <div>
                                    <Typo type="TEXT" size="small" content={tutor} color={"gray_accent"} />
                                </div>
                                <div>
                                    <Typo
                                        type="TEXT"
                                        size="small"
                                        //@ts-ignore
                                        content={type}
                                        color={"gray_accent"}
                                    />
                                </div>
                            </div>
                        )}
                        {view && (
                            <div className={style.board_item}>
                                <Typo type="TEXT" size="small" content={view.toString()} color={"gray_accent"} />
                            </div>
                        )}
                        {studentLimit && (
                            <div className={style.limit_item}>
                                <Typo
                                    type="TEXT"
                                    size="small"
                                    //@ts-ignore
                                    content={
                                        studentLimit.student_num.toString() +
                                        "/" +
                                        studentLimit.student_limit.toString()
                                    }
                                    color={"gray_accent"}
                                />
                            </div>
                        )}
                    </div>
                    <> {children && <div>{children}</div>}</>
                </div>
            )}
        </>
    );
};
export default TableRow;
