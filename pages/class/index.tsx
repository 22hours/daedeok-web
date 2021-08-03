import { isAccessAble } from "lib/server/accessController";

type Props = {};

const Index = () => {
    return <div></div>;
};

export async function getServerSideProps(ctx) {
    const accessAbleRole = "ROLE_ALL";
    const flag = isAccessAble(ctx, accessAbleRole);
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
