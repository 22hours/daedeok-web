import { SecureRoute } from "lib/server/accessController";

type Props = {};

const Index = () => {
    return <div>INDEX !</div>;
};

export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}

export default Index;
