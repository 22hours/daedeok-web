import ClassMain from "components/organism/ClassMain/ClassMain";
import { SecureRoute } from "lib/server/accessController";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "store/AuthStore";

type Props = {};

const Index = () => {
    const { auth } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (auth) {
            if (auth.role === "ROLE_ADMIN") {
                router.replace("/admin");
            }
        }
    }, [auth]);

    if (auth === null) {
        return <div>NOW LOAD</div>;
    } else {
        return <ClassMain />;
    }
};

export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}

export default Index;
