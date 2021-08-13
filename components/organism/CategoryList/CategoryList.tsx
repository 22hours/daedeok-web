import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";
import Button from "@ui/buttons/Button";
import SearchBar from "@ui/input/SearchBar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import { useListCommonStore } from "store/ListCommonStore";
import style from "./CategoryList.module.scss";
import Pagination from "@ui/pagination/Pagination";

type Props = {};
type CategoryItem = {
    id: string;
    category: string;
    content: string;
    create_date: string;
};
type State = {
    category_list: CategoryItem[];
    total_count: string;
    total_page?: string;
};
const initState: State = {
    category_list: [],
    total_count: "0",
};
const CategoryList = (props: Props) => {
    const [data, setData] = useState<State>(initState);

    const { state, changePage, changeKeyword } = useListCommonStore();
    const { clientSideApi } = useAuthStore();

    const getData = async () => {
        if (state.isLoadEnd) {
            const res = await clientSideApi("GET", "MAIN", "CATEGORY_FIND", undefined, {
                keyword: state.keyword,
                page: parseInt(state.page) - 1,
                required_count: 7,
            });
            if (res.result === "SUCCESS") {
                setData({ ...res.data });
            }
        }
    };

    useEffect(() => {
        if (state.isLoadEnd) {
            getData();
        }
    }, [state]);

    if (data === null) {
        return <div>LOAD</div>;
    } else {
        return (
            <div className={style.container}>
                <div className={style.head}>
                    <SearchBar
                        className={style.search}
                        form="box"
                        placeholder={"검색어를 입력하세요"}
                        initialValue={state.keyword}
                        onEnterKeyDown={(e) => changeKeyword(e.target.value)}
                    />
                </div>
                <div className={style.body}>
                    <TableWrapper>
                        <>
                            {data.category_list.map((it, idx) => (
                                <Link
                                    key={`admincategoryitem${idx}`}
                                    href={`/lecture-category/detail/${it.id}`}
                                    passHref
                                >
                                    <TableRow idx={idx + 1} title={it.category}></TableRow>
                                </Link>
                            ))}
                        </>
                    </TableWrapper>
                </div>
                <div className={style.footer}>
                    <Pagination
                        totalCount={parseInt(data.total_count)}
                        handleChange={(page: number) => changePage((page + 1).toString())}
                        pageNum={state.page ? parseInt(state.page) - 1 : 0}
                        requiredCount={7}
                    />
                </div>
            </div>
        );
    }
};

export default CategoryList;
