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

type State = res_types.classCompleteList;

// ELEMENT TYPES
const initState: State = {
    lecture_list: [],
    total_count: 0,
};

const LectuerCloseCategory = () => {
    const { clientSideApi } = useAuthStore();
    const { state, changeCategory } = useListCommonStore();

    const { categoryOptionList } = useClassCategory();

    return (
        <Select
            value={state.category || "ALL"}
            onChange={(e) => {
                changeCategory(e.target.value);
            }}
            form="box"
            placeholder={"카테고리별 보기"}
            option_list={[{ name: "전체", value: "ALL" }].concat(categoryOptionList)}
            className={style.select}
        />
    );
};

const LectureCloseList = (props: { lecture_list: any }) => {
    const router = useRouter();
    const { status } = router.query;
    return (
        <TableWrapper>
            {props.lecture_list?.map((it, idx) => (
                <div key={idx}>
                    <TableRow
                        idx={it.id}
                        title={it.title}
                        category={it.category}
                        date={UseDate("YYYY-MM-DD", it.start_date) + "~" + UseDate("YYYY-MM-DD", it.end_date)}
                        href={`/lecture/${status}/detail/${it.id}`}
                    ></TableRow>
                </div>
            ))}
        </TableWrapper>
    );
};

type Props = {
    status: "FINISH" | "OPEN";
};

const LectureList = ({ status }: Props) => {
    const { clientSideApi } = useAuthStore();
    const { state, changePage, changeKeyword } = useListCommonStore();

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
        <div>
            <div className={style.header_title}>
                <Typo type="HEADER" size="h3" content={status === "OPEN" ? "현재 진행중인 강의" : "종료된 강의"} />
            </div>
            <div className={style.top_form}>
                <LectuerCloseCategory />
                <SearchBar
                    className={style.search}
                    form="box"
                    placeholder={"검색어를 입력하세요"}
                    refs={searchRef}
                    onEnterKeyDown={(e) => changeKeyword(e.target.value)}
                />
            </div>
            <LectureCloseList lecture_list={listState.lecture_list} />
            <div>
                <Pagination
                    totalCount={listState.total_count}
                    handleChange={(page: number) => changePage((page + 1).toString())}
                    pageNum={state.page ? parseInt(state.page) - 1 : 0}
                    requiredCount={7}
                />
            </div>
        </div>
    );
};

export default LectureList;
