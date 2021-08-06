import React, { useRef, useEffect, useReducer } from "react";
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

type State = {
    lecture_list_item: res_types.classJoinItem;
    now_page: number;
    now_category: string;
    now_keyword: string;
};

// ELEMENT TYPES
const initState: State = {
    lecture_list_item: { lecture_list: [], total_count: 0, total_page: 0 },
    now_page: 0,
    now_category: "ALL",
    now_keyword: "",
};
// ACTION TYPES
type Action =
    | { type: "SET_CLASS_LIST"; data: State["lecture_list_item"] }
    | { type: "SET_NOW_STATE"; data: { now_page: number; now_category: string; now_keyword: string } };

// REDUCER
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_CLASS_LIST": {
            return {
                ...state,
                lecture_list_item: action.data,
            };
        }
        case "SET_NOW_STATE": {
            const { now_page, now_category, now_keyword } = action.data;
            return {
                ...state,
                now_category: now_category,
                now_page: now_page,
                now_keyword: now_keyword,
            };
        }
        default:
            throw new Error("CLASS JOIN REDUCER ERROR");
    }
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
    const { clientSideApi } = useAuthStore();
    const [classJoinData, dispatch] = useReducer(reducer, initState);

    const searchRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    //카테고리필터 가능 & 페이지 이동
    const getClassListData = async () => {
        const req =
            classJoinData.now_category === "ALL"
                ? classJoinData.now_keyword === ""
                    ? { page: classJoinData.now_page, required_count: 7 }
                    : { keyword: classJoinData.now_keyword, page: classJoinData.now_page, required_count: 7 }
                : classJoinData.now_keyword === ""
                ? { category: classJoinData.now_category, page: classJoinData.now_page, required_count: 7 }
                : {
                      keyword: classJoinData.now_keyword,
                      category: classJoinData.now_category,
                      page: classJoinData.now_page,
                      required_count: 7,
                  };
        const res = await clientSideApi("GET", "MAIN", "LECTURE_FIND_POSSIBLE", undefined, req);
        if (res.result === "SUCCESS") {
            var data = res.data;
            dispatch({ type: "SET_CLASS_LIST", data: data });
        }
    };

    const handleSearchClass = () => {
        const categoryUri = `&category=${classJoinData.now_category}`;
        const keywordUri =
            //@ts-ignore
            searchRef.current.value;
        const uri = `?page=1${categoryUri}&keyword=${keywordUri}`;
        Router.push(uri);
        //@ts-ignore
        searchRef.current.value = "";
    };

    //라우팅 변경 시 category, page 변경
    useEffect(() => {
        var category = router.query.category ? router.query.category : "ALL";
        var page = router.query.page ? router.query.page : 1;
        var keyword = router.query.keyword ? router.query.keyword : "";

        dispatch({
            type: "SET_NOW_STATE",
            //@ts-ignore
            data: { now_page: page - 1, now_category: category, now_keyword: keyword },
        });
    }, [router.query]);

    useEffect(() => {
        getClassListData();
    }, [classJoinData.now_page, classJoinData.now_category, classJoinData.now_keyword]);

    const categoryiList = [
        {
            value: "ALL",
            name: "전체",
        },
        {
            value: "교육부",
            name: "교육부",
        },
        {
            value: "유아부",
            name: "유아부",
        },
    ];

    //수강신청
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
                <Select
                    form="box"
                    placeholder={"카테고리별 보기"}
                    onChange={({ target: { value } }) => {
                        const uri = `?page=${classJoinData.now_page + 1}&category=${value}`;
                        Router.push(uri);
                    }}
                    option_list={categoryiList}
                    className={style.select}
                />
                <SearchBar
                    className={style.search}
                    form="box"
                    placeholder={"검색어를 입력하세요"}
                    refs={searchRef}
                    onEnterKeyDown={handleSearchClass}
                />
            </div>
            <TableWrapper>
                {classJoinData.lecture_list_item.lecture_list.map((it, idx) => (
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
                                <JoinButton state={it.status} idx={it.id} handleClassJoin={handleClassJoin} />
                            </div>
                        </TableRow>
                    </div>
                ))}
            </TableWrapper>
            <div>
                <Pagination
                    totalCount={classJoinData.lecture_list_item.total_count}
                    handleChange={(page: number) => {
                        const categoryUri = `&category=${classJoinData.now_category}`;
                        const keywordUri =
                            classJoinData.now_keyword === "" ? "" : `&keyword=${classJoinData.now_keyword}`;
                        const uri = `?page=${page + 1}${categoryUri}${keywordUri}`;
                        Router.push(uri);
                    }}
                    pageNum={classJoinData.now_page}
                    requiredCount={7}
                />
            </div>
        </div>
    );
};
export default ClassJoin;
