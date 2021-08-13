import { SecureRoute } from "lib/server/accessController";

type Props = {};

const member = () => {
    return (
        <div>
            <h2>member</h2>
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default member;
