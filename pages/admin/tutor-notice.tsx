import { SecureRoute } from "lib/server/accessController";

type Props = {};

const TutorNotice = () => {
    return (
        <div>
            <h2>tutor-notice</h2>
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default TutorNotice;
