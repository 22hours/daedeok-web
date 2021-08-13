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
            switch (auth.role) {
                case "ROLE_TUTOR":
                case "ROLE_MEMBER": {
                    break;
                }
                case "ROLE_ADMIN": {
                    router.replace("/admin");
                }
            }
        }
    }, [auth]);

    return <div>INDEX !</div>;
};

export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}

export default Index;
