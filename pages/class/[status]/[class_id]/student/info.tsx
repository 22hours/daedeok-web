import ClassInfo from "components/organism/ClassInfo/ClassInfo";
import { SecureRoute } from "lib/server/accessController";

type Props = {};

const info = () => {
    return <ClassInfo />;
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_MEMBER");
}
export default info;
