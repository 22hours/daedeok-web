import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
//controller
import DateController from "lib/client/dateController";
//component
import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";
import style from "./TutorClassBoardList.module.scss";
import Pagination from "@ui/pagination/Pagination";
import Select from "@ui/input/Select";
import Button from "@ui/buttons/Button";
//store
import { useAuthStore } from "store/AuthStore";
import { useListCommonStore } from "store/ListCommonStore";
import useClassBoardCategory from "lib/hooks/useClassBoardCategory";

type State = {
    board_list: Array<{
        id: number;
        title: string;
        category: string;
        create_date: string;
        author: string;
    }>;
    total_count: number;
    total_pate?: number;
};

const initState: State = {
    board_list: [],
    total_count: 0,
};

const BoardList = (props: { board_list: any; lectureId: string }) => {
    return (
        <TableWrapper>
            {props.board_list.map((it, idx) => (
                <div key={idx}>
                    <Link href={`/class/open/${props.lectureId}/board/detail/${it.id}`} passHref>
                        <TableRow
                            idx={idx + 1}
                            title={it.title}
                            category={it.category}
                            author={it.author}
                            date={DateController.getFormatedDate("YYYY-MM-DD", it.create_date)}
                        ></TableRow>
                    </Link>
                </div>
            ))}
        </TableWrapper>
    );
};
const BoardSelect = () => {
    const { clientSideApi } = useAuthStore();
    const { state, changeCategory } = useListCommonStore();
    const { categoryOptionList } = useClassBoardCategory();

    return (
        <Select
            value={state.category || "ALL"}
            onChange={(e) => {
                changeCategory(e.target.value);
            }}
            form="box"
            placeholder={"카테고리별 보기"}
            option_list={[{ name: "전체", value: "ALL" }].concat(categoryOptionList || [])}
            className={style.select}
        />
    );
};
const TutorClassBoardList = () => {
    const { clientSideApi } = useAuthStore();
    const { state, changePage } = useListCommonStore();
    const [boardState, setBoardState] = useState<State>(initState);

    const router = useRouter();
    const lectureId = router.asPath.split("/")[3];

    const getBoardListData = async () => {
        const res = await clientSideApi(
            "GET",
            "MAIN",
            "LECTURE_BOARD_FIND",
            { lecture_id: lectureId },
            {
                category: state.category === "ALL" ? undefined : state.category,
                keyword: state.keyword,
                page: parseInt(state.page) - 1,
                required_count: 7,
            }
        );
        if (res.result === "SUCCESS") {
            setBoardState(res.data);
        }
    };

    useEffect(() => {
        getBoardListData();
    }, [state]);

    return (
        <div>
            <div className={style.top_form}>
                <BoardSelect />
            </div>
            <BoardList board_list={boardState.board_list} lectureId={lectureId} />
            <div className={style.btn_wrapper}>
                <Link href={`/class/open/${lectureId}/board/new`} passHref>
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
            <div>
                <Pagination
                    totalCount={boardState.total_count}
                    handleChange={(page: number) => changePage((page + 1).toString())}
                    pageNum={state.page ? parseInt(state.page) - 1 : 0}
                    requiredCount={7}
                />
            </div>
        </div>
    );
};
export default TutorClassBoardList;
