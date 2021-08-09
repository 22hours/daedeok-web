import React, { useRef, useEffect, useReducer, useState } from "react";
import Router from "next/router";
import { useRouter } from "next/router";
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

//store
import { useAuthStore } from "store/AuthStore";
import { useListCommonStore } from "store/ListCommonStore";
import { stringify } from "querystring";

type State = res_types.classJoinItem;

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

const ClassJoinSelect = () => {
    const [optionList, setOptionList] = useState<{ name: string; value: string }[]>([]);
    const { clientSideApi } = useAuthStore();
    const { state, changeCategory } = useListCommonStore();

    const getOptionListData = async () => {
        const res = await clientSideApi("GET", "MAIN", "CATEGORY_FIND", undefined, {
            page: 0,
            required_count: 100000,
        });
        if (res.result === "SUCCESS") {
            // setOptionList(res.data.category_list);
            setOptionList([
                { name: "유아부", value: "유아부" },
                { name: "교육부", value: "교육부" },
            ]);
        } else {
            alert(res.msg);
        }
    };

    useEffect(() => {
        getOptionListData();
    }, []);

    return (
        <Select
            value={state.category || "ALL"}
            onChange={(e) => {
                changeCategory(e.target.value);
            }}
            form="box"
            placeholder={"카테고리별 보기"}
            option_list={[{ name: "전체", value: "ALL" }].concat(optionList)}
            className={style.select}
        />
    );
};

const ClassList = (props: { lecture_list: any; handleClassJoin: any }) => {
    return (
        <TableWrapper>
            {props.lecture_list.map((it, idx) => (
                <div key={idx}>
                    <TableRow
                        title={it.title}
                        category={it.category}
                        date={UseDate("YYYY-MM-DD", it.start_date) + "~" + UseDate("YYYY-MM-DD", it.end_date)}
                        studentLimit={{
                            student_limit: it.student_limit === -1 ? "무제한" : it.student_limit,
                            student_num: it.student_num,
                        }}
                        href={`/class/join/detail/${it.id}`}
                    >
                        <div style={{ width: "90px", marginRight: "20px" }}>
                            <JoinButton state={it.status} idx={it.id} handleClassJoin={props.handleClassJoin} />
                        </div>
                    </TableRow>
                </div>
            ))}
        </TableWrapper>
    );
};

const ClassJoin = () => {
    const { clientSideApi } = useAuthStore();
    const { state, changePage, changeKeyword } = useListCommonStore();

    const [listState, setListState] = useState<State>(initState);

    const searchRef = useRef<HTMLInputElement | null>(null);

    // 카테고리필터 가능 & 페이지 이동
    const getClassListData = async () => {
        if (state.isLoadEnd) {
            const res = await clientSideApi("GET", "MAIN", "LECTURE_FIND_POSSIBLE", undefined, {
                category: state.category === "ALL" ? undefined : state.category,
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

    // 수강신청
    const handleClassJoin = async ({ idx }) => {
        const res_data = await clientSideApi(
            "POST",
            "MAIN",
            "LECTURE_JOIN",
            { lecture_id: idx },
            {
                lecture_id: idx,
            }
        );
        if (res_data.result === "SUCCESS") {
            alert("수강신청이 완료되었습니다.");
            getClassListData();
        } else {
            alert("실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div>
            <div className={style.top_form}>
                <ClassJoinSelect />
                <SearchBar
                    className={style.search}
                    form="box"
                    placeholder={"검색어를 입력하세요"}
                    refs={searchRef}
                    onEnterKeyDown={(e) => changeKeyword(e.target.value)}
                />
            </div>
            <ClassList lecture_list={listState.lecture_list} handleClassJoin={handleClassJoin} />
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
export default ClassJoin;
