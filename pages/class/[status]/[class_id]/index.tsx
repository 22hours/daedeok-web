import { SecureRoute } from "lib/server/accessController";

type Props = {};

const index = () => {
    return (
        <div>
            <h2>CLASS MAIN</h2>
        </div>
    );
};
export async function getServerSideProps(ctx) {
    const { status, class_id } = ctx.query;
    return {
        redirect: {
            destination: `/class/${status}/${class_id}/board`,
        },
    };
}

export default index;
