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

// List
import ListSearchbar from "components/molecule/ListSearchbar/ListSearchbar";
import ListSelect from "components/molecule/ListSelect/ListSelect";
import ListPagination from "components/molecule/ListPagination/ListPagination";
import ListPageLayout from "components/layout/ListPageLayout";
import { meta_types } from "@global_types";
import { useAlert } from "store/GlobalAlertStore";
import { useConfirm } from "store/GlobalConfirmStore";

type Props = {};

type UserItem = {
    id: string;
    name: string;
    duty: string;
    first_division: string;
    second_division: string;
    phone_num: string;
    role: meta_types.user["role"];
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

const RoleChangeButton = (props: UserItem & { refresh: () => void }) => {
    const { clientSideApi } = useAuthStore();
    const { alertOn } = useAlert();
    const [state, setState] = useState<UserItem | null>(null);
    useEffect(() => {
        if (props) {
            setState({ ...props });
        }
    }, [props]);

    const handleClick = async () => {
        if (state) {
            const afterChangeRole = state.role === "ROLE_TUTOR" ? "ROLE_MEMBER" : "ROLE_TUTOR";

            const res = await clientSideApi("PUT", "MAIN", "USER_ROLE_CHANGE", undefined, {
                id: state.id,
                role: afterChangeRole,
            });
            if (res.result === "SUCCESS") {
                alertOn({
                    title: "",
                    message: "성공적으로 전환하였습니다",
                    type: "POSITIVE",
                });
                props.refresh();
            } else {
                alertOn({
                    title: "에러가 발생하였습니다",
                    // @ts-ignore
                    message: res.msg,
                    type: "ERROR",
                });
            }
        }
    };
    if (state === null) {
        return <></>;
    } else {
        return (
            <Button
                className={`${style.control_btn}`}
                type={"SQUARE"}
                size={"free"}
                fontSize={"smaller"}
                content={state.role === "ROLE_TUTOR" ? "강사 해지" : "강사 전환"}
                color={"white"}
                onClick={handleClick}
            />
        );
    }
};

const MemberManageList = () => {
    const { confirmOn } = useConfirm();
    const { alertOn } = useAlert();
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
            alertOn({
                title: "에러 발생",
                // @ts-ignore
                message: res.msg,
                type: "ERROR",
            });
        }
    };
    const refresh = () => {
        setData(initState);
        getData();
    };

    useEffect(() => {
        if (pageState.state.isLoadEnd) {
            getData();
        }
    }, [pageState.state]);

    const callPwSend = async (user_id: string) => {
        confirmOn({
            message:
                "해당유저의 PW를 초기화 하시겠습니까?\n초기화된 비밀번호는 해당유저가 등록한 핸드폰번호로 발송됩니다.",
            onSuccess: async () => {
                const res = await clientSideApi("PUT", "MAIN", "ADMIN_RESET_PW", {
                    user_id: user_id,
                });
                if (res.result === "SUCCESS") {
                    alertOn({
                        message: "성공적으로 비밀번호를 초기화하였습니다",
                        type: "POSITIVE",
                    });
                } else {
                    alertOn({
                        title: "에러 발생",
                        // @ts-ignore
                        message: res.msg,
                        type: "ERROR",
                    });
                }
            },
        });
    };
    const callDeleteUser = async (user_id: string) => {
        confirmOn({
            message: "해당 유저를 정말 삭제하시겠습니까?\n유저 삭제시 해당 유저의 모든 데이터는 즉시 소멸됩니다",
            onSuccess: async () => {
                const res = await clientSideApi("DELETE", "MAIN", "ADMIN_DELETE_USER", {
                    user_id: user_id,
                });
                if (res.result === "SUCCESS") {
                    alertOn({
                        message: "해당 회원을 성공적으로 탈퇴시켰습니다",
                        type: "POSITIVE",
                    });
                    setData({
                        ...data,
                        user_list: [],
                    });
                    getData();
                } else {
                    alertOn({
                        title: "에러 발생",
                        // @ts-ignore
                        message: res.msg,
                        type: "ERROR",
                    });
                }
            },
        });
    };

    return (
        <ListPageLayout
            headerLeft={
                <div className={style.head}>
                    <Typo
                        className={style.label}
                        type={"TEXT"}
                        size={"normal"}
                        content={`총 가입 : ${data.total_count}명`}
                        color={"gray_accent"}
                    />
                </div>
            }
            headerRight={<ListSearchbar />}
            footer={<ListPagination total_count={data.total_count} />}
        >
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
                                <RoleChangeButton {...it} refresh={refresh} />
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
        </ListPageLayout>
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
