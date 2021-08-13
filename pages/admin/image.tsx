import { SecureRoute } from "lib/server/accessController";

type Props = {};

const Image = () => {
    return (
        <div>
            <h2>image</h2>
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default Image;
