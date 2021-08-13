import { req_types } from "@global_types";
import Typo from "@ui/Typo";
import DateController from "lib/client/dateController";
import Link from "next/link";
import style from "./LecturePannel.module.scss";
type Props = req_types.LectureItem & {};

const LecturePannel = (props: Props) => {
    const lecture_date = `${DateController.getFormatedDate(
        "MM/DD",
        props.start_date
    )} ~ ${DateController.getFormatedDate("MM/DD", props.end_date)}`;
    const student_limmit = `${props.student_num}/${
        parseInt(props.student_limit) === -1 ? "무제한" : props.student_limit
    }`;
    return (
        <Link href={`/class/open/${props.lecture_id}/board`} passHref>
            <div className={style.container}>
                <div className={style.info_row}>
                    <div className={style.left}>
                        <Typo
                            className={style.typo__lecture_id}
                            type={"TEXT"}
                            size={"smaller"}
                            content={`강의 ${props.lecture_id}`}
                            color={"white"}
                        />
                    </div>
                    <div className={style.right}>
                        {props.type.map((it, idx) => (
                            <Typo
                                key={`lecturepannel${idx}`}
                                className={style.typo__lecture_type}
                                type={"TEXT"}
                                size={"smaller"}
                                content={it}
                                color={"mint_accent"}
                            />
                        ))}
                    </div>
                </div>
                <div className={style.main_row}>
                    <div className={style.left}>
                        <Typo
                            className={style.typo__title}
                            type={"TEXT"}
                            size={"medium"}
                            content={`${props.title}`}
                            color={"white"}
                        />
                    </div>
                    <div className={style.right}>
                        <div className={style.sub_col}>
                            <Typo
                                className={style.typo__lecture_date_label}
                                type={"TEXT"}
                                size={"smaller"}
                                content={`강의일정`}
                                color={"white"}
                            />
                            <Typo
                                className={style.typo__lecture_date_value}
                                type={"TEXT"}
                                size={"smaller"}
                                content={`${lecture_date}`}
                                color={"white"}
                            />
                        </div>
                        <div className={style.sub_col}>
                            <Typo
                                className={style.typo__lecture_limit_label}
                                type={"TEXT"}
                                size={"smaller"}
                                content={`수강인원`}
                                color={"white"}
                            />
                            <Typo
                                className={style.typo__lecture_limit_value}
                                type={"TEXT"}
                                size={"smaller"}
                                content={`${student_limmit}`}
                                color={"white"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default LecturePannel;
