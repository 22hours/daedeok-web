import ClassMain from "components/organism/ClassMain/ClassMain";
import { SecureRoute } from "lib/server/accessController";
import cookies from "next-cookies";
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
    const { role } = cookies(ctx);

    if (role === "ROLE_ADMIN") {
        return {
            redirect: {
                destination: `/admin`,
                permanent: false,
            },
        };
    } else {
        return SecureRoute(ctx, "ROLE_ALL");
    }
}

export default Index;
