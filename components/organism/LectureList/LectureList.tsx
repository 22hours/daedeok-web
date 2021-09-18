import React, { useRef, useEffect, useState } from "react";
import { res_types } from "@global_types";
import style from "./LectureList.module.scss";

//component
import TableRow from "@ui/board/TableRow";
import UseDate from "lib/hooks/useDate";
import TableWrapper from "@ui/board/TableWrapper";
import Pagination from "@ui/pagination/Pagination";
import SearchBar from "@ui/input/SearchBar";
import Select from "@ui/input/Select";
import Typo from "@ui/Typo";

//store
import { useAuthStore } from "store/AuthStore";
import { useListCommonStore } from "store/ListCommonStore";
import useClassCategory from "lib/hooks/useClassCategory";
import { useRouter } from "next/router";
import ListSelect from "components/molecule/ListSelect/ListSelect";
import ListSearchbar from "components/molecule/ListSearchbar/ListSearchbar";
import ListPagination from "components/molecule/ListPagination/ListPagination";
import PageHeader from "@ui/PageHeader";
import ListPageLayout from "components/layout/ListPageLayout";
import Link from "next/link";
import DateController from "lib/client/dateController";
import WindowController from "lib/client/windowController";

type State = res_types.classCompleteList;

// ELEMENT TYPES
const initState: State = {
    lecture_list: [],
    total_count: 0,
};

const LectureCloseList = (props: { lecture_list: any; page: string; total_count: number }) => {
    const router = useRouter();
    const { status } = router.query;

    const [mode, setMode] = useState<"pc" | "mobile">("pc");

    const setModeByWindowSize = () => {
        var width = WindowController.getWindowSize();
        if (width > 900) {
            setMode("pc");
        } else {
            setMode("mobile");
        }
    };

    useEffect(() => {
        setModeByWindowSize();
        window.addEventListener("resize", setModeByWindowSize);
        return () => {
            window.removeEventListener("resize", setModeByWindowSize);
        };
    }, []);

    return (
        <TableWrapper>
            {mode === "pc" ? (
                <>
                    {props.lecture_list?.map((it, idx) => (
                        <div key={`lectureitem${idx}`}>
                            <Link href={`/lecture/${status}/detail/${it.id}`} passHref>
                                <div className={style.list_wrapper}>
                                    <div className={style.title_wrapper}>
                                        <div className={style.list_id}>
                                            <Typo
                                                type="TEXT"
                                                size="smaller"
                                                content={(
                                                    props?.total_count -
                                                    (parseInt(props?.page) - 1) * 7 -
                                                    idx
                                                ).toString()}
                                                color={"brown_font"}
                                            />
                                        </div>
                                        <div className={style.list_title}>
                                            <Typo type="TEXT" size="normal" content={it.title} color={"brown_font"} />
                                        </div>
                                    </div>
                                    <div className={style.detail_item_list}>
                                        <div className={`${style.category_item} ${style.detail_item}`}>
                                            <Typo content={it.category} type="TEXT" size="smaller" color="red_accent" />
                                        </div>
                                        <div className={`${style.date_item} ${style.detail_item}`}>
                                            <Typo
                                                content={`${DateController.getFormatedDate(
                                                    "YYYY/MM/DD",
                                                    it.start_date
                                                )}~${DateController.getFormatedDate("YYYY/MM/DD", it.end_date)}`}
                                                type="TEXT"
                                                size="smaller"
                                                color="gray_accent"
                                            />
                                        </div>
                                        <div className={`${style.date_item} ${style.detail_item}`}>
                                            <Typo
                                                content={`${it.day} ${it.time}`}
                                                type="TEXT"
                                                size="smaller"
                                                color="gray_accent"
                                            />
                                        </div>
                                        {status === "open" && (
                                            <div className={`${style.limit_item} ${style.detail_item}`}>
                                                <Typo
                                                    content={`수강인원 ${it.student_num}/${
                                                        parseInt(it.student_limit) === -1 ? "무제한" : it.student_limit
                                                    }`}
                                                    type="TEXT"
                                                    size="smaller"
                                                    color="gray_accent"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </>
            ) : (
                <>
                    {props.lecture_list?.map((it, idx) => (
                        <div key={`lectureitem${idx}`}>
                            <Link href={`/lecture/${status}/detail/${it.id}`} passHref>
                                <div className={style.mobile_list_wrapper}>
                                    <div className={style.title_wrapper}>
                                        <div className={style.list_id}>
                                            <Typo
                                                type="TEXT"
                                                size="smaller"
                                                content={it.id.toString()}
                                                color={"brown_font"}
                                            />
                                        </div>
                                        <div className={style.list_title}>
                                            <Typo type="TEXT" size="normal" content={it.title} color={"brown_font"} />
                                        </div>
                                    </div>
                                    <div className={style.detail_item_list}>
                                        <div className={`${style.category_item} ${style.detail_item}`}>
                                            <Typo content={it.category} type="TEXT" size="smaller" color="red_accent" />
                                        </div>
                                        <div className={`${style.date_item} ${style.detail_item}`}>
                                            <Typo
                                                content={`${it.day} ${it.time}`}
                                                type="TEXT"
                                                size="smaller"
                                                color="gray_accent"
                                            />
                                        </div>
                                    </div>
                                    <div className={style.detail_item_list}>
                                        <div className={`${style.date_item} ${style.detail_item}`}>
                                            <Typo
                                                content={`${DateController.getFormatedDate(
                                                    "YYYY/MM/DD",
                                                    it.start_date
                                                )}~${DateController.getFormatedDate("YYYY/MM/DD", it.end_date)}`}
                                                type="TEXT"
                                                size="smaller"
                                                color="gray_accent"
                                            />
                                        </div>
                                        {status === "open" && (
                                            <div className={`${style.limit_item} ${style.detail_item}`}>
                                                <Typo
                                                    content={`${it.student_num}/${
                                                        parseInt(it.student_limit) === -1 ? "무제한" : it.student_limit
                                                    }`}
                                                    type="TEXT"
                                                    size="smaller"
                                                    color="gray_accent"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </>
            )}
        </TableWrapper>
    );
};

type Props = {
    status: "FINISH" | "OPEN";
};

const LectureList = ({ status }: Props) => {
    const { clientSideApi } = useAuthStore();
    const { state } = useListCommonStore();

    const [listState, setListState] = useState<State>(initState);

    const searchRef = useRef<HTMLInputElement | null>(null);

    const getClassListData = async () => {
        if (state.isLoadEnd) {
            const res = await clientSideApi("GET", "MAIN", "LECTURE_FIND", undefined, {
                category: state.category === "ALL" ? undefined : state.category,
                status: status,
                keyword: state.keyword,
                page: parseInt(state.page) - 1,
                required_count: 7,
            });
            if (res.result === "SUCCESS") {
                var data = res.data;
                setListState({ ...res.data });
            }
        }
    };

    useEffect(() => {
        if (state.isLoadEnd) {
            getClassListData();
            if (searchRef.current) {
                if (state.keyword !== searchRef.current.value) {
                    searchRef.current.value = "";
                }
            }
        }
    }, [state]);

    return (
        <>
            <PageHeader title={status === "OPEN" ? "현재 진행중인 강의" : "종료된 강의"} />
            <ListPageLayout
                headerLeft={<ListSelect categoryType={"CLASS"} />}
                headerRight={<ListSearchbar />}
                footer={<ListPagination total_count={listState.total_count} required_count={7} />}
            >
                <LectureCloseList
                    lecture_list={listState.lecture_list}
                    total_count={listState.total_count}
                    page={state.page}
                />
            </ListPageLayout>
        </>
    );
};

export default LectureList;
