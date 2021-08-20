import CookieController from "lib/client/cookieController";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "store/AuthStore";

const DynamicLogout = () => {
    const router = useRouter();
    const { logout } = useAuthStore();
    const callLogout = async () => {
        await logout();

        setTimeout(() => {
            router.replace("/");
        }, 1000);
    };
    useEffect(() => {
        callLogout();
    }, []);
    return (
        <div>
            <h2>로그아웃 중 입니다</h2>
        </div>
    );
};

export default DynamicLogout;
