import PageHeader from "@ui/PageHeader";
import { SecureRoute } from "lib/server/accessController";
import dynamic from "next/dynamic";

const AdminCategoryEditor = dynamic(() => import("components/organism/AdminCategoryEditor/AdminCategoryEditor"), {
    ssr: false,
});
type Props = {};

const NewCategory = () => {
    return (
        <div>
            <PageHeader title={"수업 카테고리 관리"} />
            <AdminCategoryEditor type={"NEW"} />
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default NewCategory;
