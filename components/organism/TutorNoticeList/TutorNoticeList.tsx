import React, { useRef, useState, useEffect } from "react";
import { res_types } from "@global_types";
import style from "./TutorNoticeList.module.scss";
//ui
import TableRow from "@ui/board/TableRow";
import UseDate from "lib/hooks/useDate";
import TableWrapper from "@ui/board/TableWrapper";
import Pagination from "@ui/pagination/Pagination";
import SearchBar from "@ui/input/SearchBar";
//store
import { useAuthStore } from "store/AuthStore";
import { useListCommonStore } from "store/ListCommonStore";

type State = res_types.tutorNoticeListItem;

// ELEMENT TYPES
const initState: State = {
    notice_list: [],
    total_count: 0,
};

const NoticeList = (props: { notice_list: any }) => {
    return (
        <TableWrapper>
            {props.notice_list.map((it, idx) => (
                <div key={idx}>
                    <TableRow
                        idx={it.id}
                        title={it.title}
                        date={UseDate("YYYY-MM-DD", it.create_date)}
                        href={`/class/notice/detail/${it.id}`}
                    ></TableRow>
                </div>
            ))}
        </TableWrapper>
    );
};

const TutorNoticeList = () => {
    const { clientSideApi } = useAuthStore();
    const { state, changePage, changeKeyword } = useListCommonStore();
    const [listState, setListState] = useState<State>(initState);
    const searchRef = useRef<HTMLInputElement | null>(null);

    const getTutorNoticeData = async () => {
        if (state.isLoadEnd) {
            const res = await clientSideApi("GET", "MAIN", "TUTOR_NOTICE_FIND", undefined, {
                keyword: state.keyword,
                page: parseInt(state.page) - 1,
                required_count: 7,
            });
            if (res.result === "SUCCESS") {
                setListState({ ...res.data });
            }
        }
    };

    useEffect(() => {
        if (state.isLoadEnd) {
            getTutorNoticeData();
            if (searchRef.current) {
                if (state.keyword !== searchRef.current.value) {
                    searchRef.current.value = "";
                }
            }
        }
    }, [state]);

    return (
        <div>
            <div className={style.top_form}>
                <SearchBar
                    className={style.search}
                    form="box"
                    placeholder={"검색어를 입력하세요"}
                    refs={searchRef}
                    onEnterKeyDown={(e) => changeKeyword(e.target.value)}
                />
            </div>
            <NoticeList notice_list={listState.notice_list} />
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
export default TutorNoticeList;