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
import Typo from "@ui/Typo";
import DateController from "lib/client/dateController";

type State = res_types.tutorNoticeListItem;

// ELEMENT TYPES
const initState: State = {
    notice_list: [],
    total_count: 0,
};

const TutorNoticeList = () => {
    const { auth, clientSideApi } = useAuthStore();
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
        if (auth !== null) {
            if (state.isLoadEnd) {
                getTutorNoticeData();
                if (searchRef.current) {
                    if (state.keyword !== searchRef.current.value) {
                        searchRef.current.value = "";
                    }
                }
            }
        }
    }, [state, auth]);

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
            footer={<ListPagination total_count={listState.total_count} required_count={7} />}
        >
            <TableWrapper>
                {listState.notice_list.map((it, idx) => (
                    <div key={`noticelistitem${idx}`}>
                        <Link href={`/class/notice/detail/${it.id}`} passHref>
                            <div className={style.list_container}>
                                <div className={style.title_wrapper}>
                                    <div className={style.idx_typo}>
                                        <Typo
                                            type="TEXT"
                                            size="small"
                                            content={it.id.toString()}
                                            color={"brown_font"}
                                        />
                                    </div>
                                    <div className={style.list_title}>
                                        <Typo type="TEXT" size="medium" content={it.title} color={"brown_font"} />
                                    </div>
                                    <div className={style.list_author}>
                                        <Typo type="TEXT" size="small" content={it.author} color={"gray_accent"} />
                                    </div>
                                </div>
                                <div className={style.info_wrapper}>
                                    <Typo
                                        content={DateController.getFormatedDate("YYYY-MM-DD", it.create_date)}
                                        type="TEXT"
                                        size="small"
                                        color="gray_accent"
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </TableWrapper>
        </ListPageLayout>
    );
};
export default TutorNoticeList;
