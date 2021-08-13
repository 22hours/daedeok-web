import TutorClassPlanList from "components/organism/TutorClassPlanList/TutorClassPlanList";
import { SecureRoute } from "lib/server/accessController";
import { useEffect } from "react";

type Props = {};

const Index = () => {
    return (
        <div>
            <TutorClassPlanList />
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_TUTOR");
}
export default Index;
