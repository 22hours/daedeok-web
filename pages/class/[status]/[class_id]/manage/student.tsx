import ClassStudentManageList from "components/organism/ClassStudentManageList/ClassStudentManageList";
import { SecureRoute } from "lib/server/accessController";
import { useEffect } from "react";

type Props = {};

const Student = () => {
    return (
        <div>
            <ClassStudentManageList />
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_TUTOR");
}
export default Student;
