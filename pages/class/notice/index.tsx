import { ListCommonProvider } from "store/ListCommonStore";
import TutorNoticeList from "components/organism/TutorNoticeList/TutorNoticeList";
import { SecureRoute } from "lib/server/accessController";
import cookies from "next-cookies";

type Props = {};

const ClassNotice = () => {
    return (
        <ListCommonProvider>
            <div>
                <TutorNoticeList />
            </div>
        </ListCommonProvider>
    );
};

export async function getServerSideProps(ctx) {
    const { role } = cookies(ctx);
    if (role === "ROLE_ADMIN") {
        return {
            redirect: {
                destination: `/admin/tutor-notice/`,
                permanent: false,
            },
        };
    }
    return SecureRoute(ctx, "ROLE_TUTOR");
}

export default ClassNotice;
