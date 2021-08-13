import ClassNoticeNew from "pages/class/notice/new";
import { SecureRoute } from "lib/server/accessController";
import PageHeader from "@ui/PageHeader";

type Props = {};

const AdminTutorNoticeEdit = () => {
    return (
        <div>
            <PageHeader title={"강사 공지 및 알림"} />
            <ClassNoticeNew />
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default AdminTutorNoticeEdit;
