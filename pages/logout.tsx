import CookieController from "lib/client/cookieController";
import { SecureRoute } from "lib/server/accessController";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "store/AuthStore";

type Props = {};

const Logout = (props: Props) => {
    useEffect(() => {
        CookieController.removeUserInCookie();
        location.replace("/");
    }, []);

    return <div>로그아웃 중 입니다</div>;
};

export async function getSwerverSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}

export default Logout;
