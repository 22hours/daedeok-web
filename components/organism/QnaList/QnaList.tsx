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

// List
import ListSelect from "components/molecule/ListSelect/ListSelect";
import ListSearchbar from "components/molecule/ListSearchbar/ListSearchbar";
import ListPagination from "components/molecule/ListPagination/ListPagination";
import ListPageLayout from "components/layout/ListPageLayout";

type Props = {};
type QuestionItem = {
    id: string;
    title: string;
    autho: string;
    secret: boolean;
    view: string;
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

const QnaList = (props: Props) => {
    const [data, setData] = useState<State>(initState);
    const { state } = useListCommonStore();
    const { auth, clientSideApi } = useAuthStore();

    const getData = async () => {
        if (state.isLoadEnd) {
            const res = await clientSideApi("GET", "MAIN", "QNA_FIND", undefined, {
                category: state.category === "ALL" ? undefined : state.category,
                keyword: state.keyword,
                page: parseInt(state.page) - 1,
                required_count: 10,
            });
            if (res.result === "SUCCESS") {
                setData({ ...res.data });
            } else {
                alert(res.msg);
            }
        }
    };

    useEffect(() => {
        if (state.isLoadEnd) {
            setData({
                ...data,
                qna_list: [],
            });
            getData();
        }
    }, [state]);

    if (data === null) {
        return <div>LOAD</div>;
    } else {
        return (
            <ListPageLayout
                headerLeft={<ListSelect categoryType={"QNA"} />}
                headerRight={<ListSearchbar />}
                control_row={
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
                }
                footer={<ListPagination total_count={data.total_count} />}
            >
                <TableWrapper>
                    {data.qna_list.map((it, idx) => (
                        <div key={idx}>
                            <Link href={`/acinfo/qna/detail/${it.id}`} passHref>
                                <TableRow
                                    idx={`${it.id}`}
                                    title={`${it.title}`}
                                    date={DateController.getFormatedDate("YYYY-MM-DD", it.create_date)}
                                    category={`${it.secret ? "[비밀글] " : ""}${it.category}`}
                                    view={`조회수 ${it.view}`}
                                ></TableRow>
                            </Link>
                        </div>
                    ))}
                </TableWrapper>
            </ListPageLayout>
        );
    }
};

export default QnaList;
