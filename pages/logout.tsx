import CookieController from "lib/client/cookieController";
import { SecureRoute } from "lib/server/accessController";
import { useEffect } from "react";

type Props = {};

const Logout = (props: Props) => {
    const logout = async () => {
        await CookieController.removeUserInCookie();
        location.replace("/");
    };
    useEffect(() => {
        logout();
    }, []);

    return <div>로그아웃 중 입니다</div>;
};

export async function getSwerverSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}

export default Logout;
