import { SecureRoute } from "lib/server/accessController";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "store/AuthStore";

import ClassMain from "components/organism/ClassMain/ClassMain";

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

    return (
        <div>
            <ClassMain />
        </div>
    );
};

export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}

export default Index;
