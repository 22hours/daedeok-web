import PageHeader from "@ui/PageHeader";
import { ListCommonProvider, useListCommonStore } from "store/ListCommonStore";
import style from "./AdminMemberManage.module.scss";
import Pagination from "@ui/pagination/Pagination";
import SearchBar from "@ui/input/SearchBar";
import Typo from "@ui/Typo";
import TableWrapper from "@ui/board/TableWrapper";
import { useAuthStore } from "store/AuthStore";
import { useEffect, useState } from "react";
import TableRow from "@ui/board/TableRow";
import Button from "@ui/buttons/Button";
type Props = {};

type UserItem = {
    id: string;
    name: string;
    duty: string;
    first_division: string;
    second_division: string;
    phone_num: string;
};
type State = {
    user_list: UserItem[];
    total_count: number;
    total_pate?: number;
};
const initState: State = {
    user_list: [],
    total_count: 0,
    total_pate: 0,
};

const MemberManageList = () => {
    const pageState = useListCommonStore();
    const { clientSideApi } = useAuthStore();

    const [data, setData] = useState<State>(initState);
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "ADMIN_FIND_USER", undefined, {
            category: pageState.state.category === "ALL" ? undefined : pageState.state.category,
            keyword: pageState.state.keyword,
            page: parseInt(pageState.state.page) - 1,
            required_count: 7,
        });
        if (res.result === "SUCCESS") {
            setData(res.data);
        } else {
            alert(res.msg);
        }
    };

    useEffect(() => {
        if (pageState.state.isLoadEnd) {
            getData();
        }
    }, [pageState.state]);

    const callPwSend = async (user_id: string) => {
        if (
            window.confirm(
                "해당유저의 PW를 초기화 하시겠습니까?\n초기화된 비밀번호는 해당유저가 등록한 핸드폰번호로 발송됩니다."
            )
        ) {
            console.log(user_id);
            const res = await clientSideApi("PUT", "MAIN", "ADMIN_RESET_PW", {
                user_id: user_id,
            });
            if (res.result === "SUCCESS") {
                alert("성공적으로 비밀번호를 초기화하였습니다");
            } else {
                alert(res.msg);
            }
        }
    };
    const callDeleteUser = async (user_id: string) => {
        if (
            window.confirm("해당 유저를 정말 삭제하시겠습니까?\n유저 삭제시 해당 유저의 모든 데이터는 즉시 소멸됩니다")
        ) {
            const res = await clientSideApi("DELETE", "MAIN", "ADMIN_DELETE_USER", {
                user_id: user_id,
            });
            if (res.result === "SUCCESS") {
                alert("해당 회원을 성공적으로 탈퇴시켰습니다");

                setData({
                    ...data,
                    user_list: [],
                });
                getData();
            } else {
                alert(res.msg);
            }
        }
    };

    return (
        <>
            <div className={style.head}>
                <Typo
                    className={style.label}
                    type={"TEXT"}
                    size={"normal"}
                    content={`총 가입 : ${data.total_count}명`}
                    color={"gray_accent"}
                />
                <SearchBar
                    placeholder={"검색어를 입력하세요"}
                    form={"box"}
                    initialValue={pageState.state.keyword}
                    onEnterKeyDown={(e) => pageState.changeKeyword(e.target.value)}
                />
            </div>
            <div className={style.body}>
                <Typo
                    className={style.label}
                    type={"TEXT"}
                    size={"small"}
                    content={`총 가입 : ${1}명`}
                    color={"gray_accent"}
                />
                <TableWrapper>
                    {data.user_list.map((it, idx) => (
                        <TableRow
                            key={`adminmanageuseritem${idx}`}
                            idx={idx + 1}
                            studentName={it.name}
                            studentInfo={{
                                duty: it.duty,
                                first_division: it.first_division,
                                second_division: it.second_division,
                                phone_number: it.phone_num,
                            }}
                        >
                            <div className={style.user_control_col}>
                                <Button
                                    className={`${style.control_btn}`}
                                    type={"SQUARE"}
                                    size={"free"}
                                    fontSize={"smaller"}
                                    content={"PW전송"}
                                    color={"white"}
                                    onClick={() => callPwSend(it.id)}
                                />
                                <Button
                                    className={`${style.control_btn}`}
                                    type={"SQUARE"}
                                    size={"free"}
                                    fontSize={"smaller"}
                                    content={"삭제"}
                                    color={"white"}
                                    onClick={() => callDeleteUser(it.id)}
                                />
                            </div>
                        </TableRow>
                    ))}
                </TableWrapper>
            </div>
            <div className={style.footer}>
                <Pagination
                    totalCount={data.total_count}
                    handleChange={(page: number) => pageState.changePage((page + 1).toString())}
                    pageNum={pageState.state.page ? parseInt(pageState.state.page) - 1 : 0}
                    requiredCount={7}
                />
            </div>
        </>
    );
};

const AdminMemberManage = () => {
    return (
        <div className={style.container}>
            <PageHeader title={"회원관리"} />

            <ListCommonProvider>
                <MemberManageList />
            </ListCommonProvider>
        </div>
    );
};

export default AdminMemberManage;
