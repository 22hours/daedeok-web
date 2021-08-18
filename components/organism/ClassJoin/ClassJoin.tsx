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

//store
import { useAuthStore } from "store/AuthStore";
import { useListCommonStore } from "store/ListCommonStore";
import { useAlert } from "store/GlobalAlertStore";

// List
import ListSelect from "components/molecule/ListSelect/ListSelect";
import ListSearchbar from "components/molecule/ListSearchbar/ListSearchbar";
import ListPagination from "components/molecule/ListPagination/ListPagination";
import ListPageLayout from "components/layout/ListPageLayout";

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
    const { clientSideApi } = useAuthStore();
    const { alertOn, apiErrorAlert } = useAlert();
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
    const handleClassJoin = async (idx) => {
        console.log(idx);
        const res_data = await clientSideApi("POST", "MAIN", "LECTURE_JOIN", { lecture_id: idx });
        if (res_data.result === "SUCCESS") {
            alertOn({
                title: "",
                message: "수강신청이 완료되었습니다",
                type: "POSITIVE",
            });
            location.reload();
        } else {
            const msg = res_data?.msg;
            apiErrorAlert(msg);
        }
    };

    return (
        <ListPageLayout
            headerLeft={<ListSelect categoryType={"CLASS"} />}
            headerRight={<ListSearchbar />}
            footer={<ListPagination total_count={listState.total_count} />}
        >
            <TableWrapper>
                {listState.lecture_list.map((it, idx) => (
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
                                <JoinButton
                                    state={it.status}
                                    idx={it.id}
                                    handleClassJoin={() => handleClassJoin(it.id)}
                                />
                            </div>
                        </TableRow>
                    </div>
                ))}
            </TableWrapper>
        </ListPageLayout>
    );
};
export default ClassJoin;
