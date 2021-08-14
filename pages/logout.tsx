import { SecureRoute } from "lib/server/accessController";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "store/AuthStore";

type Props = {};

const Logout = (props: Props) => {
    const { auth, logout } = useAuthStore();
    const router = useRouter();
    useEffect(() => {
        if (auth) {
            logout();
            router.replace("/");
        }
    }, [auth]);

    return <div>로그아웃 중 입니다</div>;
};

export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}

export default Logout;
