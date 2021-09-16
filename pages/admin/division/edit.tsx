import PageHeader from "@ui/PageHeader";
import AdminDivisionEdit from "components/organism/AdminDivisionEdit/AdminDivisionEdit";
import { SecureRoute } from "lib/server/accessController";
type Props = {};

const editCategory = () => {
    return (
        <div>
            <PageHeader title={"소속 수정"} />
            <AdminDivisionEdit />
        </div>
    );
};

export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default editCategory;
