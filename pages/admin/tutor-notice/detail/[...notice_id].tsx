import NoticeDetail from "pages/class/notice/detail/[...notice_id]";
import { SecureRoute } from "lib/server/accessController";
import PageHeader from "@ui/PageHeader";

type Props = {};

const AdminTutorNoticeDetail = () => {
    return (
        <div>
            <PageHeader title={"강사 공지 및 알림"} />
            <NoticeDetail />
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default AdminTutorNoticeDetail;
