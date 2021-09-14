import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
//controller
import DateController from "lib/client/dateController";
//component
import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";
import style from "./ClassBoardList.module.scss";
import Typo from "@ui/Typo";
import Button from "@ui/buttons/Button";
//store
import { useAuthStore } from "store/AuthStore";
import { useListCommonStore } from "store/ListCommonStore";

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
                required_count: 10,
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
            footer={<ListPagination total_count={boardState.total_count} required_count={10} />}
        >
            <TableWrapper>
                {boardState.board_list.map((it, idx) => (
                    <div key={idx}>
                        <Link href={`/class/open/${lectureId}/board/detail/${it.id}`} passHref>
                            <div className={style.class_list}>
                                <div className={style.title_wrapper}>
                                    <div className={style.list_id}>
                                        <Typo
                                            type="TEXT"
                                            size="small"
                                            color="brown_font"
                                            content={(
                                                boardState?.total_count -
                                                (parseInt(state?.page) - 1) * 10 -
                                                idx
                                            ).toString()}
                                        />
                                    </div>
                                    <div className={style.list_title}>
                                        <Typo type="TEXT" size="medium" color="brown_font" content={it.title} />
                                    </div>
                                </div>
                                <div className={style.list_detail_wrapper}>
                                    <div className={style.detail_item}>
                                        <Typo type="TEXT" size="small" content={it.category} color={"red_accent"} />
                                    </div>
                                    <div className={style.author}>
                                        <Typo type="TEXT" size="small" content={it.author} color={"gray_accent"} />
                                    </div>
                                    <div className={style.detail_item}>
                                        <Typo
                                            type="TEXT"
                                            size="small"
                                            content={DateController.getFormatedDate("YYYY-MM-DD", it.create_date)}
                                            color={"gray_accent"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </TableWrapper>
        </ListPageLayout>
    );
};
export default ClassBoardList;
