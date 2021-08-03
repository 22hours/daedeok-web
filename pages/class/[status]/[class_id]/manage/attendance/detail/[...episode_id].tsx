import TutorClassPlanDetailList from "components/organism/TutorClassPlanDetailList/TutorClassPlanDetailList";
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
    console.log(ctx.query);
    return {
        props: {},
    };
}
export default ManageAttendanceDetail;
