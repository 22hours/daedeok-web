import { SecureRoute } from "lib/server/accessController";
type Props = {};

const category = () => {
    return (
        <div>
            <h2>category</h2>
        </div>
    );
};

export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default category;
