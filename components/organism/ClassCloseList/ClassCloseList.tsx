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
import Link from "next/link";
// List
import ListSearchbar from "components/molecule/ListSearchbar/ListSearchbar";
import ListSelect from "components/molecule/ListSelect/ListSelect";
import ListPagination from "components/molecule/ListPagination/ListPagination";
import ListPageLayout from "components/layout/ListPageLayout";
import Typo from "@ui/Typo";

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
        const res = await clientSideApi("GET", "MAIN", "LECTURE_FIND_FINISH", undefined, {
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
            footer={<ListPagination total_count={data.total_count} required_count={7} />}
        >
            <TableWrapper>
                {data.lecture_list?.map((it, idx) => (
                    <div key={`lectureitem${idx}`}>
                        <Link href={`/class/close/${it.id}/board`} passHref>
                            <div className={style.list_wrapper}>
                                <div className={style.title_wrapper}>
                                    <div className={style.list_id}>
                                        <Typo
                                            type="TEXT"
                                            size="small"
                                            content={(
                                                data.total_count -
                                                (parseInt(pageState.state.page) - 1) * 10 -
                                                idx
                                            ).toString()}
                                            color={"brown_font"}
                                        />
                                    </div>
                                    <div className={style.list_title}>
                                        <Typo type="TEXT" size="medium" content={it.title} color={"brown_font"} />
                                    </div>
                                </div>
                                <div className={style.detail_item_list}>
                                    <div className={`${style.category_item} ${style.detail_item}`}>
                                        <Typo content={it.category} type="TEXT" size="small" color="red_accent" />
                                    </div>
                                    <div className={`${style.date_item} ${style.detail_item}`}>
                                        <Typo
                                            content={`${DateController.getFormatedDate(
                                                "YYYY/MM/DD",
                                                it.start_date
                                            )}~${DateController.getFormatedDate("YYYY/MM/DD", it.end_date)}`}
                                            type="TEXT"
                                            size="small"
                                            color="gray_accent"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </TableWrapper>
        </ListPageLayout>
    );
};

export default ClassCloseList;
