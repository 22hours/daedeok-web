import NoticeEdit from "pages/class/notice/edit/[...notice_id]";
import { SecureRoute } from "lib/server/accessController";
import PageHeader from "@ui/PageHeader";

type Props = {};

const AdminTutorNoticeEdit = () => {
    return (
        <div>
            <PageHeader title={"강사 공지 및 알림"} />
            <NoticeEdit />
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default AdminTutorNoticeEdit;
