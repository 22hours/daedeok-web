import { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import { useListCommonStore } from "store/ListCommonStore";
import style from "./ClassCompleteList.module.scss";

import ClassCategorySelect from "components/molecule/ClassCategorySelect/ClassCategorySelect";
import SearchBar from "@ui/input/SearchBar";
import TableWrapper from "@ui/board/TableWrapper";
import Pagination from "@ui/pagination/Pagination";
import TableRow from "@ui/board/TableRow";
import DateController from "lib/client/dateController";
import Button from "@ui/buttons/Button";
import Typo from "@ui/Typo";
// List
import ListSearchbar from "components/molecule/ListSearchbar/ListSearchbar";
import ListSelect from "components/molecule/ListSelect/ListSelect";
import ListPagination from "components/molecule/ListPagination/ListPagination";
import ListPageLayout from "components/layout/ListPageLayout";
import WindowController from "lib/client/windowController";
import Link from "next/link";

type State = {
    total_count: number;
    total_page: number;
    lecture_list: ClassItem[];
};
type ClassItem = {
    id: string;
    title: string;
    start_date: string;
    end_date: string;
    status: "ING" | "COMPLETE";
    url: string;
};

const initState: State = {
    total_count: 0,
    total_page: 0,
    lecture_list: [],
};
const ClassCompleteList = () => {
    const pageState = useListCommonStore();
    const [data, setData] = useState<State>(initState);
    const { clientSideApi } = useAuthStore();
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_FIND_COMPLETE", undefined, {
            category: pageState.state.category === "ALL" ? undefined : pageState.state.category,
            keyword: pageState.state.keyword,
            page: parseInt(pageState.state.page) - 1,
            required_count: 7,
        });
        if (res.result === "SUCCESS") {
            setData({ ...res.data });
        } else {
            alert(res.msg);
        }
    };

    const [mode, setMode] = useState<"pc" | "mobile">("pc");

    const setModeByWindowSize = () => {
        var width = WindowController.getWindowSize();
        console.log(width);
        if (width > 1100) {
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

    useEffect(() => {
        if (pageState.state.isLoadEnd) {
            getData();
        }
    }, [pageState.state]);

    const makeStatusButton = (it: ClassItem) => {
        if (it.status === "ING") {
            return (
                <Button
                    className={`${style.row_btn} ${style.ing_btn}`}
                    type={"SQUARE"}
                    size={"small"}
                    fontSize={"smaller"}
                    content={it.status === "ING" ? "미수료" : "수료증"}
                />
            );
        } else {
            return (
                <a target="_blank" href={it.url} rel="noreferrer">
                    <Button
                        className={`${style.row_btn} ${style.complete_btn}`}
                        type={"SQUARE"}
                        size={"small"}
                        fontSize={"smaller"}
                        content={"수료증"}
                    />
                </a>
            );
        }
    };

    const ClassListPC = () => {
        return (
            <TableWrapper>
                {data.lecture_list.map((it, idx) => (
                    <div key={`completelectureitem:${idx}`} className={style.complelte_list}>
                        <Link href={`/class/complete/${it.id}/board`}>
                            <div className={style.title_wrapper}>
                                <Typo
                                    content={(
                                        data.total_count -
                                        (parseInt(pageState.state.page) - 1) * 7 -
                                        idx
                                    ).toString()}
                                    color="brown_font"
                                    type="TEXT"
                                    size="small"
                                />
                                <div className={style.title}>
                                    <Typo content={it.title} color="brown_font" type="TEXT" size="medium" />
                                </div>
                            </div>
                        </Link>
                        <div className={style.detail_wrapper}>
                            <Typo
                                content={`${DateController.getFormatedDate(
                                    "YYYY/MM/DD",
                                    it.start_date
                                )}~${DateController.getFormatedDate("YYYY/MM/DD", it.end_date)}`}
                                size="small"
                                color="gray_accent"
                                type="TEXT"
                                className={style.margin_style}
                            />
                            {it.status === "ING" ? (
                                <Button
                                    className={`${style.row_btn} ${style.ing_btn}`}
                                    type={"SQUARE"}
                                    size={"small"}
                                    fontSize={"smaller"}
                                    content={it.status === "ING" ? "미수료" : "수료증"}
                                />
                            ) : (
                                <a target="_blank" href={it.url} rel="noreferrer">
                                    <Button
                                        className={`${style.row_btn} ${style.complete_btn}`}
                                        type={"SQUARE"}
                                        size={"small"}
                                        fontSize={"smaller"}
                                        content={"수료증"}
                                    />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </TableWrapper>
        );
    };

    return (
        <ListPageLayout
            headerLeft={<ListSelect categoryType={"CLASS"} />}
            headerRight={<ListSearchbar />}
            footer={<ListPagination total_count={data.total_count} required_count={7} />}
        >
            <ClassListPC />
        </ListPageLayout>
    );
};

export default ClassCompleteList;
