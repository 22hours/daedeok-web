import { SecureRoute } from "lib/server/accessController";

type Props = {};

const MemberCategory = () => {
    return (
        <div>
            <h2>member-category</h2>
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default MemberCategory;
