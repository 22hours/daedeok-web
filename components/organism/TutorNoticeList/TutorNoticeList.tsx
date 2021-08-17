import React, { useRef, useState, useEffect } from "react";
import { res_types } from "@global_types";
import style from "./TutorNoticeList.module.scss";
import Link from "next/link";
//ui
import TableRow from "@ui/board/TableRow";
import UseDate from "lib/hooks/useDate";
import TableWrapper from "@ui/board/TableWrapper";
import Pagination from "@ui/pagination/Pagination";
import SearchBar from "@ui/input/SearchBar";
import Button from "@ui/buttons/Button";
//store
import { useAuthStore } from "store/AuthStore";
import { useListCommonStore } from "store/ListCommonStore";

// List
import ListSearchbar from "components/molecule/ListSearchbar/ListSearchbar";
import ListPagination from "components/molecule/ListPagination/ListPagination";
import ListPageLayout from "components/layout/ListPageLayout";

type State = res_types.tutorNoticeListItem;

// ELEMENT TYPES
const initState: State = {
    notice_list: [],
    total_count: 0,
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
        <ListPageLayout
            headerRight={<ListSearchbar />}
            control_row={
                <Link href={`/class/notice/new`} passHref>
                    <Button
                        type="SQUARE"
                        content="글쓰기"
                        backgroundColor="yellow_accent"
                        fontSize="smaller"
                        size="small"
                        color="white"
                        className={style.new_btn}
                    />
                </Link>
            }
            footer={<ListPagination total_count={listState.total_count} />}
        >
            <TableWrapper>
                {listState.notice_list.map((it, idx) => (
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
        </ListPageLayout>
    );
};
export default TutorNoticeList;
