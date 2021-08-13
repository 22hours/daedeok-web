import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";
import Button from "@ui/buttons/Button";
import SearchBar from "@ui/input/SearchBar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import { ListCommonProvider, useListCommonStore } from "store/ListCommonStore";
import style from "./AdminCategoryList.module.scss";
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
const ListController = () => {
    const [data, setData] = useState<State>(initState);

    const { state, changePage, changeKeyword } = useListCommonStore();
    const { clientSideApi } = useAuthStore();
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "CATEGORY_FIND", undefined, {
            page: 0,
            required_count: 10000,
        });
        if (res.result === "SUCCESS") {
            setData(res.data);
        } else {
            alert(res.msg);
        }
    };

    useEffect(() => {
        if (state) {
            getData();
        }
    }, [state]);

    const handleDeleteClick = async (category_id: string) => {
        if (window.confirm("해당 카테고리를 삭제하시겠습니까?\n삭제한 카테고리는 변경할 수 없습니다")) {
            const res = await clientSideApi("DELETE", "MAIN", "ADMIN_DELETE_CATEGORY", {
                category_id: category_id,
            });
            if (res.result === "SUCCESS") {
                alert("성공적으로 해당 카테고리를 삭제하였습니다.");
                setData({
                    ...data,
                    category_list: [],
                });
                getData();
            } else {
                alert(res.msg);
            }
        }
    };

    return (
        <div className={style.container}>
            <div className={style.head}>
                <Link href={`/admin/category/new`} passHref>
                    <Button
                        className={`${style.add_btn}`}
                        type={"SQUARE"}
                        size={"small"}
                        fontSize={"smaller"}
                        content={"추가"}
                        backgroundColor={"yellow_accent"}
                        color={"white"}
                    />
                </Link>
            </div>
            <div className={style.body}>
                <TableWrapper>
                    <>
                        <TableRow title={"카테고리"} />
                        {data.category_list.map((it, idx) => (
                            <TableRow title={it.category} key={`admincategoryitem${idx}`}>
                                <div className={style.control_col}>
                                    <Link href={`/admin/category/edit/${it.id}`} passHref>
                                        <Button
                                            className={`${style.control_btn} ${style.edit_btn}`}
                                            type={"SQUARE"}
                                            size={"small"}
                                            fontSize={"smaller"}
                                            content={"수정"}
                                            backgroundColor={"red_accent"}
                                            color={"white"}
                                        />
                                    </Link>
                                    <Button
                                        className={`${style.control_btn} ${style.delete_btn}`}
                                        type={"SQUARE"}
                                        size={"small"}
                                        fontSize={"smaller"}
                                        content={"삭제"}
                                        backgroundColor={"brown_base"}
                                        color={"white"}
                                        onClick={() => handleDeleteClick(it.id)}
                                    />
                                </div>
                            </TableRow>
                        ))}
                    </>
                </TableWrapper>
            </div>
            <div className={style.footer}></div>
        </div>
    );
};

const AdminCategoryList = () => {
    return (
        <ListCommonProvider>
            <ListController />
        </ListCommonProvider>
    );
};

export default AdminCategoryList;
