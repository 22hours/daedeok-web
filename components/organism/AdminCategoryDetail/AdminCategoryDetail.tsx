import Button from "@ui/buttons/Button";
import Typo from "@ui/Typo";
import TextViewer from "components/molecule/TextViewer/TextViewer";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import { useAlert } from "store/GlobalAlertStore";
import { useConfirm } from "store/GlobalConfirmStore";
import style from "./AdminCategoryDetail.module.scss";
type Props = {};

type State = {
    category: string;
    content: string;
};

const AdminCategoryDetail = () => {
    const [data, setData] = useState<State | null>(null);
    const { alertOn, apiErrorAlert } = useAlert();
    const { confirmOn } = useConfirm();
    const router = useRouter();
    const { category_id } = router.query;
    const { auth, clientSideApi } = useAuthStore();
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "ADMIN_FIND_DETAIL_CATEGORY", { category_id: category_id });
        if (res.result === "SUCCESS") {
            setData(res.data);
        } else {
            apiErrorAlert(res.msg);
        }
    };

    useEffect(() => {
        if (auth) {
            getData();
        }
    }, [auth]);

    const deleteCategory = async () => {
        confirmOn({
            message: "해당 카테고리를 삭제하시겠습니까?\n삭제한 카테고리는 변경할 수 없습니다",
            onSuccess: async () => {
                const res = await clientSideApi("DELETE", "MAIN", "ADMIN_DELETE_CATEGORY", {
                    category_id: category_id,
                });
                if (res.result === "SUCCESS") {
                    alertOn({
                        message: "성공적으로 해당 카테고리를 삭제하였습니다",
                        type: "POSITIVE",
                    });
                    router.replace("/admin/category");
                } else {
                    apiErrorAlert(res.msg);
                }
            },
        });
    };

    if (data === null) {
        return <div>NOW LOAD</div>;
    } else {
        return (
            <div className={style.container}>
                <div className={style.head}>
                    <Typo
                        //@ts-ignore
                        content={data.category}
                        type="TEXT"
                        size="large"
                    />
                </div>
                <div className={style.body}>
                    <TextViewer content={data.content} />
                </div>
                <div className={style.footer}>
                    <Link href={`/admin/category/edit/${category_id}`} passHref>
                        <Button
                            className={`${style.control_btn}`}
                            type={"SQUARE"}
                            size={"small"}
                            fontSize={"smaller"}
                            content={"수정"}
                            backgroundColor={"red_accent"}
                            color={"white"}
                        />
                    </Link>
                    <Button
                        className={`${style.control_btn}`}
                        type={"SQUARE"}
                        size={"small"}
                        fontSize={"smaller"}
                        content={"삭제"}
                        backgroundColor={"brown_base"}
                        color={"white"}
                        onClick={deleteCategory}
                    />
                    <Link href={`/admin/category/new`} passHref>
                        <Button
                            className={`${style.control_btn}`}
                            type={"SQUARE"}
                            size={"small"}
                            fontSize={"smaller"}
                            content={"추가"}
                            backgroundColor={"yellow_accent"}
                            color={"white"}
                        />
                    </Link>
                </div>
            </div>
        );
    }
};

export default AdminCategoryDetail;
