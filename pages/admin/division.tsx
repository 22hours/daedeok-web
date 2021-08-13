import { SecureRoute } from "lib/server/accessController";

type Props = {};

const Divsion = () => {
    return (
        <div>
            <h2>global-notice</h2>
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default Divsion;
