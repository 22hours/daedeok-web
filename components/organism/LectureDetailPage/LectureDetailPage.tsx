import style from "./LectureDetailPage.module.scss";
import { useRouter } from "next/router";
import { useAuthStore } from "store/AuthStore";
import { useEffect, useState } from "react";
import Typo from "@ui/Typo";
import { meta_types, req_types } from "@global_types";
import DateController from "lib/client/dateController";
import TextInput from "@ui/input/TextInput";
import TableWrapper from "@ui/board/TableWrapper";
import { SettingsApplications } from "@material-ui/icons";
import Link from "next/link";
import Button from "@ui/buttons/Button";
import LecturePlanItem from "components/organism/LecturePlanItem/LecturePlanItem";

type Props = {};
type State = {
    id: string;
    user_id: string;
    title: string;
    category: string;
    start_date: string;
    end_date: string;
    student_limit: string;
    student_num: string;
    day: string;
    time: string;
    content: string;
    tutor: string;
    type: meta_types.classType[];
    division_list: { first_division: string; second_division: string[] }[];
    reference: string;
    lecture_plan: {
        id: string;
        week: string;
        title: string;
        location: string;
        type: meta_types.classType;
        date: string;
        tutor: string;
    }[];
};

const LectureDetailPage = (props: Props) => {
    const [data, setData] = useState<State | null>(null);
    const router = useRouter();
    const { status, lecture_id } = router.query;
    const { clientSideApi } = useAuthStore();
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_DETAIL", { lecture_id: lecture_id });
        if (res.result === "SUCCESS") {
            setData({ ...res.data, division_list: res.data.division_list || [] });
        } else {
            alert(res.msg);
        }
    };
    useEffect(() => {
        if (router.query) {
            getData();
        }
    }, [router.query]);
    if (data === null) {
        return <div>LOAD</div>;
    } else {
        const date = `${DateController.getFormatedDate("YYYY/MM/DD", data.start_date)}~${DateController.getFormatedDate(
            "YYYY/MM/DD",
            data.end_date
        )}`;
        const limit = `수강인원 ${data.student_num}/${
            parseInt(data.student_limit) === -1 ? "무제한" : data.student_limit
        }`;
        return (
            <div className={style.container}>
                <div className={style.head}>
                    <div className={style.title_col}>
                        <Typo type={"TEXT"} size={"large"} content={data.title} />
                    </div>
                    <div className={style.info_col}>
                        <Typo
                            className={style.typo__info}
                            type={"TEXT"}
                            size={"small"}
                            content={date}
                            color={"gray_accent"}
                        />
                        <Typo
                            className={style.typo__info}
                            type={"TEXT"}
                            size={"small"}
                            content={limit}
                            color={"gray_accent"}
                        />
                    </div>
                </div>
                <div className={style.body}>
                    <Typo className={style.typo_introduce} type={"TEXT"} size={"small"} content={data.content} />

                    <div className={style.section_class_info}>
                        <div className={style.main_body_grid}>
                            <div className={style.main_body_row}>
                                <Typo
                                    className={style.label}
                                    type={"TEXT"}
                                    size={"small"}
                                    content={"강사"}
                                    color={"white"}
                                />
                                <TextInput
                                    className={style.value}
                                    form={"underline"}
                                    type={"text"}
                                    value={data.tutor}
                                    disable
                                />
                            </div>
                            <div className={style.main_body_row}>
                                <Typo
                                    className={style.label}
                                    type={"TEXT"}
                                    size={"small"}
                                    content={"형태"}
                                    color={"white"}
                                />
                                <TextInput
                                    className={style.value}
                                    form={"underline"}
                                    type={"text"}
                                    value={data.type
                                        .map((it) =>
                                            it === "OFFLINE" ? "오프라인" : it === "ONLINE" ? "영상 강의" : "ZOOM"
                                        )
                                        .join(" - ")}
                                    disable
                                />
                            </div>
                        </div>
                        <div className={style.main_body_grid}>
                            <div className={style.main_body_row}>
                                <Typo
                                    className={style.label}
                                    type={"TEXT"}
                                    size={"small"}
                                    content={"정원"}
                                    color={"white"}
                                />
                                <TextInput
                                    className={style.value}
                                    form={"underline"}
                                    type={"text"}
                                    value={`${
                                        parseInt(data.student_limit) === -1
                                            ? "무제한"
                                            : `${data.student_limit}명 (선착순 신청 후 마감)`
                                    }`}
                                    disable
                                />
                            </div>
                            <div className={style.main_body_row}>
                                <Typo
                                    className={style.label}
                                    type={"TEXT"}
                                    size={"small"}
                                    content={"대상"}
                                    color={"white"}
                                />
                                <TextInput
                                    className={style.value}
                                    form={"underline"}
                                    type={"text"}
                                    value={data.division_list
                                        .map((first_item) => {
                                            const secondDivList = first_item.second_division.map((it) => it).join(", ");
                                            return `${first_item.first_division} - ${secondDivList}`;
                                        })
                                        .join(" | ")}
                                    disable
                                />
                            </div>
                        </div>
                        <div className={style.main_body_grid}>
                            <div className={style.main_body_row}>
                                <Typo
                                    className={style.label}
                                    type={"TEXT"}
                                    size={"small"}
                                    content={"요일"}
                                    color={"white"}
                                />
                                <TextInput
                                    className={style.value}
                                    form={"underline"}
                                    type={"text"}
                                    value={data.day}
                                    disable
                                />
                            </div>
                            <div className={style.main_body_row}>
                                <Typo
                                    className={style.label}
                                    type={"TEXT"}
                                    size={"small"}
                                    content={"시간"}
                                    color={"white"}
                                />
                                <TextInput
                                    className={style.value}
                                    form={"underline"}
                                    type={"text"}
                                    value={data.time}
                                    disable
                                />
                            </div>
                        </div>
                        <div className={style.main_body_grid_single}>
                            <div className={style.main_body_row}>
                                <Typo
                                    className={style.label}
                                    type={"TEXT"}
                                    size={"small"}
                                    content={"참고자료"}
                                    color={"white"}
                                />
                                <TextInput
                                    className={style.value}
                                    form={"underline"}
                                    type={"text"}
                                    value={data.reference}
                                    disable
                                />
                            </div>
                        </div>
                        <div className={style.main_body_grid_single}>
                            <div className={style.main_body_row}>
                                <Typo
                                    className={style.label}
                                    type={"TEXT"}
                                    size={"small"}
                                    content={"강의계획"}
                                    color={"white"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={style.lecture_plan_list_container}>
                        <TableWrapper>
                            <LecturePlanItem lecture_plan={data?.lecture_plan} />
                        </TableWrapper>
                    </div>
                </div>
                <div className={style.footer}>
                    <Link href={`/lecture/${status}`} passHref>
                        <Button
                            className={style.golist_btn}
                            type={"SQUARE"}
                            size={"free"}
                            fontSize={"smaller"}
                            color={"white"}
                            backgroundColor={"yellow_accent"}
                            content={"목록"}
                        />
                    </Link>
                </div>
            </div>
        );
    }
};

export default LectureDetailPage;
