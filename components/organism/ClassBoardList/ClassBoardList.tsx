import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
//controller
import DateController from "lib/client/dateController";
//component
import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";
import style from "./ClassBoardList.module.scss";
import Select from "@ui/input/Select";
import Button from "@ui/buttons/Button";
//store
import { useAuthStore } from "store/AuthStore";
import { useListCommonStore } from "store/ListCommonStore";
import useClassBoardCategory from "lib/hooks/useClassBoardCategory";

// List
import ListSelect from "components/molecule/ListSelect/ListSelect";
import ListPagination from "components/molecule/ListPagination/ListPagination";
import ListPageLayout from "components/layout/ListPageLayout";

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

const ClassBoardList = () => {
    const { clientSideApi } = useAuthStore();
    const { state } = useListCommonStore();
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
        <ListPageLayout
            headerLeft={<ListSelect categoryType={"CLASS_BOARD"} />}
            control_row={
                <Link href={`/class/open/${lectureId}/board/new`} passHref>
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
            footer={<ListPagination total_count={boardState.total_count} />}
        >
            <TableWrapper>
                {boardState.board_list.map((it, idx) => (
                    <div key={idx}>
                        <Link href={`/class/open/${lectureId}/board/detail/${it.id}`} passHref>
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
        </ListPageLayout>
    );
};
export default ClassBoardList;
