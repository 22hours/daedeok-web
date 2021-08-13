import PageHeader from "@ui/PageHeader";
import AdminManageDivision from "components/organism/AdminManageDivision/AdminManageDivision";
import { SecureRoute } from "lib/server/accessController";

type Props = {};

const Divsion = () => {
    return (
        <div>
            <PageHeader title={"소속관리"} />
            <AdminManageDivision />
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default Divsion;
