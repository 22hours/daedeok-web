import TutorClassPlanDetailList from "components/organism/TutorClassPlanDetailList/TutorClassPlanDetailList";
import { SecureRoute } from "lib/server/accessController";
import React from "react";

type Props = {};

const ManageAttendanceDetail = () => {
    return (
        <div>
            <TutorClassPlanDetailList />
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_TUTOR");
}
export default ManageAttendanceDetail;
