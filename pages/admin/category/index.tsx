import PageHeader from "@ui/PageHeader";
import AdminCategoryList from "components/organism/AdminCategoryList/AdminCategoryList";
import { SecureRoute } from "lib/server/accessController";
type Props = {};

const category = () => {
    return (
        <div>
            <PageHeader title={"수업 카테고리 관리"} />
            <AdminCategoryList />
        </div>
    );
};

export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default category;
