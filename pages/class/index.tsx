import { isAccessAble } from "lib/server/accessController";

type Props = {};

const Index = () => {
    return <div></div>;
};

export async function getServerSideProps(ctx) {
    const accessAbleRole = "ROLE_ADMIN";
    const flag = isAccessAble(ctx, "ROLE_ADMIN");
    if (!flag) {
        return {
            redirect: {
                destination: `/login?require_role=${accessAbleRole}`,
                permanent: false,
            },
        };
    } else {
        return {
            props: {},
        };
    }
}

export default Index;
