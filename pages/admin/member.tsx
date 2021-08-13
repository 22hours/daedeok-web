import AdminMemberManage from "components/organism/AdminMemberManage/AdminMemberManage";
import { SecureRoute } from "lib/server/accessController";

type Props = {};

const member = () => {
    return <AdminMemberManage />;
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default member;
