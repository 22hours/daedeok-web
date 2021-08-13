import style from "./QnaList.module.scss";
import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";
import Button from "@ui/buttons/Button";
import SearchBar from "@ui/input/SearchBar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import { useListCommonStore } from "store/ListCommonStore";
import Pagination from "@ui/pagination/Pagination";
import DateController from "lib/client/dateController";

import Select from "@ui/input/Select";
type Props = {};
type QuestionItem = {
    id: string;
    category: string;
    content: string;
    create_date: string;
};
type State = {
    qna_list: QuestionItem[];
    total_count: number;
    total_page?: number;
};
const initState: State = {
    qna_list: [],
    total_count: 0,
};

const QnaListItem = (props: { qnaList: any }) => {
    return (
        <TableWrapper>
            {props.qnaList.map((it, idx) => (
                <div key={idx}>
                    <Link href={`/acinfo/qna/detail/${it.id}`} passHref>
                        <TableRow
                            idx={it.id}
                            title={it.title}
                            date={DateController.getFormatedDate("YYYY-MM-DD", it.create_date)}
                            category={it.category}
                            view={`조회수 ${it.view}`}
                        ></TableRow>
                    </Link>
                </div>
            ))}
        </TableWrapper>
    );
};

const QnaList = (props: Props) => {
    const [data, setData] = useState<State>(initState);
    const { state, changePage, changeKeyword, changeCategory } = useListCommonStore();
    const { auth, clientSideApi } = useAuthStore();
    const [categoryData, setCategoryData] = useState<Array<{ name: string; value: string }>>([]);

    const getData = async () => {
        if (state.isLoadEnd) {
            const res = await clientSideApi("GET", "MAIN", "QNA_FIND", undefined, {
                category: state.category === "ALL" ? undefined : state.category,
                keyword: state.keyword,
                page: parseInt(state.page) - 1,
                required_count: 7,
            });
            if (res.result === "SUCCESS") {
                setData({ ...res.data });
            }
        }
    };

    const getCategoryData = async () => {
        const res = await clientSideApi("GET", "MAIN", "CATEGORY_QNA");
        if (res.result === "SUCCESS") {
            setCategoryData(
                res.data.map((it) => {
                    return {
                        value: it.category,
                        name: it.category,
                    };
                })
            );
        }
    };

    useEffect(() => {
        if (state.isLoadEnd) {
            getData();
        }
    }, [state]);

    useEffect(() => {
        getCategoryData();
    }, [data]);

    if (data === null) {
        return <div>LOAD</div>;
    } else {
        return (
            <div>
                <div className={style.top_form}>
                    <Select
                        value={state.category || "ALL"}
                        onChange={(e) => {
                            changeCategory(e.target.value);
                        }}
                        form="box"
                        placeholder={"카테고리별 보기"}
                        option_list={[{ name: "전체", value: "ALL" }].concat(categoryData)}
                        className={style.select}
                    />
                    <div></div>
                    <SearchBar
                        className={style.search}
                        form="box"
                        placeholder={"검색어를 입력하세요"}
                        initialValue={state.keyword}
                        onEnterKeyDown={(e) => changeKeyword(e.target.value)}
                    />
                </div>
                <QnaListItem qnaList={data.qna_list} />
                <div className={style.btn_wrapper}>
                    <Link href={`/acinfo/qna/new`} passHref>
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
                        totalCount={data.total_count}
                        handleChange={(page: number) => changePage((page + 1).toString())}
                        pageNum={state.page ? parseInt(state.page) - 1 : 0}
                        requiredCount={7}
                    />
                </div>
            </div>
        );
    }
};

export default QnaList;
