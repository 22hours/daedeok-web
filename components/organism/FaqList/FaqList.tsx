import React, { useRef, useState, useEffect } from "react";
import { res_types } from "@global_types";
import style from "./FaqList.module.scss";
import Link from "next/link";
//ui
import TableWrapper from "@ui/board/TableWrapper";
import Button from "@ui/buttons/Button";
import Typo from "@ui/Typo";
//store
import { useAuthStore } from "store/AuthStore";
import { useListCommonStore } from "store/ListCommonStore";

// List
import ListSearchbar from "components/molecule/ListSearchbar/ListSearchbar";
import ListPagination from "components/molecule/ListPagination/ListPagination";
import ListPageLayout from "components/layout/ListPageLayout";

type State = res_types.faqList;

// ELEMENT TYPES
const initState: State = {
    faq_list: [],
    total_count: 0,
};

const FaqList = () => {
    const { auth, clientSideApi } = useAuthStore();
    const { state } = useListCommonStore();
    const [listState, setListState] = useState<State>(initState);
    const searchRef = useRef<HTMLInputElement | null>(null);

    const getFaqList = async () => {
        if (state.isLoadEnd) {
            const res = await clientSideApi("GET", "MAIN", "FAQ_FIND", undefined, {
                keyword: state.keyword,
                page: parseInt(state.page) - 1,
                required_count: 10,
            });
            if (res.result === "SUCCESS") {
                setListState({ ...res.data });
            }
        }
    };

    useEffect(() => {
        if (state.isLoadEnd) {
            getFaqList();
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
                <>
                    {auth?.role === "ROLE_ADMIN" && (
                        <div className={style.btn_wrapper}>
                            <Link href={`/acinfo/faq/new`} passHref>
                                <Button
                                    type="SQUARE"
                                    content="글쓰기"
                                    backgroundColor="yellow_accent"
                                    fontSize="smaller"
                                    size="smaller"
                                    color="white"
                                    className={style.new_btn}
                                />
                            </Link>
                        </div>
                    )}
                </>
            }
            footer={<ListPagination total_count={listState.total_count} required_count={7} />}
        >
            <TableWrapper>
                {listState.faq_list.map((it, idx) => (
                    <div key={`faqitem${idx}`}>
                        <Link href={`/acinfo/faq/detail/${it.id}`} passHref>
                            <div className={style.faq_list_wrapper}>
                                <div className={style.list_id}>
                                    <Typo type="TEXT" size="small" content={it.id.toString()} color={"brown_font"} />
                                </div>
                                <div className={style.list_title}>
                                    <Typo type="TEXT" size="medium" content={it.title} color={"brown_font"} />
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </TableWrapper>
        </ListPageLayout>
    );
};
export default FaqList;
