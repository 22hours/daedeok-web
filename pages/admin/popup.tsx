import AdminManagePopup from "components/organism/AdminManagePopup/AdminManagePopup";
import { SecureRoute } from "lib/server/accessController";

type Props = {};

const popup = () => {
    return <AdminManagePopup />;
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default popup;
