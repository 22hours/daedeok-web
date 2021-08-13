import style from "./QnaList.module.scss";
import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";
import Button from "@ui/buttons/Button";
import SearchBar from "@ui/input/SearchBar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import { useListCommonStore } from "store/ListCommonStore";
import Pagination from "@ui/pagination/Pagination";
import useClassCategory from "lib/hooks/useClassCategory";
import Select from "@ui/input/Select";
type Props = {};
type QuestionItem = {
    id: string;
    category: string;
    content: string;
    create_date: string;
};
type State = {
    qna_list: QuestionItem[];
    total_count: string;
    total_page?: string;
};
const initState: State = {
    qna_list: [],
    total_count: "0",
};
const QnaList = (props: Props) => {
    const [data, setData] = useState<State>(initState);
    const { state, changePage, changeKeyword, changeCategory } = useListCommonStore();
    const { clientSideApi } = useAuthStore();

    const getData = async () => {
        if (state.isLoadEnd) {
            const res = await clientSideApi("GET", "MAIN", "QNA_FIND", undefined, {
                category: state.category === "ALL" ? undefined : state.category,
                keyword: state.keyword,
                page: parseInt(state.page) - 1,
                required_count: 7,
            });
            if (res.result === "SUCCESS") {
                setData({ ...res.data });
            }
        }
    };

    useEffect(() => {
        if (state.isLoadEnd) {
            getData();
        }
    }, [state]);

    if (data === null) {
        return <div>LOAD</div>;
    } else {
        return (
            <div className={style.container}>
                <div className={style.head}>
                    <Select
                        value={state.category || "ALL"}
                        onChange={(e) => {
                            changeCategory(e.target.value);
                        }}
                        form="box"
                        placeholder={"카테고리별 보기"}
                        option_list={[{ name: "전체", value: "ALL" }].concat([])}
                        className={style.select}
                    />
                    <div></div>
                    <SearchBar
                        className={style.search}
                        form="box"
                        placeholder={"검색어를 입력하세요"}
                        initialValue={state.keyword}
                        onEnterKeyDown={(e) => changeKeyword(e.target.value)}
                    />
                </div>
                <div className={style.body}>
                    <TableWrapper>
                        {/* {data.qna_list.map((it, idx) => (
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
                        ))} */}
                    </TableWrapper>
                </div>
                <div className={style.footer1}></div>
                <div className={style.footer2}>
                    <Pagination
                        totalCount={parseInt(data.total_count)}
                        handleChange={(page: number) => changePage((page + 1).toString())}
                        pageNum={state.page ? parseInt(state.page) - 1 : 0}
                        requiredCount={7}
                    />
                </div>
            </div>
        );
    }
};

export default QnaList;
