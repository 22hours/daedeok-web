import { SecureRoute } from "lib/server/accessController";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "store/AuthStore";
import style from "./index.module.scss";
type Props = {};

const Index = () => {
    const { auth } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (auth) {
            if (auth.role === "ROLE_ADMIN") {
                router.replace("/admin/member");
            } else {
                alert("잘못된 접근입니다");
                router.replace("/class");
            }
        }
    }, [auth]);

    return <div>유효성을 검증하고 있습니다...</div>;
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default Index;
