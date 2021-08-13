import StudentAttendanceList from "components/organism/StudentAttendanceList/StudentAttendanceList";
import { SecureRoute } from "lib/server/accessController";

const attendance = () => {
    return (
        <div>
            <StudentAttendanceList />
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_MEMBER");
}
export default attendance;
