import { SecureRoute } from "lib/server/accessController";
import PageHeader from "@ui/PageHeader";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import { useRouter } from "next/router";

const AdminCategoryEditor = dynamic(() => import("components/organism/AdminCategoryEditor/AdminCategoryEditor"), {
    ssr: false,
});
type State = {
    category: string;
    content: string;
};

type Props = {};

const AdminCategoryEdit = () => {
    const router = useRouter();
    const { category_id } = router.query;
    const { auth, clientSideApi } = useAuthStore();
    const [originData, setOriginData] = useState<State | null>(null);

    const getOriginData = async () => {
        const res = await clientSideApi("GET", "MAIN", "ADMIN_FIND_DETAIL_CATEGORY", { category_id: category_id });
        if (res.result === "SUCCESS") {
            setOriginData({
                category: res.data.category,
                content: res.data.content,
            });
        } else {
            alert(res.msg);
            router.replace("/admin/category");
        }
    };

    useEffect(() => {
        if (auth) {
            getOriginData();
        }
    }, [auth]);
    if (!originData) {
        return (
            <div>
                <PageHeader title={"수업 카테고리 관리"} />
                NOW LOADING
            </div>
        );
    } else {
        return (
            <div>
                <PageHeader title={"수업 카테고리 관리"} />
                <AdminCategoryEditor type={"EDIT"} originData={originData} />
            </div>
        );
    }
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}

export default AdminCategoryEdit;
