import { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import { useListCommonStore } from "store/ListCommonStore";
import style from "./ClassCloseList.module.scss";

import ClassCategorySelect from "components/molecule/ClassCategorySelect/ClassCategorySelect";
import SearchBar from "@ui/input/SearchBar";
import TableWrapper from "@ui/board/TableWrapper";
import Pagination from "@ui/pagination/Pagination";
import TableRow from "@ui/board/TableRow";
import DateController from "lib/client/dateController";
type State = {
    total_count: number;
    total_page: number;
    lecture_list: ClassItem[];
};
type ClassItem = {
    id: string;
    title: string;
    category: string;
    start_date: string;
    end_date: string;
    student_limit: string;
    student_num: string;
};

const initState: State = {
    total_count: 0,
    total_page: 0,
    lecture_list: [],
};

const ClassCloseList = () => {
    const pageState = useListCommonStore();
    const [data, setData] = useState<State>(initState);

    const { clientSideApi } = useAuthStore();
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_FIND", undefined, {
            status: "FINISH",
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

    useEffect(() => {
        if (pageState.state.isLoadEnd) {
            getData();
        }
    }, [pageState.state]);

    return (
        <div className={style.container}>
            <div className={style.head}>
                <ClassCategorySelect category={pageState.state.category} changeCategory={pageState.changeCategory} />
                <div></div>
                <SearchBar
                    className={style.search}
                    form="box"
                    placeholder={"검색어를 입력하세요"}
                    onEnterKeyDown={(e) => pageState.changeKeyword(e.target.value)}
                />
            </div>
            <div className={style.body}>
                <TableWrapper>
                    {data.lecture_list.map((it, idx) => (
                        <TableRow
                            href={`/class/close/${it.id}/board`}
                            key={`closelectureitem:${idx}`}
                            idx={idx + 1}
                            title={it.title}
                            category={it.category}
                            date={`${DateController.getFormatedDate(
                                "YYYY/MM/DD",
                                it.start_date
                            )}~${DateController.getFormatedDate("YYYY/MM/DD", it.end_date)}`}
                        />
                    ))}
                </TableWrapper>
            </div>
            <div className={style.footer}>
                <Pagination
                    totalCount={data.total_count}
                    handleChange={(page: number) => pageState.changePage((page + 1).toString())}
                    pageNum={pageState.state.page ? parseInt(pageState.state.page) - 1 : 0}
                    requiredCount={7}
                />
            </div>
        </div>
    );
};

export default ClassCloseList;
