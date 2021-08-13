import StudentClassPlanList from "components/organism/StudentClassPlanList/StudentClassPlanList";
import { SecureRoute } from "lib/server/accessController";

type Props = {};

const index = () => {
    return (
        <div>
            <StudentClassPlanList />
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_MEMBER");
}
export default index;
