import PageHeader from "@ui/PageHeader";
import TutorNoticeList from "components/organism/TutorNoticeList/TutorNoticeList";
import { SecureRoute } from "lib/server/accessController";
import { ListCommonProvider } from "store/ListCommonStore";

type Props = {};

const TutorNotice = () => {
    return (
        <div>
            <PageHeader title={"강사 공지 및 알림"} />
            <ListCommonProvider>
                <TutorNoticeList />
            </ListCommonProvider>
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default TutorNotice;
