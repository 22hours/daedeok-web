import React, { useRef } from "react";
import TableRow from "@ui/board/TableRow";
import Button from "@ui/buttons/Button";
import UseDate from "lib/hooks/useDate";
import TableWrapper from "@ui/board/TableWrapper";
import style from "./ClassJoin.module.scss";
import Pagination from "@ui/pagination/Pagination";
import SearchBar from "@ui/input/SearchBar";
import Select from "@ui/input/Select";
import Router from "next/router";

//store
import { useAuthStore } from "store/AuthStore";
import { useStoreState, useStoreDispatch } from "store/ClassJoinListStore";

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
    const data = useStoreState();
    const dispatch = useStoreDispatch();
    const searchRef = useRef<HTMLInputElement | null>(null);

    // const getSearchClassListData = async () => {
    //     const req =
    //         state.now_category === "ALL"
    //             ? { keyword: "dd", page: state.now_page, required_count: 7 }
    //             : { keyword: "dd", category: state.now_category, page: state.now_page, required_count: 7 };

    //     const res = await clientSideApi("GET", "MAIN", "LECTURE_FIND_POSSIBLE", undefined, req);
    //     if (res.result === "SUCCESS") {
    //         var data = res.data;
    //         dispatch({ type: "SET_CLASS_LIST", data: data });
    //     }
    // };

    const cateogryList = [
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
                        console.log(value);
                        const uri = `?page=${data.now_page + 1}&category=${value}`;
                        Router.push(uri);
                    }}
                    option_list={cateogryList}
                    className={style.select}
                />
                <SearchBar className={style.search} form="box" placeholder={"검색어를 입력하세요"} refs={searchRef} />
            </div>
            <TableWrapper>
                {data.lecture_list_item.lecture_list.map((it, idx) => (
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
                    totalCount={data.lecture_list_item.total_count}
                    handleChange={(page: number) => {
                        const uri = `?page=${page + 1}&category=${data.now_category}`;
                        Router.push(uri);
                    }}
                    pageNum={data.now_page}
                    requiredCount={7}
                />
            </div>
        </div>
    );
};
export default ClassJoin;
