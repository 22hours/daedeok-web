import ClassEditor from "components/organism/ClassEditor/ClassEditor";
import { SecureRoute } from "lib/server/accessController";

const NewClass = () => {
    return <ClassEditor type={"NEW"} />;
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_TUTOR");
}
export default NewClass;
