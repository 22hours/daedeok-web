import { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import { useListCommonStore } from "store/ListCommonStore";
import style from "./ClassCloseList.module.scss";
import Select from "@ui/input/Select";
import ClassCategorySelect from "components/molecule/ClassCategorySelect/ClassCategorySelect";
import SearchBar from "@ui/input/SearchBar";
import TableWrapper from "@ui/board/TableWrapper";
import Pagination from "@ui/pagination/Pagination";
import TableRow from "@ui/board/TableRow";
import DateController from "lib/client/dateController";
import useClassCategory from "lib/hooks/useClassCategory";

// List
import ListSearchbar from "components/molecule/ListSearchbar/ListSearchbar";
import ListSelect from "components/molecule/ListSelect/ListSelect";
import ListPagination from "components/molecule/ListPagination/ListPagination";
import ListPageLayout from "components/layout/ListPageLayout";

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
        <ListPageLayout
            headerLeft={<ListSelect categoryType={"CLASS"} />}
            headerRight={<ListSearchbar />}
            footer={<ListPagination total_count={data.total_count} />}
        >
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
        </ListPageLayout>
    );
};

export default ClassCloseList;
