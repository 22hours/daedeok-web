import React, { useRef, useEffect, useState } from "react";
import { res_types } from "@global_types";
//component
import TableRow from "@ui/board/TableRow";
import Button from "@ui/buttons/Button";
import UseDate from "lib/hooks/useDate";
import TableWrapper from "@ui/board/TableWrapper";
import style from "./ClassJoin.module.scss";
import Pagination from "@ui/pagination/Pagination";
import SearchBar from "@ui/input/SearchBar";
import Select from "@ui/input/Select";
import Typo from "@ui/Typo";
import Link from "next/link";
//store
import { useAuthStore } from "store/AuthStore";
import { useListCommonStore } from "store/ListCommonStore";
import { useAlert } from "store/GlobalAlertStore";

// List
import ListSelect from "components/molecule/ListSelect/ListSelect";
import ListSearchbar from "components/molecule/ListSearchbar/ListSearchbar";
import ListPagination from "components/molecule/ListPagination/ListPagination";
import ListPageLayout from "components/layout/ListPageLayout";
import WindowController from "lib/client/windowController";
import { useConfirm } from "store/GlobalConfirmStore";

type State = res_types.classPossibleList;

// ELEMENT TYPES
const initState: State = {
    lecture_list: [],
    total_count: 0,
};

const JoinButton = ({ state, idx, handleClassJoin }) => {
    switch (state) {
        case "POSSIBLE":
            return (
                <Button
                    content={"수강신청"}
                    backgroundColor="brown_base"
                    fontSize="smaller"
                    color="white"
                    alignment="center"
                    size="small"
                    line="inline"
                    type="SQUARE"
                    onClick={() => {
                        handleClassJoin({ idx });
                    }}
                />
            );
        case "IMPOSSIBLE":
            return (
                <Button
                    content={"신청마감"}
                    backgroundColor="gray_accent"
                    fontSize="smaller"
                    color="white"
                    alignment="center"
                    size="small"
                    type="SQUARE"
                    className={style.cursor_none}
                />
            );
        case "ING":
            return (
                <Button
                    content={"수강중"}
                    backgroundColor="yellow_accent"
                    fontSize="smaller"
                    color="white"
                    alignment="center"
                    size="small"
                    type="SQUARE"
                    className={style.cursor_none}
                />
            );
        default:
            return <div></div>;
    }
};

const ClassJoin = () => {
    const { auth, clientSideApi } = useAuthStore();
    const { alertOn, apiErrorAlert } = useAlert();
    const { confirmOn } = useConfirm();
    const { state, changePage, changeKeyword } = useListCommonStore();
    const [listState, setListState] = useState<State>(initState);
    const searchRef = useRef<HTMLInputElement | null>(null);

    const [mode, setMode] = useState<"pc" | "mobile">("pc");

    const setModeByWindowSize = () => {
        var width = WindowController.getWindowSize();
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

    // 카테고리필터 가능 & 페이지 이동
    const getClassListData = async () => {
        if (state.isLoadEnd) {
            const res = await clientSideApi("GET", "MAIN", "LECTURE_FIND_POSSIBLE", undefined, {
                category: state.category === "ALL" ? undefined : state.category,
                keyword: state.keyword,
                page: parseInt(state.page) - 1,
                required_count: 20,
            });
            if (res.result === "SUCCESS") {
                var data = res.data;
                setListState({ ...res.data });
            }
        }
    };

    useEffect(() => {
        if (auth !== null) {
            if (state.isLoadEnd) {
                getClassListData();
                if (searchRef.current) {
                    if (state.keyword !== searchRef.current.value) {
                        searchRef.current.value = "";
                    }
                }
            }
        }
    }, [state, auth]);

    // 수강신청
    const handleClassJoin = async (idx) => {
        console.log(idx);
        const res_data = await clientSideApi("POST", "MAIN", "LECTURE_JOIN", { lecture_id: idx });
        if (res_data.result === "SUCCESS") {
            confirmOn({
                message: `수강신청이 완료되었습니다`,
                onSuccess: () => location.reload(),
            });
        } else {
            const msg = res_data?.msg;
            apiErrorAlert(msg);
        }
    };

    return (
        <ListPageLayout
            headerLeft={<ListSelect categoryType={"CLASS"} />}
            headerRight={<ListSearchbar />}
            footer={<ListPagination total_count={listState.total_count} required_count={20} />}
        >
            <TableWrapper>
                {listState.lecture_list.map((it, idx) => (
                    <div key={`class_join${idx}`}>
                        {mode === "pc" ? (
                            <div className={style.class_join_list}>
                                <Link href={`/class/join/detail/${it.id}`} passHref>
                                    <div className={style.content_wrapper}>
                                        <div className={style.title}>
                                            <Typo type="TEXT" content={it.title} color="brown_font" size="medium" />
                                        </div>
                                        <div className={style.detail_item_list}>
                                            <div className={style.category}>
                                                <Typo
                                                    type="TEXT"
                                                    content={it.category}
                                                    color="red_accent"
                                                    size="small"
                                                />
                                            </div>
                                            <div className={style.date}>
                                                <Typo
                                                    type="TEXT"
                                                    content={
                                                        UseDate("YYYY-MM-DD", it.start_date) +
                                                        "~" +
                                                        UseDate("YYYY-MM-DD", it.end_date)
                                                    }
                                                    color="brown_font"
                                                    size="small"
                                                />
                                            </div>
                                            <div className={style.limit}>
                                                <Typo
                                                    type="TEXT"
                                                    content={`${it.student_num}/${
                                                        it.student_limit === -1 ? "무제한" : it.student_limit
                                                    }`}
                                                    color="brown_font"
                                                    size="small"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className={style.join_btn}>
                                    <JoinButton
                                        state={it.status}
                                        idx={it.id}
                                        handleClassJoin={() => handleClassJoin(it.id)}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className={style.class_join_list}>
                                <div className={style.title}>
                                    <Link href={`/class/join/detail/${it.id}`} passHref>
                                        <div className={style.title_txt}>
                                            <Typo type="TEXT" content={it.title} color="brown_font" size="medium" />
                                        </div>
                                    </Link>
                                    <div className={style.join_btn}>
                                        <JoinButton
                                            state={it.status}
                                            idx={it.id}
                                            handleClassJoin={() => handleClassJoin(it.id)}
                                        />
                                    </div>
                                </div>
                                <div className={style.detail_item_list}>
                                    <div className={style.category}>
                                        <Typo type="TEXT" content={it.category} color="red_accent" size="small" />
                                    </div>
                                    <div className={style.footer_item_wrapper}>
                                        <div className={style.date}>
                                            <Typo
                                                type="TEXT"
                                                content={
                                                    UseDate("YYYY-MM-DD", it.start_date) +
                                                    "~" +
                                                    UseDate("YYYY-MM-DD", it.end_date)
                                                }
                                                color="gray_accent"
                                                size="small"
                                            />
                                        </div>
                                        <div className={style.limit}>
                                            <Typo
                                                type="TEXT"
                                                content={`${it.student_num}/${
                                                    it.student_limit === -1 ? "무제한" : it.student_limit
                                                }`}
                                                color="gray_accent"
                                                size="small"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </TableWrapper>
        </ListPageLayout>
    );
};
export default ClassJoin;
