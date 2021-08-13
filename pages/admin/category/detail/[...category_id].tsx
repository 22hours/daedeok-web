import { SecureRoute } from "lib/server/accessController";
import PageHeader from "@ui/PageHeader";
import dynamic from "next/dynamic";

const AdminCategoryDetail = dynamic(() => import("components/organism/AdminCategoryDetail/AdminCategoryDetail"), {
    ssr: false,
});

type Props = {};

const Detail = () => {
    return (
        <div>
            <PageHeader title={"수업 카테고리 관리"} />
            <AdminCategoryDetail />
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default Detail;
